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


  describe('Weather Routes', () => {
    
    describe('GET /api/weather', () => {
      it('should return empty array when no weather data exists', async () => {
        app = require('../../src/app');
        
        const response = await request(app)
          .get('/api/weather')
          .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty('count');
        expect(response.body.count).toBe(0);
      });
    });

    describe('POST /api/weather', () => {
      it('should create weather data', async () => {
        app = require('../../src/app');
        
        const weatherData = {
          temperature: 25.5,
          humidity: 60,
          pressure: 1013.25,
          location: 'Madrid',
          timestamp: new Date().toISOString()
        };

        const response = await request(app)
          .post('/api/weather')
          .send(weatherData)
          .expect(201);

        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('temperature', 25.5);
      });
    });
  });

  describe('Seismic Routes', () => {
    
    describe('GET /api/seismic', () => {
      it('should return empty array when no seismic data exists', async () => {
        app = require('../../src/app');
        
        const response = await request(app)
          .get('/api/seismic')
          .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty('count');
        expect(response.body.count).toBe(0);
      });
    });

    describe('POST /api/seismic', () => {
      it('should create seismic data', async () => {
        app = require('../../src/app');
        
        const seismicData = {
          magnitude: 4.2,
          depth: 15.3,
          location: 'Chile',
          coordinates: {
            latitude: -33.4489,
            longitude: -70.6693
          },
          timestamp: new Date().toISOString()
        };

        const response = await request(app)
          .post('/api/seismic')
          .send(seismicData)
          .expect(201);

        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('magnitude', 4.2);
      });
    });
  });

  describe('Weather Routes', () => {
    
    describe('GET /api/weather', () => {
      it('should return empty array when no weather data exists', async () => {
        app = require('../../src/app');
        
        const response = await request(app)
          .get('/api/weather')
          .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty('count');
        expect(response.body.count).toBe(0);
      });
    });

    describe('POST /api/weather', () => {
      it('should create weather data', async () => {
        app = require('../../src/app');
        
        const weatherData = {
          temperature: 25.5,
          humidity: 60,
          pressure: 1013.25,
          location: 'Madrid',
          timestamp: new Date().toISOString()
        };

        const response = await request(app)
          .post('/api/weather')
          .send(weatherData)
          .expect(201);

        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('temperature', 25.5);
      });
    });
  });

  describe('Seismic Routes', () => {
    
    describe('GET /api/seismic', () => {
      it('should return empty array when no seismic data exists', async () => {
        app = require('../../src/app');
        
        const response = await request(app)
          .get('/api/seismic')
          .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty('count');
        expect(response.body.count).toBe(0);
      });
    });

    describe('POST /api/seismic', () => {
      it('should create seismic data', async () => {
        app = require('../../src/app');
        
        const seismicData = {
          magnitude: 4.2,
          depth: 15.3,
          location: 'Chile',
          coordinates: {
            latitude: -33.4489,
            longitude: -70.6693
          },
          timestamp: new Date().toISOString()
        };

        const response = await request(app)
          .post('/api/seismic')
          .send(seismicData)
          .expect(201);

        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('magnitude', 4.2);
      });
    });
  });
});
