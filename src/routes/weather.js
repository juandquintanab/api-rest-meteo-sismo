const express = require('express');
const { validateWeather } = require('../middleware/validation');
const weatherController = require('../controllers/weatherController');
const router = express.Router();

// DELETE /weather/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // Validar formato del ID
  if (!id.startsWith('weather_')) {
    return res.status(400).json({
      error: 'Invalid ID format',
      message: 'ID must start with weather_'
    });
  }
  const deleted = weatherController.deleteWeatherData(id);
  if (!deleted) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'Weather record not found'
    });
  }
  res.json({
    message: 'Weather record deleted successfully',
    id: id
  });
});

// GET /weather/history/:city
router.get('/history/:city', weatherController.getWeatherHistory.bind(weatherController));

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
