/**
 * Middleware de logging personalizado
 */

const logger = (req, res, next) => {
  const start = Date.now();
  
  // Log de la petición entrante
  console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  
  // Interceptar el final de la respuesta
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusEmoji = status >= 200 && status < 300 ? '✅' : 
                       status >= 400 && status < 500 ? '⚠️' : '❌';
    
    console.log(`${statusEmoji} ${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${status} (${duration}ms)`);
  });
  
  next();
};

module.exports = logger;
