require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger');
const { pool, initDB } = require('./config/database-mysql');
const userRoutes = require('./routes/userRoutes-swagger');

initDB().then(() => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'API Pengguna dengan MySQL berjalan dengan baik!',
      version: '1.0.0',
      database: 'MySQL',
      documentation: '/api-docs',
      endpoints: {
        'POST /users': 'Tambah pengguna baru',
        'GET /users': 'Ambil semua pengguna',
        'GET /users/:id': 'Ambil pengguna berdasarkan ID',
        'DELETE /users/:id': 'Hapus pengguna berdasarkan ID'
      }
    });
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.use('/users', userRoutes);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server internal'
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Endpoint tidak ditemukan'
    });
  });

  app.listen(PORT, () => {
    console.log(`Server dengan MySQL berjalan pada http://localhost:${PORT}`);
    console.log(`Swagger documentation: http://localhost:${PORT}/api-docs`);
  });
}).catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});