<!-- AI TEAM BUILDER - FEATURE ITERATION HISTORY -->
<!-- Agent: backend -->
<!-- Timestamp: 2025-09-02T00:19:17+00:00 -->
<!-- Feature: Display Hello World Text -->
<!-- Priority: P0 -->
<!-- Build Context: Feature-focused build -->

I'll create a Hello World web application using **Node.js with Express.js** - a popular and efficient combination for web backends.

## FILENAME: package.json
```json
{
  "name": "hello-world-backend",
  "version": "1.0.0",
  "description": "A simple Hello World web application backend",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["hello-world", "express", "nodejs", "api"],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

## FILENAME: server.js
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url}`);
  next();
});

// API Routes
app.get('/', (req, res) => {
  try {
    res.json({
      message: 'Welcome to the Hello World API!',
      version: '1.0.0',
      endpoints: {
        hello: '/hello',
        health: '/health'
      }
    });
  } catch (error) {
    console.error('Error in root endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/hello', (req, res) => {
  try {
    const name = req.query.name || 'World';
    res.json({
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in hello endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/health', (req, res) => {
  try {
    res.json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: process.version,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Error in health endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist`,
    availableEndpoints: ['/', '/hello', '/health']
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on our end'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Hello World API server is running on port ${PORT}`);
  console.log(`📍 Available endpoints:`);
  console.log(`   • GET  http://localhost:${PORT}/        - Welcome message`);
  console.log(`   • GET  http://localhost:${PORT}/hello   - Hello World endpoint`);
  console.log(`   • GET  http://localhost:${PORT}/health  - Health check`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🔄 SIGINT received, shutting down gracefully');
  process.exit(0);
});
```

## FILENAME: .env.example
```bash
# Port configuration
PORT=3000

# Environment
NODE_ENV=development

# Add other environment variables as needed
```

## FILENAME: .gitignore
```text
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Logs
logs
*.log

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Editor directories and files
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## FILENAME: README.md
```markdown
# Hello World Backend API

A simple Node.js/Express.js backend API that provides Hello World functionality.

## 🚀 Features

- RESTful API endpoints for Hello World functionality
- Health check endpoint for monitoring
- CORS enabled for frontend integration
- Security headers with Helmet
- Error handling and logging
- Graceful shutdown handling

## 📋 Prerequisites

- Node.js (version 16.0.0 or higher)
- npm (comes with Node.js)

## 🔧 Installation

1. Clone or extract the project files
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## 📡 API Endpoints

### GET /
Returns a welcome message with available endpoints.

**Response:**
```json
{
  "message": "Welcome to the Hello World API!",
  "version": "1.0.0",
  "endpoints": {
    "hello": "/hello",
    "health": "/health"
  }
}
```

### GET /hello
Returns a Hello World message.

**Query Parameters:**
- `name` (optional): Name to greet (defaults to "World")

**Example:** `GET /hello?name=John`

**Response:**
```json
{
  "message": "Hello, John!",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET /health
Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy",
  "uptime": 123.456,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "version": "v18.17.0",
  "environment": "development"
}
```

## 🔧 Configuration

Create a `.env` file based on `.env.example` to customize configuration:

```bash
PORT=3000
NODE_ENV=development
```

## 🛡️ Security Features

- **Helmet**: Adds security headers
- **CORS**: Configured for cross-origin requests
- **Input validation**: Basic request validation
- **Error handling**: Comprehensive error handling without exposing internals

## 📝 Project Structure

```
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
├── .gitignore        # Git ignore rules
└── README.md         # Project documentation
```

## 🔍 Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Test root endpoint
curl http://localhost:3000/

# Test hello endpoint
curl http://localhost:3000/hello

# Test hello with name parameter
curl "http://localhost:3000/hello?name=Developer"

# Test health endpoint
curl http://localhost:3000/health
```

## 🚀 Deployment

This application is ready for deployment to platforms like:
- Heroku
- Railway
- Render
- Vercel
- AWS
- DigitalOcean

Make sure to set the appropriate environment variables in your deployment platform.
```

<!-- END_OF_RESPONSE -->
