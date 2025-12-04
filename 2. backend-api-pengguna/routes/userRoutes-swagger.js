const express = require('express');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const { pool } = require('../config/database-mysql');

const router = express.Router();

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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID unik pengguna
 *           example: 1
 *         name:
 *           type: string
 *           description: Nama lengkap pengguna
 *           minLength: 2
 *           maxLength: 50
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Email unik pengguna
 *           example: john@example.com
 *         age:
 *           type: integer
 *           minimum: 1
 *           maximum: 120
 *           description: Usia pengguna
 *           example: 25
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Waktu pembuatan record
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Waktu terakhir update
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - age
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Nama lengkap pengguna
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Email unik pengguna
 *           example: john@example.com
 *         age:
 *           type: integer
 *           minimum: 1
 *           maximum: 120
 *           description: Usia pengguna
 *           example: 25
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Operation successful
 *         data:
 *           type: object
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Error message
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *               message:
 *                 type: string
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Menambahkan pengguna baru
 *     description: Menambahkan pengguna baru ke database dengan validasi
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: Pengguna berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Validasi gagal atau email sudah digunakan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', userValidationRules, validateRequest, async (req, res) => {
  try {
    const { name, email, age } = req.body;

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

    const [result] = await pool.execute(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age]
    );

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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Mengambil semua pengguna
 *     description: Mengambil daftar seluruh pengguna dari database
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Daftar pengguna berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     total:
 *                       type: integer
 *                       description: Total jumlah pengguna
 *       500:
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Mengambil pengguna berdasarkan ID
 *     description: Mengambil data pengguna spesifik berdasarkan ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pengguna
 *     responses:
 *       200:
 *         description: Data pengguna berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: ID pengguna tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Pengguna tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Menghapus pengguna berdasarkan ID
 *     description: Menghapus data pengguna dari database berdasarkan ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID pengguna
 *     responses:
 *       200:
 *         description: Pengguna berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: ID pengguna tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Pengguna tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

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