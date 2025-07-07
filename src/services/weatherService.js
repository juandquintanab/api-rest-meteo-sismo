const axios = require('axios');

class WeatherService {
  constructor() {
    this.openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
    this.weatherApiKey = process.env.WEATHERAPI_KEY;
  }

  async getOpenWeatherData(city) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.openWeatherApiKey}&units=metric`
      );
      
      return {
        city: response.data.name,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        condition: this.mapOpenWeatherCondition(response.data.weather[0].main)
      };
    } catch (error) {
      throw new Error(`Error fetching data from OpenWeatherMap: ${error.message}`);
    }
  }

  async getWeatherApiData(city) {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${this.weatherApiKey}&q=${city}&aqi=no`
      );
      
      return {
        city: response.data.location.name,
        temperature: response.data.current.temp_c,
        humidity: response.data.current.humidity,
        condition: this.mapWeatherApiCondition(response.data.current.condition.text)
      };
    } catch (error) {
      throw new Error(`Error fetching data from WeatherAPI: ${error.message}`);
    }
  }

  mapOpenWeatherCondition(condition) {
    const conditionMap = {
      'Clear': 'Soleado',
      'Clouds': 'Nublado',
      'Rain': 'Lluvioso',
      'Thunderstorm': 'Tormenta',
      'Snow': 'Nevado',
      'Mist': 'Neblina'
    };
    return conditionMap[condition] || condition;
  }

  mapWeatherApiCondition(condition) {
    const conditionMap = {
      'Sunny': 'Soleado',
      'Partly cloudy': 'Parcialmente nublado',
      'Cloudy': 'Nublado',
      'Overcast': 'Nublado',
      'Light rain': 'Lluvia ligera',
      'Moderate rain': 'Lluvia moderada',
      'Heavy rain': 'Lluvia intensa',
      'Thunder': 'Tormenta'
    };
    return conditionMap[condition] || condition;
  }
}

module.exports = new WeatherService();
