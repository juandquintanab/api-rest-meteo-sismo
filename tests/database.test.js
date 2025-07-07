const mongoose = require('mongoose');
require('dotenv').config();

describe('Database Connection', () => {
  
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Should connect to MongoDB', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

  test('Should have correct database name', () => {
    expect(mongoose.connection.name).toBe('api-meteo-sismo');
  });
});
