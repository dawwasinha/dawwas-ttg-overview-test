require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

// Connect ke database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Pengguna berjalan dengan baik!',
    version: '1.0.0',
    endpoints: {
      'POST /users': 'Tambah pengguna baru',
      'GET /users': 'Ambil semua pengguna',
      'GET /users/:id': 'Ambil pengguna berdasarkan ID',
      'DELETE /users/:id': 'Hapus pengguna berdasarkan ID'
    }
  });
});

app.use('/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan server internal'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});