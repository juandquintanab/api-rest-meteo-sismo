const request = require('supertest');
const express = require('express');

let app;

describe('GET /weather/:source', () => {
  
  beforeEach(() => {
    delete require.cache[require.resolve('../../src/app')];
  });

  it('should return weather data for a valid city from OpenWeatherMap', async () => {
    app = require('../../src/app');
    
    const response = await request(app)
      .get('/weather/openweathermap?city=Madrid')
      .expect(200);

    expect(response.body).toHaveProperty('city', 'Madrid');
    expect(response.body).toHaveProperty('temperature');
    expect(response.body).toHaveProperty('humidity');
    expect(response.body).toHaveProperty('condition');
  });

  it('should return weather data for a valid city from WeatherAPI', async () => {
    app = require('../../src/app');
    
    const response = await request(app)
      .get('/weather/weatherapi?city=Barcelona')
      .expect(200);

    expect(response.body).toHaveProperty('city', 'Barcelona');
    expect(response.body).toHaveProperty('temperature');
    expect(response.body).toHaveProperty('humidity');
    expect(response.body).toHaveProperty('condition');
  });

  it('should return local data when source is local', async () => {
    app = require('../../src/app');
    
    const response = await request(app)
      .get('/weather/local?city=Valencia')
      .expect(200);

    expect(response.body).toHaveProperty('city', 'Valencia');
    expect(response.body).toHaveProperty('temperature');
    expect(response.body).toHaveProperty('humidity');
    expect(response.body).toHaveProperty('condition');
  });

  it('should return "No hay registros climáticos" when no local data exists', async () => {
    app = require('../../src/app');
    
    const response = await request(app)
      .get('/weather/local?city=CiudadInexistente')
      .expect(404);

    expect(response.body).toHaveProperty('message', 'No hay registros climáticos');
  });

  it('should return 400 when city parameter is missing', async () => {
    app = require('../../src/app');
    
    const response = await request(app)
      .get('/weather/openweathermap')
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('city');
  });

  it('should return 400 for invalid source', async () => {
    app = require('../../src/app');
    
    const response = await request(app)
      .get('/weather/invalid?city=Madrid')
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('source');
  });
});
