# Backend API Pengguna

Project RESTful API untuk manajemen data pengguna yang dibangun dengan Node.js dan Express. Project ini mendukung dua database: MongoDB dan MySQL.

## 🚀 Fitur

- **CRUD Operations**: Create, Read, Update, Delete data pengguna
- **Validasi Input**: Validasi nama (2-50 karakter), email (format valid & unik), dan usia (1-120 tahun)
- **Error Handling**: Response error yang terstruktur dan jelas
- **Swagger Documentation**: Dokumentasi API interaktif (untuk versi MySQL)
- **CORS Support**: Cross-origin resource sharing diaktifkan
- **Environment Variables**: Konfigurasi flexibel melalui file .env

## 📋 Requirements

- **Node.js** versi 14.0.0 atau lebih tinggi
- **MySQL** versi 5.7+ atau 8.0+ (untuk versi MySQL)
- **MongoDB** versi 4.4+ (untuk versi MongoDB)
- **npm** versi 6.0.0 atau lebih tinggi
- **Git** (untuk clone repository)

## 🛠️ Installation

### 1. Clone Repository
```bash
git clone <url-repository>
cd 2.\ backend-api-pengguna
```

### 2. Install Dependencies
Install semua package yang dibutuhkan:
```bash
npm install
```

Command ini akan:
- Membaca `package.json` untuk melihat dependencies
- Download semua packages dari npm registry
- Menyimpannya di folder `node_modules`
- Membuat file `package-lock.json` untuk lock versi

**Dependencies yang akan diinstall:**
- `express` - Web framework
- `cors` - Middleware untuk CORS
- `dotenv` - Untuk environment variables
- `express-validator` - Validasi input
- `mysql2` - MySQL driver
- `swagger-jsdoc` & `swagger-ui-express` - Dokumentasi API

### 3. Setup Database

#### Untuk MySQL (Default):
1. Buat database di MySQL:
```sql
CREATE DATABASE api_pengguna;
```

2. Konfigurasi file `.env` (sudah ada di project):
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=api_pengguna
```

**Penjelasan variabel:**
- `PORT`: Port untuk server (default: 3000)
- `DB_HOST`: Host database MySQL (default: localhost)
- `DB_USER`: Username MySQL (default: root)
- `DB_PASSWORD`: Password MySQL (kosong jika tanpa password)
- `DB_NAME`: Nama database (default: api_pengguna)

#### Untuk MongoDB:
Tambahkan di file `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/api_pengguna
```

### 4. Verifikasi Installation

Pastikan struktur folder sudah lengkap:
```
2. backend-api-pengguna/
├── config/
│   ├── database.js          # MongoDB config
│   ├── database-mysql.js    # MySQL config
│   └── swagger.js           # Swagger config
├── models/
│   └── User.js              # User model (MongoDB)
├── routes/
│   ├── userRoutes.js        # Routes MongoDB
│   ├── userRoutes-mysql.js  # Routes MySQL
│   └── userRoutes-swagger.js # Routes with Swagger
├── node_modules/            # Dependencies (auto-generated)
├── .env                     # Environment variables
├── package.json             # Project config
├── package-lock.json        # Lock versions
├── server.js                # Server MongoDB
├── server-mysql.js          # Server MySQL (default)
└── README.md               # This file
```

## 🏃 Menjalankan Server

### Versi MySQL (Default dengan Swagger)
```bash
npm start
```
atau untuk development dengan auto-restart:
```bash
npm run dev
```

### Versi MongoDB
```bash
node server.js
```

### Verifikasi Server Berjalan
1. Server akan menampilkan log:
```
Server dengan MySQL berjalan pada http://localhost:3000
Swagger documentation: http://localhost:3000/api-docs
MySQL database initialized successfully
```

2. Test di browser:
- Buka `http://localhost:3000`
- Seharusnya muncul response JSON dengan pesan sukses

3. Test Swagger (untuk versi MySQL):
- Buka `http://localhost:3000/api-docs`
- Akan muncul dokumentasi interaktif

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication
Tidak memerlukan authentication (untuk project ini).

### Headers
Required headers untuk POST/PUT requests:
```http
Content-Type: application/json
```

### Response Format
Semua response mengikuti format:
```json
{
  "success": true|false,
  "message": "Deskripsi pesan",
  "data": {}|[],     // Optional, untuk success response
  "errors": []       // Optional, untuk error response
}
```

## 🔗 API Endpoints

### 1. Root Endpoint
**GET** `/`

Mendapatkan informasi API

**Response:**
```json
{
  "success": true,
  "message": "API Pengguna dengan MySQL berjalan dengan baik!",
  "version": "1.0.0",
  "database": "MySQL",
  "documentation": "/api-docs",
  "endpoints": {
    "POST /users": "Tambah pengguna baru",
    "GET /users": "Ambil semua pengguna",
    "GET /users/:id": "Ambil pengguna berdasarkan ID",
    "DELETE /users/:id": "Hapus pengguna berdasarkan ID"
  }
}
```

### 2. Create User
**POST** `/users`

Menambahkan pengguna baru ke database

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

**Validasi:**
- `name`: Required, string, 2-50 karakter
- `email`: Required, string, format email valid, unik
- `age`: Required, integer, 1-120

**Success Response (201):**
```json
{
  "success": true,
  "message": "Pengguna berhasil ditambahkan",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "created_at": "2023-12-06T10:00:00.000Z",
    "updated_at": "2023-12-06T10:00:00.000Z"
  }
}
```

**Error Responses:**

400 - Validasi gagal:
```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": [
    {
      "field": "email",
      "message": "Silakan masukkan email yang valid"
    }
  ]
}
```

400 - Email sudah digunakan:
```json
{
  "success": false,
  "message": "Email sudah digunakan"
}
```

### 3. Get All Users
**GET** `/users`

Mengambil semua data pengguna

**Success Response (200):**
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
      "created_at": "2023-12-06T10:00:00.000Z",
      "updated_at": "2023-12-06T10:00:00.000Z"
    }
  ],
  "total": 1
}
```

### 4. Get User by ID
**GET** `/users/:id`

Mengambil data pengguna berdasarkan ID

**Parameters:**
- `id` (path): ID pengguna (integer untuk MySQL, string ObjectId untuk MongoDB)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Data pengguna berhasil diambil",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "created_at": "2023-12-06T10:00:00.000Z",
    "updated_at": "2023-12-06T10:00:00.000Z"
  }
}
```

**Error Responses:**

400 - ID tidak valid:
```json
{
  "success": false,
  "message": "ID pengguna tidak valid"
}
```

404 - Pengguna tidak ditemukan:
```json
{
  "success": false,
  "message": "Pengguna tidak ditemukan"
}
```

### 5. Delete User
**DELETE** `/users/:id`

Menghapus pengguna berdasarkan ID

**Parameters:**
- `id` (path): ID pengguna

**Success Response (200):**
```json
{
  "success": true,
  "message": "Pengguna berhasil dihapus",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "created_at": "2023-12-06T10:00:00.000Z",
    "updated_at": "2023-12-06T10:00:00.000Z"
  }
}
```

## 🧪 Contoh Penggunaan dengan cURL

### 1. Test Server Running
```bash
curl http://localhost:3000
```

### 2. Create User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "age": 28
  }'
```

### 3. Get All Users
```bash
curl http://localhost:3000/users
```

### 4. Get User by ID
```bash
curl http://localhost:3000/users/1
```

### 5. Delete User
```bash
curl -X DELETE http://localhost:3000/users/1
```

### 6. Test Error Response
```bash
# Invalid email
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "invalid-email",
    "age": 25
  }'
```

## 📖 Swagger Documentation

Untuk versi MySQL, API dilengkapi dengan dokumentasi Swagger yang dapat diakses di:
```
http://localhost:3000/api-docs
```

### Fitur Swagger:
1. **Interactive Documentation**: Lihat semua endpoint dengan detail
2. **Try It Out**: Test API langsung dari browser
3. **Schema Documentation**: Lihat model data dan validasi
4. **Response Examples**: Contoh response untuk setiap endpoint

### Cara Menggunakan:
1. Jalankan server: `npm start`
2. Buka browser: `http://localhost:3000/api-docs`
3. Klik endpoint yang ingin di-test
4. Klik "Try it out"
5. Isi parameter/request body
6. Klik "Execute" untuk test

## 🔧 Development Guide

### Project Structure Explained:
- `config/`: Konfigurasi database dan Swagger
- `models/`: Schema dan model data (MongoDB)
- `routes/`: Handler untuk setiap endpoint
- `server.js`: Entry point untuk versi MongoDB
- `server-mysql.js`: Entry point untuk versi MySQL (default)

### Menambah Endpoint Baru:
1. Tambahkan validasi rules di `models/User.js`
2. Buat handler di `routes/userRoutes-mysql.js`
3. Tambahkan Swagger annotation (jika perlu)
4. Test dengan Postman atau cURL

### Common Issues:
1. **Port already in use**: Ubah PORT di .env atau kill process
2. **Database connection failed**: Pastikan MySQL/MongoDB running
3. **Module not found**: Jalankan `npm install` lagi

### Scripts Available:
```bash
npm start      # Menjalankan server MySQL
npm run dev    # Menjalankan dengan nodemon (auto-restart)
```

## 🎯 Tips Tambahan

1. **Untuk production**: Gunakan PM2 untuk process management
2. **Security**: Tambahkan authentication & authorization
3. **Performance**: Implementasi pagination dan caching
4. **Logging**: Tambahkan Winston untuk logging yang baik
5. **Testing**: Tambahkan Jest untuk unit testing

## 📝 Perbedaan MongoDB vs MySQL

| Feature | MongoDB | MySQL |
|---------|---------|-------|
| ID Type | ObjectId (string) | Auto-increment integer |
| Validation | Mongoose schema | Manual validation |
| Timestamps | `timestamps: true` | `DEFAULT CURRENT_TIMESTAMP` |
| Error Duplicate | Code: 11000 | Code: 'ER_DUP_ENTRY' |
| Documentation | Manual | Swagger auto-generated |
| Query Language | MongoDB Query | SQL |

## 🚨 Error Handling

Common error codes:
- `400`: Bad Request (validasi gagal)
- `404`: Not Found (data tidak ada)
- `500`: Internal Server Error (kesalahan server)

Selalu cek response body untuk detail error.

## 📄 License

MIT License - Free to use for commercial and personal projects

---

## 🤝 Contributing

1. Fork the project
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

Jika ada pertanyaan:
- Cek documentation ini
- Test dengan Swagger UI
- Cek console logs untuk error details