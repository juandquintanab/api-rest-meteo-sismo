# API REST para Datos Meteorológicos y Sismológicos
## Cómo probar la API manualmente

1. **Inicia el servidor:**

   ```bash
   node src/app.js
   ```

   Por defecto, el servidor corre en `http://localhost:3000` .

2. **Probar endpoint POST /weather:**

   ```bash
   curl -X POST http://localhost:3000/weather \
     -H "Content-Type: application/json" \
     -d '{
       "city": "Madrid",
       "temperature": 25.5,
       "humidity": 60,
       "condition": "Soleado"
     }'
   ```

   Respuesta esperada:
   ```json
   {
     "message": "Weather data saved successfully",
     "data": {
       "id": "<ObjectId>",
       "city": "Madrid",
       ...
     }
   }
   ```

3. **Probar validación de campos requeridos:**

   ```bash
   curl -X POST http://localhost:3000/weather \
     -H "Content-Type: application/json" \
     -d '{ "temperature": 25.5 }'
   ```
   Respuesta esperada: status 400 y `{ "error": "Validation failed" }`

4. **Probar otros endpoints:**
   - Consulta la colección de rutas en el código fuente (`src/routes/`).

Puedes usar también Postman, Insomnia o cualquier cliente HTTP para probar los endpoints.
## Estado del Proyecto

### ✅ Completado:
- Configuración inicial del repositorio
- GitFlow configurado
- Node.js y dependencias instaladas
- MongoDB Atlas configurado y conectado
- Servidor Express básico funcionando
- **Implementación de TDD y rutas básicas**
- **Estructura modular de rutas**

### 🚧 En Progreso:
- Middleware de validación y manejo de errores

### 📋 Por Hacer:
- Modelos de datos con MongoDB
- Controladores avanzados
- Integración con APIs externas
- Documentación con Swagger

## Changelog

### v1.0.0 - Primera Release
- ✅ Configuración completa del proyecto
- ✅ Conexión a MongoDB Atlas
- ✅ Rutas básicas para weather y seismic data
- ✅ Tests de integración con TDD
- ✅ Estructura modular de rutas
