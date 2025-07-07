const request = require('supertest');
const express = require('express');

let app;

describe('GET /weather/history/:city', () => {
  
  beforeEach(() => {
    delete require.cache[require.resolve('../../src/app')];
  });

  it('should return weather history for a city', async () => {
    app = require('../../src/app');
    
    // Primero crear algunos datos
    const weatherData1 = {
      city: 'Madrid',
      temperature: 25.5,
      humidity: 60,
      condition: 'Soleado'
    };

    const weatherData2 = {
      city: 'Madrid',
      temperature: 22.0,
      humidity: 70,
      condition: 'Nublado'
    };

    await request(app).post('/weather').send(weatherData1);
    await request(app).post('/weather').send(weatherData2);

    const response = await request(app)
      .get('/weather/history/Madrid')
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThanOrEqual(2);
    expect(response.body.data[0].city).toBe('Madrid');
  });

  it('should return empty array for city with no history', async () => {
    app = require('../../src/app');
    
    const response = await request(app)
      .get('/weather/history/CiudadInexistente')
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(0);
  });

  it('should return history sorted by date (newest first)', async () => {
    app = require('../../src/app');
    
    const response = await request(app)
      .get('/weather/history/Madrid')
      .expect(200);

    if (response.body.data.length > 1) {
      const firstDate = new Date(response.body.data[0].createdAt);
      const secondDate = new Date(response.body.data[1].createdAt);
      expect(firstDate.getTime()).toBeGreaterThanOrEqual(secondDate.getTime());
    }
  });
});
