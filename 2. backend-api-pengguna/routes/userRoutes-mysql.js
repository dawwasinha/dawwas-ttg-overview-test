const express = require('express');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const { pool } = require('../config/database-mysql');

const router = express.Router();

// Validasi rules untuk user
const userValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Nama harus diisi')
    .isLength({ min: 2, max: 50 })
    .withMessage('Nama harus memiliki panjang 2-50 karakter'),

  body('email')
    .isEmail()
    .withMessage('Silakan masukkan email yang valid')
    .normalizeEmail(),

  body('age')
    .isInt({ min: 1, max: 120 })
    .withMessage('Usia harus antara 1-120 tahun')
];

// Middleware untuk validasi
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors: errors.array()
    });
  }
  next();
};

// POST /users - Menambahkan pengguna baru
router.post('/', userValidationRules, validateRequest, async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Cek apakah email sudah ada
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah digunakan'
      });
    }

    // Insert user baru
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age]
    );

    // Ambil user yang baru ditambahkan
    const [newUser] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Pengguna berhasil ditambahkan',
      data: newUser[0]
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Email sudah digunakan'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
});

// GET /users - Mengambil daftar seluruh pengguna
router.get('/', async (req, res) => {
  try {
    const [users] = await pool.execute('SELECT * FROM users ORDER BY created_at DESC');

    res.status(200).json({
      success: true,
      message: 'Daftar pengguna berhasil diambil',
      data: users,
      total: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
});

// GET /users/:id - Mengambil data pengguna berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi ID harus angka
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID pengguna tidak valid'
      });
    }

    const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pengguna tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data pengguna berhasil diambil',
      data: users[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
});

// DELETE /users/:id - Menghapus pengguna berdasarkan ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi ID harus angka
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID pengguna tidak valid'
      });
    }

    // Cek apakah user exists
    const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pengguna tidak ditemukan'
      });
    }

    // Hapus user
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Pengguna berhasil dihapus',
      data: users[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
});

module.exports = router;