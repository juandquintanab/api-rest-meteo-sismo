/**
 * Middleware de manejo de errores
 */

// Middleware para manejar errores 404
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware para manejar errores generales
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode);
  res.json({
    error: statusCode === 404 ? 'Not Found' : statusCode === 500 ? 'Internal Server Error' : err.message || 'Internal Server Error',
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = {
  notFound,
  errorHandler
};
