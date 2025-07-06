const mongoose = require('mongoose');
require('dotenv').config();

// Configuración global para tests
beforeAll(async () => {
  // Conectar a una base de datos de test
  const testDB = process.env.MONGODB_URI?.replace('/api-meteo-sismo', '/api-meteo-sismo-test');
  if (testDB) {
    await mongoose.connect(testDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterAll(async () => {
  // Limpiar y cerrar conexión después de todos los tests
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  }
});
