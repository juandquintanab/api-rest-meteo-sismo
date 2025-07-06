/**
 * Esquemas de validación centralizados
 */

const weatherSchema = {
  temperature: {
    type: 'number',
    required: true,
    min: -100,
    max: 100,
    description: 'Temperature in Celsius'
  },
  humidity: {
    type: 'number',
    required: true,
    min: 0,
    max: 100,
    description: 'Humidity percentage'
  },
  location: {
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 100,
    description: 'Location name'
  },
  pressure: {
    type: 'number',
    required: false,
    min: 800,
    max: 1200,
    description: 'Atmospheric pressure in hPa'
  }
};

const seismicSchema = {
  magnitude: {
    type: 'number',
    required: true,
    min: 0,
    max: 10,
    description: 'Earthquake magnitude'
  },
  depth: {
    type: 'number',
    required: true,
    min: 0,
    max: 1000,
    description: 'Depth in kilometers'
  },
  location: {
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 100,
    description: 'Location name'
  },
  coordinates: {
    type: 'object',
    required: false,
    description: 'Geographic coordinates'
  }
};

module.exports = {
  weatherSchema,
  seismicSchema
};
