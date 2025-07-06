// GET /weather/history/:city
router.get('/history/:city', weatherController.getWeatherHistory.bind(weatherController));
const express = require('express');
const { validateWeather } = require('../middleware/validation');
const weatherController = require('../controllers/weatherController');
const router = express.Router();

// GET /weather/:source?city=[nombre_ciudad]
router.get('/:source', weatherController.getWeatherData.bind(weatherController));

// POST /weather (mantener la ruta existente)
router.post('/', validateWeather, (req, res) => {
  const newWeatherData = weatherController.saveWeatherData(req.body);
  
  res.status(201).json({
    message: 'Weather data created successfully',
    data: newWeatherData
  });
});

module.exports = router;
