const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const weatherRoutes = require('./routes/weather');
const seismicRoutes = require('./routes/seismic');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();

// === MIDDLEWARE DE SEGURIDAD ===
app.use(helmet()); // Headers de seguridad
app.use(cors()); // CORS

// === MIDDLEWARE DE LOGGING ===
app.use(morgan('combined')); // Logging de HTTP
app.use(logger); // Logging personalizado

// === MIDDLEWARE DE PARSING ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === RUTAS PRINCIPALES ===
app.get('/', (req, res) => {
  res.json({
    name: 'API REST Meteo Sismo',
    version: '1.0.0',
    description: 'API REST para datos meteorológicos y sismológicos',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// === RUTAS DE LA API ===
app.use('/api/weather', weatherRoutes);
app.use('/api/seismic', seismicRoutes);

// === MIDDLEWARE DE MANEJO DE ERRORES ===
app.use(notFound); // Debe ir después de todas las rutas
app.use(errorHandler); // Debe ser el último middleware

module.exports = app;
