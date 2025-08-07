# 🪟 Windows Setup Guide - PayloadCMS Backend Otomatis

Panduan lengkap untuk setup PayloadCMS Backend Otomatis di Windows 10/11.

## 📋 Prerequisites

### 1. Node.js 18+
```bash
# Download dari https://nodejs.org/
# Atau gunakan winget
winget install OpenJS.NodeJS
```

### 2. MongoDB
```bash
# Download dari https://www.mongodb.com/try/download/community
# Atau gunakan winget
winget install MongoDB.Server
```

### 3. Git
```bash
# Download dari https://git-scm.com/
# Atau gunakan winget
winget install Git.Git
```

## 🚀 Quick Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/payloadcms-backend-otomatis.git
cd payloadcms-backend-otomatis
```

### 2. Run Setup Script
```bash
npm run setup
```

### 3. Configure Environment
```bash
# Edit .env file
notepad .env
```

### 4. Start Development Server
```bash
# Start PayloadCMS only
npm run dev

# Start PayloadCMS + Cron Jobs
npm run dev:full
```

## 🔧 Manual Setup (Jika Setup Script Gagal)

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Plugin Wajib
```bash
npm install payload-enchants payload-tools
```

### 3. Install Plugin Rekomendasi
```bash
npm install payload-plugin-cloud-storage payload-plugin-seo payload-plugin-cloud payload-plugin-vercel payload-plugin-redis payload-plugin-sentry payload-plugin-slug payload-plugin-richtext-slate payload-plugin-email payload-plugin-webhooks
```

### 4. Install Plugin UI/UX
```bash
npm install payload-plugin-color-picker payload-plugin-relationship payload-plugin-media-library payload-plugin-tabs
```

### 5. Install AI & Image Services
```bash
npm install openai @google/generative-ai replicate unsplash-js pixabay-api pexels
```

### 6. Install Cron Jobs
```bash
npm install bree node-cron
```

### 7. Install RSS & Scraping
```bash
npm install rss-parser cheerio puppeteer
```

### 8. Install Database & Cache
```bash
npm install redis mongodb
```

### 9. Install Utilities
```bash
npm install axios lodash moment slugify sharp multer cross-env
```

### 10. Install Email & Notifications
```bash
npm install nodemailer twilio
```

### 11. Install Monitoring & Logging
```bash
npm install @sentry/node winston morgan
```

### 12. Install Development Dependencies
```bash
npm install --save-dev @types/node @types/express @types/lodash @types/moment @types/multer @types/nodemailer @types/morgan @types/node-cron @types/jest typescript ts-node nodemon eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser jest ts-jest supertest @types/supertest concurrently payload-plugin-debug payload-plugin-testing payload-plugin-migrate
```

## 🌍 Environment Configuration

### 1. Copy Environment File
```bash
copy .env.example .env
```

### 2. Edit .env File
```bash
notepad .env
```

### 3. Required Environment Variables
```env
# PayloadCMS Core
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/payloadcms

# AI Integration
OPENAI_API_KEY=sk-your-openai-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here
CLAUDE_API_KEY=your-claude-api-key-here

# Image Services
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
PIXABAY_API_KEY=your-pixabay-api-key
PEXELS_API_KEY=your-pexels-api-key

# Cloud Storage (Optional)
S3_BUCKET=your-s3-bucket
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=your-s3-access-key
S3_SECRET_ACCESS_KEY=your-s3-secret-key

# Monitoring (Optional)
SENTRY_DSN=your-sentry-dsn
```

## 🗄️ Database Setup

### 1. Install MongoDB
```bash
# Download MongoDB Community Server
# https://www.mongodb.com/try/download/community

# Atau gunakan MongoDB Atlas (cloud)
# https://www.mongodb.com/atlas
```

### 2. Start MongoDB Service
```bash
# Start MongoDB service
net start MongoDB

# Atau start manual
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

### 3. Create Database
```bash
# Connect to MongoDB
mongosh

# Create database
use payloadcms
```

## 🚀 Running the Application

### Development Mode
```bash
# Start PayloadCMS only
npm run dev

# Start PayloadCMS + Cron Jobs
npm run dev:full

# Start Cron Jobs only
npm run cron:dev
```

### Production Mode
```bash
# Build application
npm run build

# Start production server
npm run serve

# Start production server + cron jobs
npm run start:full
```

## 📊 Access Points

### Admin Panel
```
http://localhost:3000/admin
```

### API Endpoints
```
http://localhost:3000/api/raw-contents
http://localhost:3000/api/ai-prompts
http://localhost:3000/api/feeds
http://localhost:3000/api/status
http://localhost:3000/health
```

### GraphQL Playground
```
http://localhost:3000/graphql
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Specific Test
```bash
npm test -- --testNamePattern="AI Service"
```

## 🔧 Troubleshooting

### 1. Node.js Version Issues
```bash
# Check Node.js version
node --version

# Should be 18+ for PayloadCMS 2.10+
```

### 2. MongoDB Connection Issues
```bash
# Check MongoDB service
sc query MongoDB

# Start MongoDB service
net start MongoDB

# Check MongoDB connection
mongosh --eval "db.runCommand({ping: 1})"
```

### 3. Port Already in Use
```bash
# Check what's using port 3000
netstat -ano | findstr :3000

# Kill process using port 3000
taskkill /PID <PID> /F
```

### 4. Permission Issues
```bash
# Run as Administrator if needed
# Right-click Command Prompt -> Run as Administrator
```

### 5. Path Issues
```bash
# Add Node.js to PATH
# System Properties -> Environment Variables -> Path -> Add Node.js path
```

### 6. Antivirus Issues
```bash
# Add project folder to antivirus exclusion
# Windows Defender -> Settings -> Exclusions
```

## 📁 Project Structure

```
payloadcms-backend-otomatis/
├── src/
│   ├── collections/          # PayloadCMS collections
│   │   ├── Users.ts
│   │   ├── RawContents.ts
│   │   ├── Posts.ts
│   │   ├── Pages.ts
│   │   ├── Products.ts
│   │   ├── Services.ts
│   │   ├── Images.ts
│   │   ├── Feeds.ts
│   │   ├── ScrapeSources.ts
│   │   ├── AiPrompts.ts
│   │   ├── Categories.ts
│   │   └── Tags.ts
│   ├── services/            # AI & external services
│   │   ├── openaiService.ts
│   │   └── unsplashService.ts
│   ├── jobs/               # Cron job handlers
│   ├── utils/              # Utility functions
│   │   └── logger.ts
│   ├── types/              # TypeScript types
│   │   └── ai.ts
│   ├── middleware/         # Express middleware
│   │   └── errorHandler.ts
│   ├── payload.config.ts   # PayloadCMS config
│   ├── index.ts           # Main application
│   └── cron.ts            # Cron job scheduler
├── jobs/                   # Bree.js cron jobs
│   ├── rssFetcher.ts
│   ├── aiContentGenerator.ts
│   └── publishScheduler.ts
├── tests/                  # Test files
│   ├── unit/
│   │   └── ai.test.ts
│   └── integration/
│       └── collections.test.ts
├── docs/                   # Documentation
│   └── PLUGIN_GUIDE.md
├── scripts/                # Setup scripts
│   └── setup.js
├── public/                 # Static files
│   ├── images/
│   ├── icons/
│   └── media/
├── logs/                   # Log files
├── backups/                # Backup files
├── migrations/             # Database migrations
├── config/                 # Configuration files
├── package.json
├── tsconfig.json
├── .eslintrc.js
├── jest.config.js
├── bree.config.js
├── .env.example
├── .gitignore
└── README.md
```

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start development server
npm run dev:full         # Start dev server + cron jobs
npm run build            # Build for production
npm run serve            # Start production server
npm run start:full       # Start production + cron jobs

# Database
npm run migrate          # Run migrations
npm run migrate:create   # Create migration
npm run migrate:reset    # Reset database
npm run seed             # Seed database

# Testing
npm test                 # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# Code Quality
npm run lint             # Run linter
npm run lint:fix         # Fix linting issues
npm run typecheck        # TypeScript check

# Cron Jobs
npm run cron             # Start cron jobs (production)
npm run cron:dev         # Start cron jobs (development)

# Setup
npm run setup            # Initial setup
```

## 📚 Documentation

- [Complete Documentation](./PAYLOADCMS_BACKEND_DOKUMENTASI.md)
- [Plugin Guide](./docs/PLUGIN_GUIDE.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Final Summary](./FINAL_SUMMARY.md)

## 🆘 Support

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MongoDB service is running
   - Verify connection string in .env
   - Check firewall settings

2. **Node.js Version Error**
   - Update to Node.js 18+
   - Use nvm-windows for version management

3. **Permission Denied**
   - Run as Administrator
   - Check antivirus exclusions
   - Verify file permissions

4. **Port Already in Use**
   - Change port in .env file
   - Kill process using the port
   - Use different port

5. **Plugin Installation Failed**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall
   - Check internet connection

### Getting Help

- 📧 Email: support@yoursite.com
- 💬 Discord: [Join Server](https://discord.gg/yourserver)
- 📖 Docs: [Documentation](https://docs.yoursite.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/payloadcms-backend-otomatis/issues)

---

**Made with ❤️ for Windows developers**