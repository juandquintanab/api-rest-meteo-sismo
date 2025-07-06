const express = require('express');
const weatherRoutes = require('./routes/weather');
const seismicRoutes = require('./routes/seismic');

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

// Usar las rutas
app.use('/api/weather', weatherRoutes);
app.use('/api/seismic', seismicRoutes);

module.exports = app;
