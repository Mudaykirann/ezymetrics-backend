const express = require('express');
const app = express();
const mongoose = require('mongoose');


require('dotenv').config();


const port = process.env.PORT || 3000;


const PDFDocument = require('pdfkit');
const fs = require('fs');
const nodemailer = require('nodemailer');

const leadData = require('./data/Leads');
const campaignData = require('./data/Campaigns');


const Lead = require('./models/Leads')
const Campaign = require('./models/Campaigns')
const Reports = require('./models/Reports');

const MONGO_URI = process.env.DATABASE_URL;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:', err));


app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');


app.post('/ezy/leads', async (req, res) => {
    try {
        await Lead.insertMany(leadData);
        res.status(201).send('Dummy leads added successfully');
    }
    catch (err) {
        console.error('Error adding dummy leads:', err);
        res.status(500).send('Error adding dummy leads');
    }
})
app.get("/ezy/leads", async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (err) {
        console.error('Error fetching leads:', err);
        res.status(500).send('Error fetching leads');
    }
});



app.post('/ezy/campaigns', async (req, res) => {
    try {
        await Campaign.insertMany(campaignData);
        res.status(201).send('Dummy Campaigns added successfully');
    }
    catch (err) {
        console.error('Error adding dummy Campaigns:', err);
        res.status(500).send('Error adding dummy Campaigns');
    }
})
app.get("/ezy/campaigns", async (req, res) => {
    try {
        const camps = await Campaign.find();
        res.json(camps);
    } catch (err) {
        console.error('Error fetching Campaigns:', err);
        res.status(500).send('Error fetching Campaigns');
    }
});



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`
    }
});

function sendEmailNotification(campaignName) {
    const mailOptions = {
        from: `${process.env.EMAIL_USER}`,
        to: 'udaykirankirru2003@gmail.com',
        subject: `Alert: 100% Conversion Rate for ${campaignName}`,
        text: `Congratulation!!! 👏👏👏 The campaign "${campaignName}" has achieved a 100% conversion rate!`,
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}



app.post('/ezy/reports', async (req, res) => {
    try {
        const leaddata = await Lead.find();
        const campdata = await Campaign.find();
        const calculateMetrics = (leaddata, campdata) => {
            return campdata.map(c => {
                const leadsForCamp = leaddata.filter(lead => lead.campaign === c.name);
                const totalLeads = leadsForCamp.length;
                const convertedLeads = leadsForCamp.filter(lead => lead.status === 'converted').length;
                const conversionRate = totalLeads === 0 ? 0 : (convertedLeads / totalLeads) * 100;



                return {
                    campaignId: c.campaignId,
                    campaign: c.name,
                    totalLeads,
                    convertedLeads,
                    conversionRate: conversionRate.toFixed(2)
                };
            });
        };
        const metrics = calculateMetrics(leaddata, campdata);
        await Reports.insertMany(metrics);
        res.status(201).send('REports added successfully');
    }
    catch (err) {
        console.error('Error adding Reports:', err);
        res.status(500).send('Error adding Reports');
    }
})

app.get('/ezy/reports', async (req, res) => {
    try {
        const reports = await Reports.find();
        reports.forEach((r) => {
            if (r.conversionRate == 100.00) {
                sendEmailNotification(r.campaign);
            }
        })
        res.json(reports);
    } catch (err) {
        console.error('Error fetching Reports:', err);
        res.status(500).send('Error fetching Reports');
    }
})



app.get('/ezy/reports/pdf', async (req, res) => {
    const doc = new PDFDocument();
    const pdfFilename = 'ezymetrics_report.pdf';

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${pdfFilename}`);


    doc.pipe(res);


    doc.fontSize(20).text('EzyMetrics Report', { align: 'center' });
    doc.moveDown(1.5);

    try {
        const reports = await Reports.find();

        reports.forEach(report => {
            doc.fontSize(14).text(`Campaign: ${report.campaign}`);
            doc.fontSize(12).text(`Total Leads: ${report.totalLeads}`);
            doc.text(`Converted Leads: ${report.convertedLeads}`);
            doc.text(`Conversion Rate: ${report.conversionRate}%`);


            doc.moveDown(2);
        });
        doc.end();
    } catch (err) {
        console.error('Error Creating PDF:', err);
        res.status(500).send('Error Creating PDF');
    }
});



app.listen(port, () => console.log(`Server running on port ${port}`));
