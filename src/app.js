const express = require('express');
const app = express();

// Middleware básico
app.use(express.json());

// Almacenamiento temporal en memoria (luego será reemplazado por MongoDB)
let weatherData = [];
let seismicData = [];

// Ruta de información general
app.get('/', (req, res) => {
  res.json({
    name: 'API REST Meteo Sismo',
    version: '1.0.0',
    description: 'API REST para datos meteorológicos y sismológicos',
    timestamp: new Date().toISOString()
  });
});

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// === RUTAS METEOROLÓGICAS ===
app.get('/api/weather', (req, res) => {
  res.json({
    data: weatherData,
    count: weatherData.length,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/weather', (req, res) => {
  const newWeatherData = {
    id: Date.now(), // ID temporal
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  weatherData.push(newWeatherData);
  
  res.status(201).json({
    message: 'Weather data created successfully',
    data: newWeatherData
  });
});

// === RUTAS SISMOLÓGICAS ===
app.get('/api/seismic', (req, res) => {
  res.json({
    data: seismicData,
    count: seismicData.length,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/seismic', (req, res) => {
  const newSeismicData = {
    id: Date.now(), // ID temporal
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  seismicData.push(newSeismicData);
  
  res.status(201).json({
    message: 'Seismic data created successfully',
    data: newSeismicData
  });
});

module.exports = app;
