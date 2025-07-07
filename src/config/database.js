const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {    
        console.log('🔄 Conectando a MongoDB...');
        const conn = await mongoose.connect(process.env.MONGODB_URI, {   
            useNewUrlParser: true,      
            useUnifiedTopology: true,    
        });    
        console.log(`✅ MongoDB conectado: ${conn.connection.host}`);    
        console.log(`📁 Base de datos: ${conn.connection.name}`);  
    } catch (error) {    
        console.error('❌ Error conectando a MongoDB:', error.message);    
        process.exit(1);  
    }
};

module.exports = connectDB;