const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Pengguna',
      version: '1.0.0',
      description: 'API untuk manajemen data pengguna menggunakan Express dan MySQL',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'age'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID unik pengguna',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Nama lengkap pengguna',
              minLength: 2,
              maxLength: 50,
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email unik pengguna',
              example: 'john@example.com'
            },
            age: {
              type: 'integer',
              minimum: 1,
              maximum: 120,
              description: 'Usia pengguna',
              example: 25
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Waktu pembuatan record'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Waktu terakhir update'
            }
          }
        },
        CreateUserRequest: {
          type: 'object',
          required: ['name', 'email', 'age'],
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 50,
              description: 'Nama lengkap pengguna',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email unik pengguna',
              example: 'john@example.com'
            },
            age: {
              type: 'integer',
              minimum: 1,
              maximum: 120,
              description: 'Usia pengguna',
              example: 25
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operation successful'
            },
            data: {
              type: 'object'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message'
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string'
                  },
                  message: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './server-mysql.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;