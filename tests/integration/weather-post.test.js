const request = require('supertest');
const express = require('express');

let app;

describe('POST /weather', () => {
  
  beforeEach(() => {
    delete require.cache[require.resolve('../../src/app')];
  });

  it('should save weather data and return ID', async () => {
    app = require('../../src/app');
    
    const weatherData = {
      city: 'Madrid',
      temperature: 25.5,
      humidity: 60,
      condition: 'Soleado'
    };

    const response = await request(app)
      .post('/weather')
      .send(weatherData)
      .expect(201);

    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.id).toMatch(/^weather_\d+$/);
    expect(response.body.data.city).toBe('Madrid');
  });

  it('should validate required fields', async () => {
    app = require('../../src/app');
    
    const invalidData = {
      temperature: 25.5
      // Falta city, humidity, condition
    };

    const response = await request(app)
      .post('/weather')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Validation failed');
  });

  it('should validate condition enum values', async () => {
    app = require('../../src/app');
    
    const invalidData = {
      city: 'Madrid',
      temperature: 25.5,
      humidity: 60,
      condition: 'InvalidCondition'
    };

    const response = await request(app)
      .post('/weather')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });
});
