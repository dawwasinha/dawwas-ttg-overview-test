const mongoose = require('mongoose');
const { body } = require('express-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama harus diisi'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email harus diisi'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Silakan masukkan email yang valid'
    ]
  },
  age: {
    type: Number,
    required: [true, 'Usia harus diisi'],
    min: [1, 'Usia minimal adalah 1']
  }
}, {
  timestamps: true
});

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

module.exports = {
  User: mongoose.model('User', userSchema),
  userValidationRules
};