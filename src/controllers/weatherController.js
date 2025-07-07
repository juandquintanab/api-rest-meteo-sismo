
const weatherService = require('../services/weatherService');

// Almacenamiento temporal (será reemplazado por MongoDB)
let localWeatherData = [];

class WeatherController {
  // Obtener historial de una ciudad
  getWeatherHistory(req, res) {
    try {
      const { city } = req.params;
      const history = this.getLocalWeatherDataHistory(city);
      res.json({
        data: history,
        count: history.length,
        city: city
      });
    } catch (error) {
      console.error('Error in getWeatherHistory:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  // Método auxiliar para historial local
  getLocalWeatherDataHistory(city) {
    return localWeatherData.filter(data => 
      data.city.toLowerCase() === city.toLowerCase()
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // Obtener datos de clima por fuente
  async getWeatherData(req, res) {
    try {
      const { source } = req.params;
      const { city } = req.query;

      if (!city) {
        return res.status(400).json({
          error: 'Missing required parameter',
          message: 'City parameter is required'
        });
      }

      let weatherData;

      switch (source) {
        case 'openweathermap':
          weatherData = await weatherService.getOpenWeatherData(city);
          break;
        case 'weatherapi':
          weatherData = await weatherService.getWeatherApiData(city);
          break;
        case 'local':
          weatherData = this.getLocalWeatherData(city);
          break;
        default:
          return res.status(400).json({
            error: 'Invalid source',
            message: 'Source must be openweathermap, weatherapi, or local'
          });
      }

      if (!weatherData) {
        return res.status(404).json({
          message: 'No hay registros climáticos'
        });
      }

      res.json(weatherData);

    } catch (error) {
      console.error('Error in getWeatherData:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  // Obtener datos locales de una ciudad
  getLocalWeatherData(city) {
    const cityData = localWeatherData.filter(data => 
      data.city.toLowerCase() === city.toLowerCase()
    );
    
    if (cityData.length === 0) {
      return null;
    }

    // Retornar el registro más reciente
    return cityData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  }

  // Guardar datos meteorológicos
  saveWeatherData(data) {
    const newData = {
      id: `weather_${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString()
    };
    
    localWeatherData.push(newData);
    return newData;
  }

  // Eliminar datos meteorológicos por ID
  deleteWeatherData(id) {
    const index = localWeatherData.findIndex(data => data.id === id);
    if (index === -1) {
      return false;
    }
    localWeatherData.splice(index, 1);
    return true;
  }
}

module.exports = new WeatherController();
