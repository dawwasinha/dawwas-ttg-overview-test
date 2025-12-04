# API Pengguna dengan Express dan MySQL

API untuk manajemen data pengguna menggunakan Node.js, Express, dan MySQL.

## Fitur

- ✅ **POST /users** - Menambahkan pengguna baru
- ✅ **GET /users** - Mengambil semua pengguna
- ✅ **GET /users/:id** - Mengambil pengguna berdasarkan ID
- ✅ **DELETE /users/:id** - Menghapus pengguna berdasarkan ID
- ✅ **Validasi email unik** - Email harus unik dalam database
- ✅ **Validasi format JSON** - Data yang dikirim harus berformat JSON

## Requirements

- Node.js (v14 atau lebih tinggi)
- MongoDB
- npm atau yarn

## Installation

1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit file `.env` sesuai konfigurasi MongoDB Anda:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/api_pengguna
   ```

4. Jalankan server:
   ```bash
   npm run dev
   ```
   atau untuk production:
   ```bash
   npm start
   ```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. Menambahkan Pengguna Baru
**POST** `/users`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Pengguna berhasil ditambahkan",
  "data": {
    "_id": "64a8b1c2d3e4f5g6h7i8j9k0",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "createdAt": "2023-07-07T12:34:56.789Z",
    "updatedAt": "2023-07-07T12:34:56.789Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email sudah digunakan"
}
```

### 2. Mengambil Semua Pengguna
**GET** `/users`

**Response (200):**
```json
{
  "success": true,
  "message": "Daftar pengguna berhasil diambil",
  "data": [
    {
      "_id": "64a8b1c2d3e4f5g6h7i8j9k0",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25,
      "createdAt": "2023-07-07T12:34:56.789Z",
      "updatedAt": "2023-07-07T12:34:56.789Z"
    }
  ],
  "total": 1
}
```

### 3. Mengambil Pengguna Berdasarkan ID
**GET** `/users/:id`

**Response (200):**
```json
{
  "success": true,
  "message": "Data pengguna berhasil diambil",
  "data": {
    "_id": "64a8b1c2d3e4f5g6h7i8j9k0",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "createdAt": "2023-07-07T12:34:56.789Z",
    "updatedAt": "2023-07-07T12:34:56.789Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Pengguna tidak ditemukan"
}
```

### 4. Menghapus Pengguna Berdasarkan ID
**DELETE** `/users/:id`

**Response (200):**
```json
{
  "success": true,
  "message": "Pengguna berhasil dihapus",
  "data": {
    "_id": "64a8b1c2d3e4f5g6h7i8j9k0",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "createdAt": "2023-07-07T12:34:56.789Z",
    "updatedAt": "2023-07-07T12:34:56.789Z"
  }
}
```

## Validasi

### Validasi Input
- **Name**: Wajib diisi, panjang 2-50 karakter
- **Email**: Wajib diisi, format email valid, harus unik
- **Age**: Wajib diisi, angka antara 1-120

### Error Response Format
```json
{
  "success": false,
  "message": "Deskripsi error",
  "errors": [
    {
      "field": "email",
      "message": "Email harus diisi"
    }
  ]
}
```

## Contoh Penggunaan dengan cURL

### Tambah Pengguna
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "age": 28
  }'
```

### Ambil Semua Pengguna
```bash
curl http://localhost:3000/users
```

### Ambil Pengguna Berdasarkan ID
```bash
curl http://localhost:3000/users/64a8b1c2d3e4f5g6h7i8j9k0
```

### Hapus Pengguna
```bash
curl -X DELETE http://localhost:3000/users/64a8b1c2d3e4f5g6h7i8j9k0
```

## Project Structure

```
backend-api-pengguna/
├── config/
│   └── database.js      # Konfigurasi koneksi MongoDB
├── models/
│   └── User.js          # Schema dan validasi model User
├── routes/
│   └── userRoutes.js    # Route handlers untuk API
├── .env                 # Environment variables
├── package.json         # Project dependencies
├── server.js            # Main server file
└── README.md            # Dokumentasi API
```

## Swagger Documentation

API Pengguna dilengkapi dengan dokumentasi Swagger yang dapat diakses di:
```
http://localhost:3000/api-docs
```

### Fitur Swagger
- 📚 **Interactive API Documentation** - Dokumentasi interaktif untuk semua endpoint
- 🧪 **Try It Out** - Test API langsung dari browser
- 📋 **Schema Documentation** - Validasi data input dan output
- 🔗 **API Reference** - Referensi lengkap semua endpoint

### Swagger Schema Components
- **User** - Schema model data pengguna
- **CreateUserRequest** - Schema request untuk membuat pengguna baru
- **SuccessResponse** - Schema response sukses
- **ErrorResponse** - Schema response error

### Konfigurasi Swagger
- **OpenAPI Version**: 3.0.0
- **Server URL**: http://localhost:3000
- **API Version**: 1.0.0
- **Description**: API untuk manajemen data pengguna menggunakan Express dan MySQL

### Cara Mengakses Swagger
1. Jalankan server: `npm start`
2. Buka browser dan akses: `http://localhost:3000/api-docs`
3. Gunakan fitur "Try it out" untuk testing API langsung

## License

MIT