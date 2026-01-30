const mongoose = require("mongoose");

const RespiratoryHealthSchema = new mongoose.Schema({
    city: { type: String, required: true },
    area: { type: String, required: true },

    asthmaCases: Number,
    copdCases: Number,
    bronchitisCases: Number,

    totalRespiratoryCases: Number,
    riskLevel: String, // Low, Medium, High
    healthAdvisory: String,

    reportDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("RespiratoryHealth", RespiratoryHealthSchema);