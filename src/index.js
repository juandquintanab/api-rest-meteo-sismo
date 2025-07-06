const app = require('./app');
const connectDB = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
});
