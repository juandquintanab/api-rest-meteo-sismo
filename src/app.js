const express = require('express');
const app = express();

// Middleware básico
app.use(express.json());

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

module.exports = app;
