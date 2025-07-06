const express = require('express');
const { validateSeismic } = require('../middleware/validation');
const router = express.Router();

// Almacenamiento temporal (será reemplazado por MongoDB)
let seismicData = [];

// GET /api/seismic
router.get('/', (req, res) => {
  res.json({
    data: seismicData,
    count: seismicData.length,
    timestamp: new Date().toISOString()
  });
});

// POST /api/seismic - CON VALIDACIÓN
router.post('/', validateSeismic, (req, res) => {
  const newSeismicData = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  seismicData.push(newSeismicData);
  
  res.status(201).json({
    message: 'Seismic data created successfully',
    data: newSeismicData
  });
});

module.exports = router;
