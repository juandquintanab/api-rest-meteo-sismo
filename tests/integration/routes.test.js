const request = require('supertest');
const express = require('express');

// Importaremos la app cuando la creemos
let app;

describe('API Routes', () => {
  
  beforeEach(() => {
    // Reiniciar la app antes de cada test
    delete require.cache[require.resolve('../../src/app')];
  });

  describe('GET /', () => {
    it('should return API information', async () => {
      // Esto fallará porque aún no hemos creado src/app.js
      app = require('../../src/app');
      
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('description');
      expect(response.body.name).toBe('API REST Meteo Sismo');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      app = require('../../src/app');
      
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body.status).toBe('OK');
    });
  });
});
