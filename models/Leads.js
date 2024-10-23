const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadSchema = new Schema({
    name: String,
    email: String,
    status: String,
    campaign: String,
})

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;