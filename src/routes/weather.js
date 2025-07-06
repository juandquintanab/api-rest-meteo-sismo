const express = require('express');
const router = express.Router();

// Almacenamiento temporal (será reemplazado por MongoDB)
let weatherData = [];

// GET /api/weather
router.get('/', (req, res) => {
  res.json({
    data: weatherData,
    count: weatherData.length,
    timestamp: new Date().toISOString()
  });
});

// POST /api/weather
router.post('/', (req, res) => {
  const newWeatherData = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  weatherData.push(newWeatherData);
  
  res.status(201).json({
    message: 'Weather data created successfully',
    data: newWeatherData
  });
});

module.exports = router;
