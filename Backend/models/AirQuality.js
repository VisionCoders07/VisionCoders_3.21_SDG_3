const mongoose = require("mongoose");

const AirQualitySchema = new mongoose.Schema({
    city: { type: String, required: true },
    area: { type: String, required: true },
    latitude: Number,
    longitude: Number,

    aqi: Number,
    pm25: Number,
    pm10: Number,
    no2: Number,
    so2: Number,
    co: Number,
    o3: Number,

    airQualityStatus: String, // Good, Moderate, Poor, Severe
    reportDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("AirQuality", AirQualitySchema);