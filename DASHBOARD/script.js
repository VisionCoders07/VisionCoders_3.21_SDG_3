/* ================= MOCK DATA ================= */

let mockData = {
  aqi: 120,
  pm25: 85,
  pm10: 50,
  no2: 30,
  o3: 20,
  asthma: 15,
  copd: 8,
  bronchitis: 12,
  forecast: [120, 110, 100, 105, 95, 90, 100],
  trend: [80, 85, 90, 95, 100, 110, 120]
};

/* ================= MAP INITIALIZATION ================= */

let map = L.map("map").setView([28.6139, 77.2090], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

/* ================= HEATMAP (INIT EMPTY) ================= */

let heat = L.heatLayer([], {
  radius: 30,
  blur: 20,
  maxZoom: 13
}).addTo(map);

/* ================= HEATMAP DATA GENERATOR ================= */

function generateHeatmapPoints(lat, lon) {
  let points = [];
  for (let i = 0; i < 30; i++) {
    let offsetLat = lat + (Math.random() - 0.5) * 0.06;
    let offsetLon = lon + (Math.random() - 0.5) * 0.06;
    let intensity = Math.random();
    points.push([offsetLat, offsetLon, intensity]);
  }
  return points;
}

/* ================= INFO CARD UPDATE ================= */

function updateInfo(data) {
  document.getElementById("aqi").innerText = "AQI: " + data.aqi;
  document.getElementById("pm25").innerText = "PM2.5: " + data.pm25;
  document.getElementById("pm10").innerText = "PM10: " + data.pm10;
  document.getElementById("no2").innerText = "NO2: " + data.no2;
  document.getElementById("o3").innerText = "O3: " + data.o3;

  document.getElementById("asthma").innerText = "Asthma Cases: " + data.asthma;
  document.getElementById("copd").innerText = "COPD Cases: " + data.copd;
  document.getElementById("bronchitis").innerText =
    "Bronchitis Cases: " + data.bronchitis;
}

updateInfo(mockData);

/* ================= CHARTS ================= */

const forecastChart = new Chart(
  document.getElementById("forecastChart"),
  {
    type: "line",
    data: {
      labels: ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7"],
      datasets: [
        {
          data: mockData.forecast,
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  }
);

/* ================= CORRELATION GRAPH ================= */

const ctx = document.getElementById("trendChart").getContext("2d");

/* Gradient for PM2.5 */
const pollutionGradient = ctx.createLinearGradient(0, 0, 0, 300);
pollutionGradient.addColorStop(0, "rgba(255, 80, 80, 0.6)");
pollutionGradient.addColorStop(1, "rgba(255, 80, 80, 0)");

/* Gradient for Admissions */
const admissionGradient = ctx.createLinearGradient(0, 0, 0, 300);
admissionGradient.addColorStop(0, "rgba(255, 170, 60, 0.6)");
admissionGradient.addColorStop(1, "rgba(255, 170, 60, 0)");

const trendChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "PM2.5 Levels (µg/m³)",
        data: [12, 15, 45, 68, 35, 20, 15],
        borderColor: "#ff4d4d",
        backgroundColor: pollutionGradient,
        fill: true,
        tension: 0.45,
        pointRadius: 5,
        pointBackgroundColor: "#ff4d4d",
        yAxisID: "yPollution"
      },
      {
        label: "Respiratory ER Admissions",
        data: [25, 28, 30, 65, 85, 45, 30],
        borderColor: "#ffae42",
        fill: false,
        tension: 0.45,
        borderDash: [6, 6],
        pointRadius: 5,
        pointBackgroundColor: "#ffae42",
        yAxisID: "yAdmissions"
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#ddd" }
      }
    },
    scales: {
      x: {
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.05)" }
      },
      yPollution: {
        type: "linear",
        position: "left",
        min: 0,
        max: 70,
        ticks: { color: "#ff4d4d" },
        title: {
          display: true,
          text: "Pollution",
          color: "#ff4d4d"
        }
      },
      yAdmissions: {
        type: "linear",
        position: "right",
        min: 20,
        max: 90,
        grid: { drawOnChartArea: false },
        ticks: { color: "#ffae42" },
        title: {
          display: true,
          text: "Admissions",
          color: "#ffae42"
        }
      }
    }
  }
});



/* ================= SEARCH LOCATION ================= */

document.getElementById("searchBtn").addEventListener("click", searchLocation);

function searchLocation() {
  let location = document.getElementById("locationSearch").value;
  if (!location) {
    alert("Enter a location");
    return;
  }

  // Mock coordinates (replace with real API later)
  let lat = 19.0760 + (Math.random() - 0.5) * 0.3;
  let lon = 72.8777 + (Math.random() - 0.5) * 0.3;

  map.setView([lat, lon], 12);

  let heatPoints = generateHeatmapPoints(lat, lon);
  heat.setLatLngs(heatPoints);

  updateInfo(mockData);

  setTimeout(() => {
    map.invalidateSize();
  }, 300);
}

/* ================= DETECT NEAR ME ================= */

document.getElementById("detectBtn").addEventListener("click", detectMe);

function detectMe() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    map.setView([lat, lon], 12);

    let heatPoints = generateHeatmapPoints(lat, lon);
    heat.setLatLngs(heatPoints);

    updateInfo(mockData);

    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  });
}

/* ================= FINAL SAFETY FIX ================= */

setTimeout(() => {
  map.invalidateSize();
}, 500);
