# NEXARA Intelligence Platform

A real-time AI-powered operational intelligence platform for African markets. Enterprise-grade intelligence infrastructure for continental economic monitoring.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start all services:**
   ```bash
   # Terminal 1: API Gateway
   cd services/api-gateway && pnpm start

   # Terminal 2: Market Service
   cd services/market-service && pnpm start

   # Terminal 3: Intelligence Service
   cd services/intelligence-service && pnpm start

   # Terminal 4: News Service
   cd services/news-service && pnpm start

   # Terminal 5: Auth Service
   cd services/auth-service && pnpm start

   # Terminal 6: Daily Worker (optional)
   cd workers/schedulers && pnpm start
   ```

3. **Start web client:**
   ```bash
   cd apps/web-client && pnpm dev
   ```

4. **Start landing page:**
   ```bash
   cd apps/landing-page && python3 -m http.server 4173
   ```

### Docker Deployment

```bash
cd infrastructure/docker
docker-compose up --build
```

## 🏗️ Architecture

### Core Services
- **API Gateway** (Port 5000) - Unified entry point with authentication
- **Market Service** (Port 4002) - Forex, fuel, inflation data
- **Intelligence Service** (Port 4003) - AI analysis & anomaly detection
- **News Service** (Port 4004) - Country news aggregation
- **Auth Service** (Port 4005) - JWT authentication

### Data Pipeline
```
Workers → Market Service → Intelligence Service → API Gateway → Frontend
```

### Database
- SQLite for development (persistent storage)
- PostgreSQL ready for production scaling

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration

### Market Data
- `GET /api/v1/market/:country` - Current market data
- `GET /api/v1/market/historical/:country` - Historical trends

### Intelligence
- `GET /api/v1/intelligence/:country` - AI insights
- `GET /api/v1/intelligence/briefing/:country` - AI country briefing

### News
- `GET /api/v1/news/:country` - Country news

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_news_api_key
DATABASE_URL=postgresql://...
```

## 📊 Features

- ✅ Live forex data from ExchangeRate-API
- ✅ AI-powered country briefings (OpenAI integration)
- ✅ Anomaly detection with historical analysis
- ✅ Automated daily intelligence collection
- ✅ JWT authentication & authorization
- ✅ Historical data storage & trends
- ✅ Multi-country support (GH, NG, KE, ZA)
- ✅ Docker containerization
- ✅ Enterprise-grade code structure

## 🏢 Enterprise Features

- **Scalable microservices architecture**
- **Database persistence with migrations**
- **API rate limiting & validation**
- **Comprehensive error handling**
- **Production-ready Docker deployment**
- **Automated testing & CI/CD ready**

## 📈 Roadmap

- Real fuel price APIs integration
- NewsAPI for live news feeds
- PostgreSQL migration for production
- Redis caching layer
- Advanced analytics dashboard
- Mobile app development
- Enterprise subscription management
