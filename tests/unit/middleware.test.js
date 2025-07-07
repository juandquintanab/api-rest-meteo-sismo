const request = require('supertest');
const express = require('express');

// Importaremos los middleware cuando los creemos
let app;

describe('Middleware Tests', () => {
  
  beforeEach(() => {
    // Reiniciar la app antes de cada test
    delete require.cache[require.resolve('../../src/app')];
  });

  describe('Validation Middleware', () => {
    
    it('should validate weather data correctly', async () => {
      app = require('../../src/app');
      
      const validWeatherData = {
        temperature: 25.5,
        humidity: 60,
        location: 'Madrid'
      };

      const response = await request(app)
        .post('/api/weather')
        .send(validWeatherData)
        .expect(201);

      expect(response.body).toHaveProperty('data');
    });

    it('should reject weather data with missing required fields', async () => {
      app = require('../../src/app');
      
      const invalidWeatherData = {
        temperature: 25.5
        // Falta humidity y location
      };

      const response = await request(app)
        .post('/api/weather')
        .send(invalidWeatherData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('validation');
    });

    it('should reject weather data with invalid temperature', async () => {
      app = require('../../src/app');
      
      const invalidWeatherData = {
        temperature: 'invalid', // Debe ser número
        humidity: 60,
        location: 'Madrid'
      };

      const response = await request(app)
        .post('/api/weather')
        .send(invalidWeatherData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('temperature');
    });

    it('should validate seismic data correctly', async () => {
      app = require('../../src/app');
      
      const validSeismicData = {
        magnitude: 4.2,
        depth: 15.3,
        location: 'Chile'
      };

      const response = await request(app)
        .post('/api/seismic')
        .send(validSeismicData)
        .expect(201);

      expect(response.body).toHaveProperty('data');
    });

    it('should reject seismic data with invalid magnitude', async () => {
      app = require('../../src/app');
      
      const invalidSeismicData = {
        magnitude: 15, // Magnitud imposible
        depth: 15.3,
        location: 'Chile'
      };

      const response = await request(app)
        .post('/api/seismic')
        .send(invalidSeismicData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('magnitude');
    });
  });

  describe('Error Handling Middleware', () => {
    
    it('should handle 404 errors gracefully', async () => {
      app = require('../../src/app');
      
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
      expect(response.body.error).toBe('Not Found');
    });

    it('should handle 500 errors gracefully', async () => {
      app = require('../../src/app');
      
      // Crear una ruta que genere error para testing
      app.get('/api/test-error', (req, res, next) => {
        next(new Error('Test error'));
      });

      const response = await request(app)
        .get('/api/test-error')
        .expect(500);

      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
      expect(response.body.error).toBe('Internal Server Error');
    });
  });

  describe('Security Middleware', () => {
    
    it('should include security headers', async () => {
      app = require('../../src/app');
      
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.headers).toHaveProperty('x-content-type-options');
      expect(response.headers).toHaveProperty('x-frame-options');
      expect(response.headers).toHaveProperty('x-xss-protection');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty request body', async () => {
      app = require('../../src/app');
      const response = await request(app)
        .post('/api/weather')
        .send({})
        .expect(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Validation failed');
    });

    it('should handle null values', async () => {
      app = require('../../src/app');
      const response = await request(app)
        .post('/api/weather')
        .send({
          temperature: null,
          humidity: 60,
          location: 'Madrid'
        })
        .expect(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should handle boundary values correctly', async () => {
      app = require('../../src/app');
      // Temperatura en el límite
      const response = await request(app)
        .post('/api/weather')
        .send({
          temperature: 100, // Límite máximo
          humidity: 0, // Límite mínimo
          location: 'A' // Límite mínimo de longitud
        })
        .expect(201);
      expect(response.body).toHaveProperty('data');
    });

    it('should reject values outside boundaries', async () => {
      app = require('../../src/app');
      const response = await request(app)
        .post('/api/weather')
        .send({
          temperature: 101, // Fuera del límite
          humidity: 60,
          location: 'Madrid'
        })
        .expect(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
