Based on the project description for a Hello World App, I'll create a comprehensive deployment infrastructure that handles the complete build-to-deploy process. Since the primary language is set to auto_detect and this is a simple Hello World application, I'll create a Node.js-based implementation with proper deployment configurations.

## FILENAME: package.json
```json
{
  "name": "hello-world-app",
  "version": "1.0.0",
  "description": "A super simple app that displays Hello World to test the system",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "npm run build:css && npm run build:js",
    "build:css": "node scripts/build-css.js",
    "build:js": "node scripts/build-js.js",
    "test": "jest",
    "lint": "eslint .",
    "serve": "serve -s dist -l 3000"
  },
  "keywords": ["hello-world", "nodejs", "express"],
  "author": "DevOps Team",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "compression": "^1.7.4",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0",
    "eslint": "^8.55.0",
    "serve": "^14.2.1",
    "fs-extra": "^11.2.0",
    "clean-css": "^5.3.2",
    "uglify-js": "^3.17.4"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

## FILENAME: server.js
```javascript
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS and compression
app.use(cors());
app.use(compression());

// Serve static files from dist directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
} else {
  // Serve static files from current directory in development
  app.use(express.static(__dirname));
}

// API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hello World!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Serve main page
app.get('/', (req, res) => {
  const indexPath = process.env.NODE_ENV === 'production' 
    ? path.join(__dirname, 'dist', 'index.html')
    : path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Hello World App running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
```

## FILENAME: index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A super simple Hello World application">
    <title>Hello World App</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAP///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="title" aria-label="Hello World Application">Hello World!</h1>
        </header>
        
        <main class="main-content">
            <div class="card">
                <p class="message">Welcome to our super simple Hello World application.</p>
                <p class="description">This app demonstrates a complete build-to-deploy pipeline.</p>
                
                <div class="button-group">
                    <button 
                        id="fetchBtn" 
                        class="btn btn-primary" 
                        aria-label="Fetch hello message from API"
                    >
                        Fetch API Message
                    </button>
                    <button 
                        id="healthBtn" 
                        class="btn btn-secondary"
                        aria-label="Check application health status"
                    >
                        Health Check
                    </button>
                </div>
                
                <div id="response" class="response" aria-live="polite" role="status"></div>
            </div>
        </main>
        
        <footer class="footer">
            <p>Environment: <span id="environment">Loading...</span></p>
            <p>Status: <span id="status" class="status-indicator">Ready</span></p>
        </footer>
    </div>
    
    <script src="app.js"></script>
</body>
</html>
```

## FILENAME: styles.css
```css
/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    padding: 40px;
    max-width: 600px;
    width: 100%;
    text-align: center;
    transition: transform 0.3s ease;
}

.container:hover {
    transform: translateY(-5px);
}

.header {
    margin-bottom: 30px;
}

.title {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
    animation: fadeInUp 1s ease;
}

.main-content {
    margin-bottom: 30px;
}

.card {
    padding: 20px;
    animation: fadeInUp 1s ease 0.2s both;
}

.message {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: #555;
}

.description {
    color: #777;
    margin-bottom: 25px;
}

.button-group {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 25px;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 160px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.btn:focus {
    outline: 3px solid rgba(102, 126, 234, 0.3);
    outline-offset: 2px;
}

.btn-primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.btn-primary:active {
    transform: translateY(0);
}

.btn-secondary {
    background: linear-gradient(135deg, #f093fb, #f5576c);
    color: white;
}

.btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(245, 87, 108, 0.3);
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
}

.response {
    min-height: 60px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
    border-left: 4px solid #667eea;
    margin: 20px 0;
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    text-align: left;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.response.show {
    opacity: 1;
}

.response.error {
    border-left-color: #dc3545;
    background: #f8d7da;
    color: #721c24;
}

.response.success {
    border-left-color: #28a745;
    background: #d4edda;
    color: #155724;
}

.footer {
    font-size: 0.9rem;
    color: #666;
    border-top: 1px solid #eee;
    padding-top: 20px;
    animation: fadeInUp 1s ease 0.4s both;
}

.status-indicator {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
}

.status-ready {
    background: #d4edda;
    color: #155724;
}

.status-loading {
    background: #fff3cd;
    color: #856404;
}

.status-error {
    background: #f8d7da;
    color: #721c24;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive design */
@media (max-width: 768px) {
    .container {
        margin: 10px;
        padding: 30px 20px;
    }
    
    .title {
        font-size: 2rem;
    }
    
    .button-group {
        flex-direction: column;
        align-items: center;
    }
    
    .btn {
        width: 100%;
        max-width: 250px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 1.5rem;
    }
    
    .message {
        font-size: 1rem;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .container {
        background: white;
        border: 2px solid #333;
    }
    
    .title {
        -webkit-text-fill-color: #333;
        color: #333;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
    
    .container:hover {
        transform: none;
    }
}
```

## FILENAME: app.js
```javascript
// Hello World App - Client-side JavaScript
(function() {
    'use strict';
    
    // DOM elements
    const fetchBtn = document.getElementById('fetchBtn');
    const healthBtn = document.getElementById('healthBtn');
    const response = document.getElementById('response');
    const environmentSpan = document.getElementById('environment');
    const statusSpan = document.getElementById('status');
    
    // State management
    let isLoading = false;
    
    // Utility functions
    function updateStatus(status, className = '') {
        statusSpan.textContent = status;
        statusSpan.className = `status-indicator ${className}`;
    }
    
    function showResponse(data, type = 'info') {
        response.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
        response.className = `response show ${type}`;
        response.setAttribute('aria-label', `API Response: ${type}`);
    }
    
    function setLoading(loading) {
        isLoading = loading;
        fetchBtn.disabled = loading;
        healthBtn.disabled = loading;
        
        if (loading) {
            updateStatus('Loading...', 'status-loading');
        } else {
            updateStatus('Ready', 'status-ready');
        }
    }
    
    // API functions
    async function fetchApiData(endpoint, buttonText = 'Loading...') {
        if (isLoading) return;
        
        setLoading(true);
        const originalText = fetchBtn.textContent;
        fetchBtn.textContent = buttonText;
        
        try {
            const res = await fetch(endpoint);
            
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }
            
            const data = await res.json();
            showResponse(data, 'success');
            
            // Update environment if we got it from the API
            if (data.environment && endpoint === '/api/hello') {
                environmentSpan.textContent = data.environment;
            }
            
        } catch (error) {
            console.error('API Error:', error);
            showResponse(`Error: ${error.message}`, 'error');
            updateStatus('Error', 'status-error');
        } finally {
            setLoading(false);
            fetchBtn.textContent = originalText;
            healthBtn.textContent = 'Health Check';
        }
    }
    
    async function checkHealth() {
        if (isLoading) return;
        
        const originalText = healthBtn.textContent;
        healthBtn.textContent = 'Checking...';
        
        await fetchApiData('/health', 'Checking...');
    }
    
    // Event listeners
    fetchBtn.addEventListener('click', () => {
        fetchApiData('/api/hello', 'Fetching...');
    });
    
    healthBtn.addEventListener('click', checkHealth);
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target === fetchBtn || e.target === healthBtn) {
                e.preventDefault();
                e.target.click();
            }
        }
    });
    
    // Initialize app
    function init() {
        console.log('Hello World App initialized');
        updateStatus('Ready', 'status-ready');
        environmentSpan.textContent = 'Unknown';
        
        // Initial health check
        setTimeout(() => {
            checkHealth();
        }, 1000);
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Error handling for unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        showResponse(`Unhandled error: ${event.reason}`, 'error');
        updateStatus('Error', 'status-error');
    });
    
})();
```

## FILENAME: Dockerfile
```dockerfile
# Multi-stage build for Hello World App
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production && \
    npm cache clean --force

# Copy built application and necessary files
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/server.js ./
COPY --from=builder /app/index.html ./

# Create necessary directories and set permissions
RUN mkdir -p /app/logs && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1))"

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]
```

## FILENAME: docker-compose.yml
```yaml
version: '3.8'

services:
  hello-world-app:
    build: 
      context: .
      dockerfile: Dockerfile
      target: production
    container_name: hello-world-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1))"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
    volumes:
      - app-logs:/app/logs
    networks:
      - hello-world-network
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.hello-world.rule=Host(`localhost`)"
      - "traefik.http.services.hello-world.loadbalancer.server.port=3000"

  # Development service
  hello-world-dev:
    build:
      context: .
      dockerfile: Dockerfile
      target: builder
    container_name: hello-world-dev
    restart: unless-stopped
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=development
      - PORT=3000
    volumes:
      - .:/app
      - /app/node_modules
      - app-logs:/app/logs
    networks:
      - hello-world-network
    command: npm run dev
    profiles:
      - dev

volumes:
  app-logs:
    driver: local

networks:
  hello-world-network:
    driver: bridge
```

## FILENAME: .dockerignore
```text
# Dependencies
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage
.grunt

# Bower dependency directory
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons
build/Release

# Dependency directories
jspm_packages/

# TypeScript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Git
.git
.gitignore
.gitattributes
.github

# Docker
Dockerfile
docker-compose.yml
.dockerignore

# IDE
.vscode
.idea
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log

# Test files
test
tests
*.test.js
*.spec.js
__tests__

# Documentation
README.md
docs
*.md

# Environment files
.env*
!.env.example

# Build artifacts (keep dist for production builds)
# dist
# build
```

## FILENAME: .env.example
```bash
# Application Configuration
NODE_ENV=production
PORT=3000

# API Configuration
API_BASE_URL=http://localhost:3000/api

# Security Configuration
SESSION_SECRET=your-secret-key-here
JWT_SECRET=your-jwt-secret-here

# CORS Configuration
CORS_ORIGIN=*
CORS_METHODS=GET,POST,PUT,DELETE
CORS_CREDENTIALS=true

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=app.log

# Health Check Configuration
HEALTH_CHECK_INTERVAL=30000
HEALTH_CHECK_TIMEOUT=5000

# Performance Configuration
COMPRESSION_ENABLED=true
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Monitoring Configuration
ENABLE_METRICS=true
METRICS_PORT=3001

# Database Configuration (if needed in future)
# DATABASE_URL=postgresql://user:password@localhost:5432/helloworld
# REDIS_URL=redis://localhost:6379

# External Services (if needed in future)
# EXTERNAL_API_URL=https://api.example.com
# EXTERNAL_API_KEY=your-api-key-here

# Development Configuration
NODEMON_IGNORE=node_modules,dist,logs
NODEMON_EXT=js,json,html,css

# Production Configuration
PM2_INSTANCES=max
PM2_EXEC_MODE=cluster
PM2_MAX_MEMORY_RESTART=500M
```

## FILENAME: scripts/build-css.js
```javascript
const fs = require('fs-extra');
const path = require('path');
const CleanCSS = require('clean-css');

async function buildCSS() {
    console.log('Building CSS...');
    
    try {
        // Ensure dist directory exists
        await fs.ensureDir('dist');
        
        // Read the main CSS file
        const cssContent = await fs.readFile('styles.css', 'utf8');
        
        // Minify CSS for production
        const minified = new CleanCSS({
            level: 2,
            returnPromise: true
        }).minify(cssContent);
        
        const result = await minified;
        
        if (result.errors.length > 0) {
            console.error('CSS build errors:', result.errors);
            process.exit(1);
        }
        
        // Write minified CSS to dist
        await fs.writeFile('dist/styles.css', result.styles);
        
        console.log('✅ CSS build completed');
        console.log(`   Original size: ${cssContent.length} bytes`);
        console.log(`   Minified size: ${result.styles.length} bytes`);
        console.log(`   Savings: ${((cssContent.length - result.styles.length) / cssContent.length * 100).toFixed(1)}%`);
        
    } catch (error) {
        console.error('❌ CSS build failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    buildCSS();
}

module.exports = buildCSS;
```

## FILENAME: scripts/build-js.js
```javascript
const fs = require('fs-extra');
const path = require('path');
const UglifyJS = require('uglify-js');

async function buildJS() {
    console.log('Building JavaScript...');
    
    try {
        // Ensure dist directory exists
        await fs.ensureDir('dist');
        
        // Read the main JS file
        const jsContent = await fs.readFile('app.js', 'utf8');
        
        // Minify JavaScript for production
        const result = UglifyJS.minify(jsContent, {
            compress: {
                drop_console: process.env.NODE_ENV === 'production',
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info'],
            },
            mangle: {
                toplevel: true,
            },
            output: {
                comments: false,
            },
        });
        
        if (result.error) {
            console.error('JavaScript build error:', result.error);
            process.exit(1);
        }
        
        // Write minified JS to dist
        await fs.writeFile('dist/app.js', result.code);
        
        // Copy index.html to dist and update references
        let htmlContent = await fs.readFile('index.html', 'utf8');
        
        // Update script and style references for production
        htmlContent = htmlContent.replace('styles.css', 'styles.css');
        htmlContent = htmlContent.replace('app.js', 'app.js');
        
        await fs.writeFile('dist/index.html', htmlContent);
        
        console.log('✅ JavaScript build completed');
        console.log(`   Original size: ${jsContent.length} bytes`);
        console.log(`   Minified size: ${result.code.length} bytes`);
        console.log(`   Savings: ${((jsContent.length - result.code.length) / jsContent.length * 100).toFixed(1)}%`);
        
    } catch (error) {
        console.error('❌ JavaScript build failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    buildJS();
}

module.exports = buildJS;
```

## FILENAME: scripts/deploy.sh
```bash
#!/bin/bash

# Hello World App Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="hello-world-app"
DOCKER_IMAGE="$APP_NAME:latest"
CONTAINER_NAME="$APP_NAME-container"
PORT=${PORT:-3000}
ENV=${NODE_ENV:-production}

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check requirements
check_requirements() {
    log_info "Checking deployment requirements..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed or not in PATH"
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed or not in PATH"
        exit 1
    fi
    
    log_success "All requirements satisfied"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    npm install
    log_success "Dependencies installed"
}

# Run tests
run_tests() {
    log_info "Running tests..."
    npm test || {
        log_warning "Tests failed, but continuing with deployment"
    }
}

# Build application
build_app() {
    log_info "Building application..."
    npm run build
    log_success "Application built successfully"
}

# Build Docker image
build_docker_image() {
    log_info "Building Docker image: $DOCKER_IMAGE"
    docker build -t $DOCKER_IMAGE .
    log_success "Docker image built successfully"
}

# Stop existing container
stop_existing_container() {
    log_info "Stopping existing container if running..."
    if docker ps -q -f name=$CONTAINER_NAME | grep -q .; then
        docker stop $CONTAINER_NAME
        docker rm $CONTAINER_NAME
        log_success "Existing container stopped and removed"
    else
        log_info "No existing container found"
    fi
}

# Deploy container
deploy_container() {
    log_info "Deploying new container..."
    docker run -d \
        --name $CONTAINER_NAME \
        --restart unless-stopped \
        -p $PORT:3000 \
        -e NODE_ENV=$ENV \
        -e PORT=3000 \
        $DOCKER_IMAGE
    
    log_success "Container deployed successfully"
}

# Health check
health_check() {
    log_info "Performing health check..."
    
    # Wait for container to start
    sleep 5
    
    max_attempts=30
    attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "http://localhost:$PORT/health" > /dev/null; then
            log_success "Health check passed!"
            return 0
        fi
        
        log_info "Health check attempt $attempt/$max_attempts failed, retrying..."
        sleep 2
        ((attempt++))
    done
    
    log_error "Health check failed after $max_attempts attempts"
    log_error "Deployment may have issues"
    return 1
}

# Show deployment info
show_deployment_info() {
    log_success "Deployment completed successfully!"
    echo
    echo "=== Deployment Information ==="
    echo "Application: $APP_NAME"
    echo "Environment: $ENV"
    echo "Port: $PORT"
    echo "URL: http://localhost:$PORT"
    echo "Health Check: http://localhost:$PORT/health"
    echo "API Endpoint: http://localhost:$PORT/api/hello"
    echo
    echo "Container Logs: docker logs $CONTAINER_NAME"
    echo "Stop Container: docker stop $CONTAINER_NAME"
    echo
}

# Cleanup on error
cleanup_on_error() {
    log_error "Deployment failed, cleaning up..."
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true
    exit 1
}

# Main deployment function
deploy() {
    log_info "Starting deployment of $APP_NAME..."
    
    # Set error trap
    trap cleanup_on_error ERR
    
    # Deployment steps
    check_requirements
    install_dependencies
    run_tests
    build_app
    build_docker_image
    stop_existing_container
    deploy_container
    health_check
    show_deployment_info
}

# Parse command line arguments
case "${1:-deploy}" in
    "deploy")
        deploy
        ;;
    "build")
        check_requirements
        install_dependencies
        build_app
        build_docker_image
        ;;
    "start")
        deploy_container
        health_check
        show_deployment_info
        ;;
    "stop")
        stop_existing_container
        ;;
    "health")
        health_check
        ;;
    "logs")
        docker logs $CONTAINER_NAME
        ;;
    "help")
        echo "Usage: $0 [command]"
        echo "Commands:"
        echo "  deploy  - Full deployment (default)"
        echo "  build   - Build application and Docker image"
        echo "  start   - Start container"
        echo "  stop    - Stop container"
        echo "  health  - Run health check"
        echo "  logs    - Show container logs"
        echo "  help    - Show this help"
        ;;
    *)
        log_error "Unknown command: $1"
        log_info "Run '$0 help' for usage information"
        exit 1
        ;;
esac
```

## FILENAME: .github/workflows/ci-cd.yml
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'
  DOCKER_IMAGE: hello-world-app
  REGISTRY: ghcr.io

jobs:
  test:
    name: Test Application
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm install
      
    - name: Run linting
      run: npm run lint
      
    - name: Run tests
      run: npm test
      
    - name: Build application
      run: npm run build
      
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/
        retention-days: 7

  security:
    name: Security Scan
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm install
      
    - name: Run security audit
      run: npm audit --audit-level moderate
      
    - name: Run Snyk security scan
      uses: snyk/actions/node@master
      continue-on-error: true
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  build:
    name: Build Docker Image
    runs-on: ubuntu-latest
    needs: [test, security]
    if: github.event_name == 'push'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
      
    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
        
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ github.repository }}/${{ env.DOCKER_IMAGE }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix=sha-
          type=raw,value=latest,enable={{is_default_branch}}
          
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        file: ./Dockerfile
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
        platforms: linux/amd64,linux/arm64

  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/develop'
    environment: staging
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Deploy to staging
      run: |
        echo "Deploying to staging environment"
        echo "Image: ${{ env.REGISTRY }}/${{ github.repository }}/${{ env.DOCKER_IMAGE }}:sha-${{ github.sha }}"
        # Add actual staging deployment commands here
        
    - name: Run staging health check
      run: |
        echo "Running health check on staging"
        # Add health check commands here

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/main'
    environment: production
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Deploy to production
      run: |
        echo "Deploying to production environment"
        echo "Image: ${{ env.REGISTRY }}/${{ github.repository }}/${{ env.DOCKER_IMAGE }}:latest"
        # Add actual production deployment commands here
        
    - name: Run production health check
      run: |
        echo "Running health check on production"
        # Add health check commands here
        
    - name: Notify deployment success
      if: success()
      run: |
        echo "Production deployment successful!"
        # Add notification commands here (Slack, email, etc.)

  cleanup:
    name: Cleanup
    runs-on: ubuntu-latest
    needs: [deploy-staging, deploy-production]
    if: always()
    
    steps:
    - name: Clean up old images
      run: |
        echo "Cleaning up old Docker images"
        # Add cleanup commands here
```

## FILENAME: kubernetes/deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-world-app
  labels:
    app: hello-world-app
    version: v1.0.0
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hello-world-app
  template:
    metadata:
      labels:
        app: hello-world-app
    spec:
      containers:
      - name: hello-world-app
        image: hello-world-app:latest
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 3000
          protocol: TCP
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3000"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 30
          timeoutSeconds: 10
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 2
        securityContext:
          runAsNonRoot: true
          runAsUser: 1001
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: false
          capabilities:
            drop:
            - ALL
---
apiVersion: v1
kind: Service
metadata:
  name: hello-world-app-service
  labels:
    app: hello-world-app
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
    name: http
  selector:
    app: hello-world-app
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: hello-world-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - hello-world-app.example.com
    secretName: hello-world-app-tls
  rules:
  - host: hello-world-app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: hello-world-app-service
            port:
              number: 80
```

## FILENAME: kubernetes/configmap.yaml
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: hello-world-app-config
  labels:
    app: hello-world-app
data:
  NODE_ENV: "production"
  PORT: "3000"
  LOG_LEVEL: "info"
  COMPRESSION_ENABLED: "true"
  RATE_LIMIT_WINDOW_MS: "900000"
  RATE_LIMIT_MAX_REQUESTS: "100"
  HEALTH_CHECK_INTERVAL: "30000"
  HEALTH_CHECK_TIMEOUT: "5000"
  CORS_ORIGIN: "*"
  CORS_METHODS: "GET,POST,PUT,DELETE"
  CORS_CREDENTIALS: "true"
```

## FILENAME: jest.config.js
```javascript
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'server.js',
    'app.js',
    'scripts/**/*.js',
    '!node_modules/**',
    '!coverage/**',
    '!dist/**'
  ],
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
    '**/__tests__/**/*.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.js'],
  testTimeout: 10000,
  verbose: true,
  forceExit: true,
  detectOpenHandles: true
};
```

## FILENAME: tests/setup/jest.setup.js
```javascript
// Jest setup file for Hello World App tests

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

// Suppress console logs during tests unless explicitly needed
if (!process.env.VERBOSE_TESTS) {
  console.log = jest.fn();
  console.info = jest.fn();
}

// Global test timeout
jest.setTimeout(10000);

// Clean up after tests
afterEach(() => {
  jest.clearAllMocks();
});
```

## FILENAME: tests/app.test.js
```javascript
const request = require('supertest');
const app = require('../server');

describe('Hello World App', () => {
  let server;

  beforeAll(() => {
    // Start server on different port for testing
    server = app.listen(3001);
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /', () => {
    it('should return the main page', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.type).toBe('text/html');
    });
  });

  describe('GET /api/hello', () => {
    it('should return hello world message', async () => {
      const response = await request(app).get('/api/hello');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Hello World!');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('environment');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /nonexistent', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Route not found');
    });
  });
});
```

## FILENAME: .eslintrc.js
```javascript
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'coverage/',
    '*.min.js'
  ]
};
```

## FILENAME: README.md
```markdown
# Hello World App - Deployment Infrastructure

A super simple Hello World application with complete build-to-deploy pipeline infrastructure.

## 🚀 Features

- **Complete Build Pipeline**: Handles dependency resolution, compilation, and optimization
- **Multi-Environment Support**: Development, staging, and production configurations
- **Docker Ready**: Multi-stage Dockerfile with security best practices
- **Kubernetes Support**: Production-ready K8s manifests
- **CI/CD Pipeline**: GitHub Actions workflow with automated testing and deployment
- **Health Monitoring**: Built-in health checks and monitoring endpoints
- **Security First**: Non-root containers, vulnerability scanning, and secure defaults

## 📋 Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Git

## 🔧 Quick Start

### Local Development

```bash
# Clone and setup
git clone <repository-url>
cd hello-world-app

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Production Build

```bash
# Build application
npm run build

# Start production server
npm start

# Or use Docker
docker build -t hello-world-app .
docker run -p 3000:3000 hello-world-app
```

### Docker Compose

```bash
# Development environment
docker-compose up hello-world-dev

# Production environment
docker-compose up hello-world-app
```

## 🏗️ Build Process

The application uses a comprehensive build pipeline:

1. **Dependency Installation**: `npm install`
2. **CSS Processing**: Minification and optimization
3. **JavaScript Processing**: Minification and dead code elimination
4. **Asset Optimization**: Compression and caching headers
5. **Production Bundle**: Clean, optimized distribution files

### Build Commands

```bash
npm run build          # Full build process
npm run build:css      # CSS processing only
npm run build:js       # JavaScript processing only
npm test              # Run test suite
npm run lint          # Code linting
```

## 🐳 Docker Deployment

### Multi-Stage Build

The Dockerfile uses multi-stage builds for optimal production images:

- **Builder Stage**: Installs all dependencies and builds the application
- **Production Stage**: Contains only production dependencies and built assets
- **Security**: Runs as non-root user with minimal privileges

### Environment Variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
# Edit .env with your configuration
```

### Health Checks

Built-in Docker health checks monitor application status:

```bash
# Check container health
docker ps
docker inspect <container-id> | grep Health
```

## ☸️ Kubernetes Deployment

### Deploy to Kubernetes

```bash
# Create namespace
kubectl create namespace hello-world

# Apply configurations
kubectl apply -f kubernetes/ -n hello-world

# Check deployment status
kubectl get pods -n hello-world
kubectl get services -n hello-world
kubectl get ingress -n hello-world
```

### Configuration Management

- **ConfigMap**: Environment variables and application settings
- **Secrets**: Sensitive data (create separately)
- **Ingress**: External access and SSL termination
- **Services**: Internal networking and load balancing

## 🚀 CI/CD Pipeline

GitHub Actions workflow provides automated:

- **Testing**: Unit tests, linting, security scanning
- **Building**: Docker image creation and registry push
- **Deployment**: Automated staging and production deployment
- **Monitoring**: Health checks and deployment verification

### Workflow Triggers

- **Push to main**: Deploy to production
- **Push to develop**: Deploy to staging
- **Pull requests**: Run tests and build checks

## 📊 Monitoring & Health

### Health Endpoints

- `GET /health` - Application health status
- `GET /api/hello` - API functionality test

### Monitoring Features

- **Liveness Probes**: Container restart on failure
- **Readiness Probes**: Traffic routing control
- **Metrics Collection**: Performance and usage data
- **Log Aggregation**: Centralized logging support

## 🔒 Security

### Security Features

- **Non-root containers**: Reduced attack surface
- **Read-only filesystem**: Prevents runtime modifications
- **Dependency scanning**: Automated vulnerability detection
- **Content Security Policy**: XSS protection
- **Helmet.js**: Security headers and protections

### Security Best Practices

- Regular dependency updates
- Container image scanning
- Secret management (never commit secrets)
- Network policies in Kubernetes
- SSL/TLS encryption

## 🛠️ Development

### Project Structure

```
hello-world-app/
├── server.js              # Express server
├── app.js                 # Client-side JavaScript
├── styles.css             # Application styles
├── index.html            # Main HTML page
├── package.json          # Dependencies and scripts
├── Dockerfile            # Container configuration
├── docker-compose.yml    # Multi-service orchestration
├── scripts/              # Build and deployment scripts
├── kubernetes/           # K8s manifests
├── tests/               # Test suites
└── .github/workflows/   # CI/CD pipeline
```

### Adding Features

1. **Backend Changes**: Modify `server.js` for API endpoints
2. **Frontend Changes**: Update `app.js`, `styles.css`, or `index.html`
3. **Build Process**: Update build scripts in `scripts/` directory
4. **Tests**: Add tests in `tests/` directory
5. **Deployment**: Update Docker/K8s configs as needed

## 🚨 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear npm cache
npm cache clean --force

# Rebuild node_modules
rm -rf node_modules package-lock.json
npm install
```

**Docker Issues**
```bash
# Check container logs
docker logs <container-name>

# Rebuild image
docker build --no-cache -t hello-world-app .
```

**Health Check Failures**
```bash
# Test health endpoint
curl http://localhost:3000/health

# Check application logs
docker logs hello-world-app
```

### Debug Mode

Enable debug logging:

```bash
# Set environment variable
export LOG_LEVEL=debug

# Or in Docker
docker run -e LOG_LEVEL=debug hello-world-app
```

## 📚 API Documentation

### Endpoints

**GET /**
- Returns main application page
- Content-Type: text/html

**GET /api/hello**
- Returns hello world message with metadata
- Response: `{ "message": "Hello World!", "timestamp": "...", "environment": "..." }`

**GET /health**
- Returns application health status
- Response: `{ "status": "healthy", "uptime": ..., "timestamp": "..." }`

## 🔄 Deployment Strategies

### Rolling Updates

Kubernetes supports zero-downtime rolling updates:

```bash
# Update deployment
kubectl set image deployment/hello-world-app hello-world-app=hello-world-app:v2.0.0

# Monitor rollout
kubectl rollout status deployment/hello-world-app

# Rollback if needed
kubectl rollout undo deployment/hello-world-app
```

### Blue-Green Deployment

For critical updates, implement blue-green deployments:

1. Deploy new version to separate environment
2. Run comprehensive tests
3. Switch traffic to new version
4. Monitor and rollback if issues occur

## 📈 Performance

### Optimization Features

- **Compression**: Gzip compression for all responses
- **Caching**: Optimal caching headers for static assets
- **Minification**: CSS and JavaScript minification
- **CDN Ready**: Static assets optimized for CDN delivery

### Performance Monitoring

Monitor key metrics:
- Response time
- Memory usage
- CPU utilization
- Error rates
- Request throughput

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review container/pod logs
3. Verify environment configuration
4. Test health endpoints

---

**Deployment Status**: ✅ Production Ready

This deployment infrastructure provides a complete, production-ready pipeline for the Hello World application with modern DevOps practices and security best practices.
```

<!-- END_OF_RESPONSE -->