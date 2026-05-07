# Deployment Guide

## Prerequisites

- Node.js 18+
- pnpm
- Docker & Docker Compose (for containerized deployment)
- PostgreSQL 13+ (for production)

## Local Development Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Start Services
```bash
# Option 1: Using the start script
bash scripts/start-all.sh

# Option 2: Start each service manually
cd services/api-gateway && pnpm start
cd services/market-service && pnpm start
cd services/intelligence-service && pnpm start
cd services/news-service && pnpm start
cd services/auth-service && pnpm start
```

### 4. Start Frontend
```bash
cd apps/web-client && pnpm dev
```

## Docker Deployment

### Build & Run
```bash
cd infrastructure/docker
docker-compose up --build
```

### Accessing Services
- Web Client: http://localhost:3000
- API Gateway: http://localhost:5000
- Health Check: http://localhost:5000/health

## Production Deployment

### 1. Database Setup
```bash
# Create PostgreSQL database
createdb nexara_production

# Run migrations
pnpm run migrate:up
```

### 2. Environment Variables
Set all required production environment variables (see .env.example)

### 3. Build Frontend
```bash
cd apps/web-client
pnpm build
```

### 4. Start Services
```bash
NODE_ENV=production npm start
```

## Monitoring

- **Logs**: Check service logs in `/var/log/nexara/`
- **Health**: `/api/v1/health`
- **Metrics**: Prometheus endpoint at `/metrics` (coming soon)

## Troubleshooting

### Services won't start
- Check if ports 5000-5005 are available
- Verify Node.js version: `node --version`
- Check logs: `tail -f service.log`

### Database errors
- Ensure database is running
- Run migrations: `pnpm run migrate:up`
- Check database permissions

### API Gateway errors
- Verify all services are running
- Check service URLs in config
- Review gateway logs