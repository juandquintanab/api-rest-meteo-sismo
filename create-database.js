const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Verificando configuración de base de datos...');
console.log('=' .repeat(50));

// Verificar la URL actual
const currentUri = process.env.MONGODB_URI;
console.log('📍 URL actual:', currentUri ? currentUri.replace(/\/\/.*:.*@/, '//***:***@') : 'No configurada');

// Verificar si la URL incluye el nombre de la base de datos
if (currentUri && !currentUri.includes('/api-meteo-sismo')) {
  console.log('⚠️  La URL no incluye el nombre de la base de datos');
  console.log('💡 Debes agregar /api-meteo-sismo antes del ? en tu archivo .env');
  console.log('   Ejemplo: mongodb+srv://usuario:contraseña@cluster.mongodb.net/api-meteo-sismo?retryWrites=true&w=majority');
  process.exit(1);
}

async function createDatabase() {
  try {
    console.log('\n🔄 Conectando a MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Conexión exitosa!');
    console.log(`📡 Host: ${conn.connection.host}`);
    console.log(`📁 Base de datos: ${conn.connection.name}`);
    
    // Crear una colección de prueba para forzar la creación de la base de datos
    console.log('\n🧪 Creando colección de prueba en api-meteo-sismo...');
    const testCollection = conn.connection.db.collection('test_collection');
    await testCollection.insertOne({ 
      test: true, 
      timestamp: new Date(),
      message: 'Prueba de creación de base de datos api-meteo-sismo',
      database: 'api-meteo-sismo'
    });
    console.log('✅ Colección de prueba creada exitosamente');
    
    // Verificar que la base de datos existe
    const adminDb = conn.connection.db.admin();
    const dbList = await adminDb.listDatabases();
    const dbExists = dbList.databases.some(db => db.name === 'api-meteo-sismo');
    
    if (dbExists) {
      console.log('✅ Base de datos api-meteo-sismo confirmada en MongoDB Atlas');
    } else {
      console.log('⚠️  Base de datos api-meteo-sismo no encontrada');
    }
    
    // Limpiar colección de prueba
    await testCollection.deleteOne({ test: true });
    console.log('🧹 Colección de prueba eliminada');
    
    await mongoose.connection.close();
    console.log('🔚 Conexión cerrada correctamente');
    
    console.log('\n🎉 ¡Base de datos api-meteo-sismo creada exitosamente!');
    console.log('💡 Ahora puedes verificar en MongoDB Atlas:');
    console.log('   1. Ve a tu cluster en Atlas');
    console.log('   2. Haz clic en "Browse Collections"');
    console.log('   3. Deberías ver la base de datos "api-meteo-sismo"');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    if (error.message.includes('Invalid scheme')) {
      console.error('🔴 Error en la URL de conexión');
      console.error('💡 Verifica que tu archivo .env tenga la URL correcta');
      console.error('   Debe empezar con: mongodb+srv://');
    } else if (error.message.includes('authentication')) {
      console.error('🔴 Error de autenticación');
      console.error('💡 Verifica usuario y contraseña en MongoDB Atlas');
    } else {
      console.error('🔴 Error desconocido');
      console.error('💡 Verifica la configuración completa');
    }
    
    process.exit(1);
  }
}

createDatabase();