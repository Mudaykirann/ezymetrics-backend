const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportsSchema = new Schema({
    campaignId: String,
    campaign: String,
    totalLeads: Number,
    convertedLeads: Number,
    conversionRate: mongoose.Decimal128,
})

const Reports = mongoose.model('Reports', ReportsSchema);

module.exports = Reports;