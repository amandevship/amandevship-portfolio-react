# AmanDevShip API Server

A robust Node.js API server built with TypeScript, Express, and MongoDB for authentication via email and mobile.

## 🚀 Features

- **MVC Architecture**: Clean separation of concerns with Models, Views (responses), and Controllers
- **TypeScript**: Full type safety and better development experience
- **Authentication**: Login via email or mobile with JWT tokens
- **Security**: Helmet, CORS, rate limiting, input validation
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Express-validator for request validation
- **Error Handling**: Comprehensive error handling and logging
- **Environment Config**: Flexible configuration with environment variables

## 📁 Project Structure

```
server/
├── src/
│   ├── config/           # Database and configuration
│   │   └── database.ts
│   ├── controllers/      # Business logic
│   │   └── authController.ts
│   ├── middleware/       # Express middleware
│   │   ├── auth.ts       # Authentication middleware
│   │   └── validation.ts # Input validation
│   ├── models/           # MongoDB models
│   │   └── User.ts       # User schema
│   ├── routes/           # API routes
│   │   ├── auth.ts       # Authentication routes
│   │   └── index.ts      # Main routes
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   └── helpers.ts
│   └── server.ts         # Express server setup
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── nodemon.json          # Development configuration
└── README.md
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Environment Setup:**
   Copy `.env` file and update the values:
   ```bash
   cp .env .env.local
   ```

3. **MongoDB Setup:**
   Make sure MongoDB is running locally or update `MONGODB_URI` in `.env`

## 🚀 Running the Server

### Development Mode
```bash
yarn dev
```
This runs the server with hot reload using nodemon and ts-node.

### Production Mode
```bash
yarn build
yarn start
```

### Available Scripts
- `yarn dev` - Development server with hot reload
- `yarn build` - Compile TypeScript to JavaScript
- `yarn start` - Run production server
- `yarn clean` - Remove dist folder
- `yarn lint` - Run ESLint (if configured)

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/login`
Login with email or mobile.

**Request Body:**
```json
{
  "identifier": "user@example.com", // or "+1234567890"
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "...",
      "email": "user@example.com",
      "mobile": "+1234567890",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isEmailVerified": false,
      "isMobileVerified": false
    },
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",      // optional
  "mobile": "+1234567890",          // optional (but one required)
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### GET `/api/auth/profile`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### POST `/api/auth/refresh-token`
Refresh JWT token.

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

### Health Check
#### GET `/api/health`
Check API health status.

#### GET `/api/`
Get API information.

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Login** to receive access and refresh tokens
2. **Include token** in Authorization header: `Bearer <token>`
3. **Refresh token** when expired using refresh endpoint
4. **Access protected routes** with valid tokens

## 🗄️ Database Schema

### User Model
```typescript
{
  email?: string;              // Optional, unique
  mobile?: string;             // Optional, unique
  password: string;            // Hashed
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  role: 'user' | 'admin';
  loginAttempts: number;
  lockUntil?: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Access and refresh tokens
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Comprehensive validation with express-validator
- **CORS**: Configured for frontend integration
- **Helmet**: Security headers
- **Account Locking**: After 5 failed login attempts

## 🧪 Testing

```bash
# Run tests (when implemented)
yarn test

# Run tests with coverage
yarn test:coverage
```

## 📚 API Documentation

API documentation is available at `/api/docs` (when implemented with Swagger/OpenAPI).

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/amandevship_auth |
| `JWT_SECRET` | JWT signing secret | fallback_secret |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `JWT_REFRESH_SECRET` | Refresh token secret | fallback_refresh_secret |
| `JWT_REFRESH_EXPIRE` | Refresh token expiration | 30d |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:3000 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## 🚀 Deployment

1. **Build the project:**
   ```bash
   yarn build
   ```

2. **Set environment variables** for production

3. **Start the server:**
   ```bash
   yarn start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, please contact the development team or create an issue in the repository.
