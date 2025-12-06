const express = require('express');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { User, userValidationRules } = require('../models/User');

const router = express.Router();

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

router.post('/', userValidationRules, validateRequest, async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah digunakan'
      });
    }

    const user = new User({
      name,
      email,
      age
    });

    const savedUser = await user.save();

    res.status(201).json({
      success: true,
      message: 'Pengguna berhasil ditambahkan',
      data: savedUser
    });
  } catch (error) {
    if (error.code === 11000) {
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

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-__v');

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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID pengguna tidak valid'
      });
    }

    const user = await User.findById(id).select('-__v');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Pengguna tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data pengguna berhasil diambil',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID pengguna tidak valid'
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Pengguna tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Pengguna berhasil dihapus',
      data: user
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