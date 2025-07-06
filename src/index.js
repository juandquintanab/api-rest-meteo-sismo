const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Middleware básico
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: '🌍 API REST para datos meteorológicos y sismológicos',
    status: 'Funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta para verificar conexión a la base de datos
app.get('/health', (req, res) => {
  const mongoose = require('mongoose');
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Conectada' : 'Desconectada',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
});
