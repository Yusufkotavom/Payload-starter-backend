# 🚀 PayloadCMS Backend Otomatis

Backend CMS headless otomatis dengan integrasi AI, RSS, dan plugin lengkap untuk Windows.

## ✨ Fitur Utama

- 🤖 **AI Integration**: OpenAI, Gemini, Claude, Ollama
- 📰 **RSS Automation**: Fetch konten otomatis dari RSS feeds
- 🖼️ **Image Services**: Unsplash, Pixabay, Pexels, AI Image Generation
- ⏱️ **Cron Jobs**: Bree.js untuk scheduling otomatis
- 🔧 **17 Plugin**: Enchants, Tools, SEO, Cloud Storage, dll
- 📊 **Monitoring**: Sentry, Winston logging
- 🎯 **SEO Ready**: Meta tags, sitemap, optimization
- 📱 **Responsive Admin**: Modern UI/UX

## 🛠️ Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| **CMS** | PayloadCMS 2.10+ |
| **Database** | MongoDB 6.0+ |
| **AI** | OpenAI, Gemini, Claude, Ollama |
| **Images** | Unsplash, Pixabay, Pexels, Replicate |
| **Scheduler** | Bree.js |
| **Language** | TypeScript |
| **OS** | Windows 10/11 |

## 🚀 Quick Start (Windows)

### Prerequisites

- ✅ Node.js 18+ ([Download](https://nodejs.org/))
- ✅ npm 8+ (included with Node.js)
- ✅ MongoDB ([Download](https://www.mongodb.com/try/download/community))
- ✅ Git ([Download](https://git-scm.com/))

### Installation

1. **Clone repository**
```bash
git clone https://github.com/yourusername/payloadcms-backend-otomatis.git
cd payloadcms-backend-otomatis
```

2. **Run setup script**
```bash
npm run setup
```

3. **Configure environment**
```bash
# Edit .env file with your settings
notepad .env
```

4. **Start development server**
```bash
npm run dev
```

5. **Access admin panel**
```
http://localhost:3000/admin
```

## 📦 Plugin Terintegrasi

### 🔧 Plugin Wajib
- `payload-enchants` - Import/export, duplikat, sorting
- `payload-tools` - CLI backup/export tools

### 🚀 Plugin Rekomendasi
- `payload-plugin-cloud-storage` - S3/GCS/Azure storage
- `payload-plugin-seo` - SEO optimization
- `payload-plugin-cloud` - Vercel/Netlify integration
- `payload-plugin-vercel` - Vercel deployment
- `payload-plugin-redis` - Redis caching
- `payload-plugin-sentry` - Error monitoring
- `payload-plugin-slug` - Auto slug generation
- `payload-plugin-richtext-slate` - Rich text editor
- `payload-plugin-email` - Email notifications
- `payload-plugin-webhooks` - Webhook integration

### 🎨 Plugin UI/UX
- `payload-plugin-color-picker` - Color picker
- `payload-plugin-relationship` - Enhanced relationships
- `payload-plugin-media-library` - Media management
- `payload-plugin-tabs` - Tabbed interfaces

### 🔧 Plugin Development
- `payload-plugin-debug` - Debug tools
- `payload-plugin-testing` - Testing utilities
- `payload-plugin-migrate` - Database migrations

## 🤖 AI Integration

### OpenAI
```typescript
import openaiService from './src/services/openaiService';

// Generate article
const result = await openaiService.generateArticle('AI Technology', {
  tone: 'professional',
  length: 'medium',
  language: 'English'
});
```

### Image Services
```typescript
import unsplashService from './src/services/unsplashService';

// Search images
const photos = await unsplashService.searchPhotos('technology', {
  perPage: 10,
  orientation: 'landscape'
});
```

## ⏱️ Cron Jobs

### RSS Fetcher
```typescript
// jobs/rssFetcher.ts
export default async function rssFetcher() {
  // Fetch RSS feeds and save to rawContents
}
```

### AI Content Generator
```typescript
// jobs/aiContentGenerator.ts
export default async function aiContentGenerator() {
  // Generate content using AI prompts
}
```

### Publish Scheduler
```typescript
// jobs/publishScheduler.ts
export default async function publishScheduler() {
  // Publish reviewed content
}
```

## 📁 Project Structure

```
payloadcms-backend-otomatis/
├── src/
│   ├── collections/          # PayloadCMS collections
│   ├── services/            # AI & external services
│   ├── jobs/               # Cron job handlers
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript types
│   └── payload.config.ts   # PayloadCMS config
├── jobs/                   # Bree.js cron jobs
├── tests/                  # Test files
├── docs/                   # Documentation
├── scripts/                # Setup scripts
└── public/                 # Static files
```

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run serve            # Start production server

# Database
npm run migrate          # Run migrations
npm run migrate:create   # Create migration
npm run migrate:reset    # Reset database

# Testing
npm test                 # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# Code Quality
npm run lint             # Run linter
npm run lint:fix         # Fix linting issues
npm run typecheck        # TypeScript check

# Setup
npm run setup            # Initial setup
```

## 🌍 Environment Variables

```env
# PayloadCMS Core
PAYLOAD_SECRET=your-secret-key
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/payloadcms

# AI Integration
OPENAI_API_KEY=sk-your-openai-key
GEMINI_API_KEY=your-gemini-key
CLAUDE_API_KEY=your-claude-key

# Image Services
UNSPLASH_ACCESS_KEY=your-unsplash-key
PIXABAY_API_KEY=your-pixabay-key
PEXELS_API_KEY=your-pexels-key

# Cloud Storage
S3_BUCKET=your-bucket
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key

# Monitoring
SENTRY_DSN=your-sentry-dsn
```

## 🚀 Deployment

### Railway
```bash
# Deploy to Railway
railway login
railway init
railway up
```

### Vercel
```bash
# Deploy to Vercel
vercel --prod
```

### Windows VPS
```bash
# Build and start
npm run build
npm run serve
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test
npm test -- --testNamePattern="AI Service"

# Coverage report
npm run test:coverage
```

## 📊 Monitoring

- **Sentry**: Error tracking and performance monitoring
- **Winston**: Structured logging
- **Morgan**: HTTP request logging
- **Redis**: Caching and session storage

## 🔒 Security

- CORS configuration
- Rate limiting
- Input validation
- SQL injection protection
- XSS protection
- CSRF protection

## 📚 Documentation

- [Complete Documentation](./PAYLOADCMS_BACKEND_DOKUMENTASI.md)
- [Plugin Guide](./docs/PLUGIN_GUIDE.md)
- [Project Structure](./PROJECT_STRUCTURE.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests
5. Submit pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🆘 Support

- 📧 Email: support@yoursite.com
- 💬 Discord: [Join Server](https://discord.gg/yourserver)
- 📖 Docs: [Documentation](https://docs.yoursite.com)

---

**Made with ❤️ for Windows developers**