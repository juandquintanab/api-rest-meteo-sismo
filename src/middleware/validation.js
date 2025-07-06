/**
 * Middleware de validación para datos meteorológicos y sismológicos
 */

const { weatherSchema, seismicSchema } = require('../config/validationSchemas');

// Función de validación
function validateData(data, schema) {
  const errors = [];

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];

    // Verificar si es requerido
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors.push(`${field} is required`);
      continue;
    }

    // Si no es requerido y no tiene valor, continuar
    if (!rules.required && (value === undefined || value === null)) {
      continue;
    }

    // Verificar tipo
    if (rules.type === 'number' && typeof value !== 'number') {
      errors.push(`${field} must be a number`);
      continue;
    }

    if (rules.type === 'string' && typeof value !== 'string') {
      errors.push(`${field} must be a string`);
      continue;
    }

    // Verificar enum para strings
    if (rules.type === 'string' && rules.enum && !rules.enum.includes(value)) {
      errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
      continue;
    }

    // Verificar rango para números
    if (rules.type === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        errors.push(`${field} must be at least ${rules.min}`);
      }
      if (rules.max !== undefined && value > rules.max) {
        errors.push(`${field} must be at most ${rules.max}`);
      }
    }

    // Verificar longitud para strings
    if (rules.type === 'string') {
      if (rules.minLength !== undefined && value.length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
      }
      if (rules.maxLength !== undefined && value.length > rules.maxLength) {
        errors.push(`${field} must be at most ${rules.maxLength} characters`);
      }
    }
  }

  return errors;
}

// Middleware de validación para weather
const validateWeather = (req, res, next) => {
  const errors = validateData(req.body, weatherSchema);
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Invalid weather data',
      details: errors
    });
  }
  
  next();
};

// Middleware de validación para seismic
const validateSeismic = (req, res, next) => {
  const errors = validateData(req.body, seismicSchema);
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Invalid seismic data',
      details: errors
    });
  }
  
  next();
};

module.exports = {
  validateWeather,
  validateSeismic
};
