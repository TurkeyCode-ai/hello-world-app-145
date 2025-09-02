I'll create a Hello World web application backend using **Node.js with Express.js** - a popular, lightweight, and well-established combination for web APIs.

## FILENAME: package.json
```json
{
  "name": "hello-world-backend",
  "version": "1.0.0",
  "description": "Hello World Web Application Backend",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["hello-world", "express", "api"],
  "author": "Backend Developer",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0"
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
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root endpoint - Welcome message
app.get('/', (req, res) => {
  try {
    res.status(200).json({
      message: 'Welcome to Hello World API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        root: '/',
        hello: '/hello',
        health: '/health'
      }
    });
  } catch (error) {
    console.error('Error in root endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong'
    });
  }
});

// Hello World endpoint
app.get('/hello', (req, res) => {
  try {
    const name = req.query.name || 'World';
    res.status(200).json({
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString(),
      greeting: 'Welcome to our Hello World application'
    });
  } catch (error) {
    console.error('Error in hello endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate greeting'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  try {
    res.status(200).json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100
      },
      version: '1.0.0'
    });
  } catch (error) {
    console.error('Error in health endpoint:', error);
    res.status(503).json({
      status: 'unhealthy',
      error: 'Health check failed'
    });
  }
});

// 404 handler for undefined routes
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.method} ${req.path} does not exist`,
    availableEndpoints: ['/', '/hello', '/health']
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on our end'
  });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Hello World API server is running on port ${PORT}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`👋 Hello endpoint: http://localhost:${PORT}/hello`);
});

module.exports = app;
```

## FILENAME: .env.example
```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3001

# Logging
LOG_LEVEL=info
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

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~
```

## FILENAME: README.md
```markdown
# Hello World Backend API

A simple Hello World web application backend built with Node.js and Express.js.

## Features

- RESTful API endpoints
- CORS support for frontend integration
- Security middleware (Helmet)
- Request logging
- Error handling and validation
- Health monitoring
- Graceful shutdown handling

## API Endpoints

### GET /
Returns welcome message and API information.

**Response:**
```json
{
  "message": "Welcome to Hello World API",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "endpoints": {
    "root": "/",
    "hello": "/hello",
    "health": "/health"
  }
}
```

### GET /hello
Returns a personalized greeting message.

**Query Parameters:**
- `name` (optional): Name to include in greeting (defaults to "World")

**Example:** `/hello?name=John`

**Response:**
```json
{
  "message": "Hello, John!",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "greeting": "Welcome to our Hello World application"
}
```

### GET /health
Returns server health status and metrics.

**Response:**
```json
{
  "status": "healthy",
  "uptime": 123.45,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "memory": {
    "used": 25.67,
    "total": 50.00
  },
  "version": "1.0.0"
}
```

## Setup and Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Start the production server:**
   ```bash
   npm start
   ```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `FRONTEND_URL`: Frontend URL for CORS configuration

## Development

The server includes:
- **Hot reload** with nodemon in development mode
- **Security headers** via Helmet
- **Request logging** via Morgan
- **CORS support** for frontend integration
- **Error handling** with proper HTTP status codes
- **Input validation** and sanitization

## Testing

Test the API endpoints:

```bash
# Test root endpoint
curl http://localhost:3000/

# Test hello endpoint
curl http://localhost:3000/hello

# Test hello with name parameter
curl http://localhost:3000/hello?name=YourName

# Test health endpoint
curl http://localhost:3000/health
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure appropriate `FRONTEND_URL`
3. Use a process manager like PM2 for production deployment
4. Set up proper logging and monitoring

## Architecture

- **Express.js** for web framework
- **Helmet** for security headers
- **CORS** for cross-origin resource sharing
- **Morgan** for HTTP request logging
- **Graceful shutdown** handling for production deployment
```

<!-- END_OF_RESPONSE -->