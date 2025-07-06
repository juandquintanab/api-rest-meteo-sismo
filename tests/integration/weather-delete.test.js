const request = require('supertest');
const express = require('express');

let app;

describe('DELETE /weather/:id', () => {
  
  beforeEach(() => {
    delete require.cache[require.resolve('../../src/app')];
  });

  it('should delete weather record by ID', async () => {
    app = require('../../src/app');
    
    // Primero crear un registro
    const weatherData = {
      city: 'Madrid',
      temperature: 25.5,
      humidity: 60,
      condition: 'Soleado'
    };

    const createResponse = await request(app)
      .post('/weather')
      .send(weatherData)
      .expect(201);

    const recordId = createResponse.body.data.id;

    // Eliminar el registro
    const deleteResponse = await request(app)
      .delete(`/weather/${recordId}`)
      .expect(200);

    expect(deleteResponse.body).toHaveProperty('message');
    expect(deleteResponse.body.message).toContain('deleted successfully');

    // Verificar que ya no existe
    const historyResponse = await request(app)
      .get('/weather/history/Madrid')
      .expect(200);

    const deletedRecord = historyResponse.body.data.find(record => record.id === recordId);
    expect(deletedRecord).toBeUndefined();
  });

  it('should return 404 for non-existent ID', async () => {
    app = require('../../src/app');
    
    const response = await request(app)
      .delete('/weather/nonexistent_id')
      .expect(404);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Not Found');
  });

  it('should return 400 for invalid ID format', async () => {
    app = require('../../src/app');
    
    const response = await request(app)
      .delete('/weather/invalid-format')
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Invalid ID format');
  });
});
