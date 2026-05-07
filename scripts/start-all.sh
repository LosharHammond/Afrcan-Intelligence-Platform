#!/bin/bash

# Nexara Platform Deployment Script
# This script starts all services required for the platform

set -e

echo "🚀 Starting Nexara Intelligence Platform..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check for pnpm
if ! command -v pnpm &> /dev/null; then
    echo "pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi

echo -e "${BLUE}Installing dependencies...${NC}"
pnpm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${BLUE}Creating .env file from template...${NC}"
    cp .env.example .env
fi

# Start individual services
start_service() {
    local service=$1
    local port=$2
    echo -e "${BLUE}Starting $service on port $port...${NC}"
    cd "$service" && pnpm start &
    sleep 2
}

# Start all services
cd /workspaces/Afrcan-Intelligence-Platform

start_service "services/api-gateway" 5000
start_service "services/market-service" 4002
start_service "services/intelligence-service" 4003
start_service "services/news-service" 4004
start_service "services/auth-service" 4005

echo -e "${GREEN}✅ All services started successfully!${NC}"
echo ""
echo "Services are running on:"
echo "  - API Gateway: http://localhost:5000"
echo "  - Market Service: http://localhost:4002"
echo "  - Intelligence Service: http://localhost:4003"
echo "  - News Service: http://localhost:4004"
echo "  - Auth Service: http://localhost:4005"
echo ""
echo "To start the frontend run:"
echo "  cd apps/web-client && pnpm dev"
echo ""
echo "Press Ctrl+C to stop all services"

wait