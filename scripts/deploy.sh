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