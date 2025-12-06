# Backend API Pengguna

Project API untuk manajemen data pengguna yang dibangun dengan Node.js dan Express. Project ini mendukung dua database: MongoDB dan MySQL.

## Fitur

- ✅ **POST /users** - Menambahkan pengguna baru
- ✅ **GET /users** - Mengambil semua pengguna
- ✅ **GET /users/:id** - Mengambil pengguna berdasarkan ID
- ✅ **DELETE /users/:id** - Menghapus pengguna berdasarkan ID
- ✅ **Validasi input** - Validasi nama, email, dan usia
- ✅ **Validasi email unik** - Email harus unik dalam database
- ✅ **Error handling** - Penanganan error yang baik
- ✅ **Swagger Documentation** - Dokumentasi API interaktif (untuk versi MySQL)

## Requirements

- Node.js (v14 atau lebih tinggi)
- MongoDB (untuk versi MongoDB)
- MySQL (untuk versi MySQL)
- npm atau yarn

## Installation

1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Buat file `.env` di root project:
   ```env
   # Untuk versi MongoDB
   MONGODB_URI=mongodb://localhost:27017/api_pengguna

   # Untuk versi MySQL
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=api_pengguna

   # Server port
   PORT=3000
   ```

## Menjalankan Server

### Versi MongoDB
```bash
node server.js
```

### Versi MySQL dengan Swagger Documentation
```bash
node server-mysql.js
```

Server akan berjalan di `http://localhost:3000`

Jika menggunakan versi MySQL, akses Swagger documentation di: `http://localhost:3000/api-docs`

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
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "created_at": "2023-07-07T12:34:56.789Z",
    "updated_at": "2023-07-07T12:34:56.789Z"
  }
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
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25,
      "created_at": "2023-07-07T12:34:56.789Z",
      "updated_at": "2023-07-07T12:34:56.789Z"
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
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "created_at": "2023-07-07T12:34:56.789Z",
    "updated_at": "2023-07-07T12:34:56.789Z"
  }
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
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "created_at": "2023-07-07T12:34:56.789Z",
    "updated_at": "2023-07-07T12:34:56.789Z"
  }
}
```

## Validasi

### Aturan Validasi
- **Name**: Wajib diisi, panjang 2-50 karakter
- **Email**: Wajib diisi, format email valid, harus unik
- **Age**: Wajib diisi, angka antara 1-120

### Format Error Response
```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": [
    {
      "field": "email",
      "message": "Email harus diisi"
    }
  ]
}
```

## Struktur Project

```
backend-api-pengguna/
├── config/
│   ├── database.js          # Konfigurasi koneksi MongoDB
│   ├── database-mysql.js    # Konfigurasi koneksi MySQL
│   └── swagger.js           # Konfigurasi Swagger documentation
├── models/
│   └── User.js              # Schema dan validasi model User (MongoDB)
├── routes/
│   ├── userRoutes.js        # Route handlers untuk API MongoDB
│   ├── userRoutes-mysql.js  # Route handlers untuk API MySQL
│   └── userRoutes-swagger.js # Route handlers dengan Swagger annotation
├── .env                     # Environment variables
├── package.json             # Project dependencies
├── server.js                # Main server file (MongoDB)
├── server-mysql.js          # Main server file (MySQL)
└── README.md                # Dokumentasi API
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
curl http://localhost:3000/users/1
```

### Hapus Pengguna
```bash
curl -X DELETE http://localhost:3000/users/1
```

## Swagger Documentation

API versi MySQL dilengkapi dengan dokumentasi Swagger yang dapat diakses di:
```
http://localhost:3000/api-docs
```

### Fitur Swagger
- 📚 **Interactive API Documentation** - Dokumentasi interaktif untuk semua endpoint
- 🧪 **Try It Out** - Test API langsung dari browser
- 📋 **Schema Documentation** - Validasi data input dan output
- 🔗 **API Reference** - Referensi lengkap semua endpoint

## Perbedaan Versi MongoDB dan MySQL

### MongoDB
- Menggunakan Mongoose ODM
- ID menggunakan ObjectId (24 karakter hex)
- Timestamps otomatis dengan `timestamps: true`
- Error handling untuk duplicate key (code: 11000)

### MySQL
- Menggunakan mysql2 library
- ID menggunakan auto-increment integer
- Timestamps dengan `DEFAULT CURRENT_TIMESTAMP`
- Error handling untuk duplicate entry (code: 'ER_DUP_ENTRY')
- Dilengkapi dengan Swagger documentation

## Development

### Menambahkan Endpoint Baru
1. Buat route handler di folder `routes/`
2. Tambahkan validasi jika diperlukan
3. Untuk versi MySQL, tambahkan Swagger annotation
4. Import dan gunakan route di server file

### Script yang Tersedia
- `npm start` - Menjalankan server dengan nodemon
- `npm test` - Menjalankan test (jika ada)

## License

MIT