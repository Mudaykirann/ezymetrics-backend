const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    campaignId: String,
    name: String,
    spend: Number,
    leadsGenerated: Number,
    conversionRate: Number,
})

const Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;

