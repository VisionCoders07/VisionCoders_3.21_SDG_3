const express = require("express");
const router = express.Router();

const AirQuality = require("../models/AirQuality");
const RespiratoryHealth = require("../models/RespiratoryHealth");

router.post("/seed-mumbai", async (req, res) => {
    // AIR QUALITY DATA
    await AirQuality.create({
        city: "Mumbai",
        area: "Andheri East",
        latitude: 19.1197,
        longitude: 72.8468,

        aqi: 245,
        pm25: 110,
        pm10: 190,
        no2: 45,
        so2: 18,
        co: 1.2,
        o3: 32,

        airQualityStatus: "Poor"
    });

    // RESPIRATORY HEALTH DATA
    await RespiratoryHealth.create({
        city: "Mumbai",
        area: "Andheri East",

        asthmaCases: 620,
        copdCases: 410,
        bronchitisCases: 350,

        totalRespiratoryCases: 1380,
        riskLevel: "High",
        healthAdvisory:
            "Avoid outdoor exposure, use masks, and seek medical help for breathing issues."
    });

    res.json({
        message: "Mumbai air quality & respiratory health data stored successfully"
    });
});

module.exports = router;
