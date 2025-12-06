require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});