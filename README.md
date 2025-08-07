# 🚀 PayloadCMS Backend Otomatis v2.32.3

Backend otomatis menggunakan **PayloadCMS 2.32.3** dengan integrasi AI, image services, dan cron jobs. Didesain untuk Windows dan menggunakan dependencies terbaru.

## ✨ Fitur Utama

- **PayloadCMS 2.32.3** - CMS headless terbaru
- **AI Integration** - OpenAI, Gemini, Replicate untuk konten otomatis
- **Image Services** - Unsplash, Pixabay, Pexels untuk gambar gratis
- **Cron Jobs** - Bree.js untuk otomatisasi konten
- **Windows Compatible** - Konfigurasi khusus untuk Windows
- **Latest Dependencies** - Semua dependencies versi terbaru

## 🛠️ Tech Stack

| Komponen | Teknologi | Versi |
|----------|-----------|-------|
| CMS | PayloadCMS | 2.32.3 |
| Database | MongoDB | 6.3.0 |
| AI Services | OpenAI, Gemini, Replicate | Latest |
| Image Services | Unsplash, Pixabay, Pexels | Latest |
| Cron Jobs | Bree.js | 9.1.0 |
| TypeScript | TypeScript | 5.3.3 |
| Frontend | Astro | 4.4.0 |

## 📦 Dependencies Terbaru

### Core Dependencies
- `payload@^2.32.3` - PayloadCMS terbaru
- `express@^4.18.2` - Web framework
- `mongoose@^8.1.0` - MongoDB ODM
- `dotenv@^16.3.1` - Environment variables

### PayloadCMS Adapters
- `@payloadcms/bundler-webpack` - Webpack bundler
- `@payloadcms/db-mongodb` - MongoDB adapter
- `@payloadcms/richtext-slate` - Rich text editor

### AI & Image Services
- `openai@^4.28.0` - OpenAI API
- `@google/generative-ai@^0.2.1` - Google Gemini
- `replicate@^0.25.1` - AI image generation
- `unsplash-js@^7.0.19` - Unsplash API
- `pixabay-api@^1.0.4` - Pixabay API
- `pexels@^1.4.0` - Pexels API

### Utilities
- `axios@^1.6.5` - HTTP client
- `lodash@^4.17.21` - Utility library
- `moment@^2.30.1` - Date handling
- `sharp@^0.33.2` - Image processing

## 🚀 Quick Start

### Backend Setup

1. **Clone repository**
```bash
git clone <repository-url>
cd payloadcms-backend-otomatis
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
cp .env.example .env
# Edit .env dengan konfigurasi yang diperlukan
```

4. **Start development server**
```bash
npm run dev
```

5. **Access admin panel**
```
http://localhost:3000/admin
```

### Frontend Setup (Astro)

1. **Navigate to frontend**
```bash
cd astro-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Access frontend**
```
http://localhost:4321
```

## 📁 Project Structure

```
payloadcms-backend-otomatis/
├── src/
│   ├── collections/          # PayloadCMS collections
│   ├── globals/             # Global configurations
│   ├── services/            # AI & Image services
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript types
│   ├── middleware/          # Express middleware
│   └── payload.config.ts    # PayloadCMS config
├── jobs/                    # Cron jobs (Bree.js)
├── tests/                   # Test files
├── public/                  # Static files
├── scripts/                 # Setup scripts
└── astro-frontend/         # Astro frontend
```

## 🔧 Available Commands

### Backend Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run serve        # Start production server
npm run setup        # Run setup script
npm run test         # Run tests
npm run lint         # Run linter
npm run typecheck    # TypeScript check
```

### Frontend Commands
```bash
cd astro-frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🌐 API Endpoints

### Collections
- `GET /api/posts` - Get all posts
- `GET /api/pages` - Get all pages
- `GET /api/products` - Get all products
- `GET /api/services` - Get all services
- `GET /api/raw-contents` - Get raw contents

### AI Services
- `POST /api/ai/generate` - Generate content with AI
- `POST /api/ai/image` - Generate AI images

### Image Services
- `GET /api/images/search` - Search images
- `GET /api/images/random` - Get random images

## 🔐 Environment Variables

```env
# PayloadCMS
PAYLOAD_SECRET=your-secret-key
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost/payloadcms-backend-otomatis

# AI Services
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=your-gemini-key
REPLICATE_API_TOKEN=your-replicate-token

# Image Services
UNSPLASH_ACCESS_KEY=your-unsplash-key
PIXABAY_API_KEY=your-pixabay-key
PEXELS_API_KEY=your-pexels-key

# Monitoring
SENTRY_DSN=your-sentry-dsn
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📊 Monitoring

- **Sentry** - Error tracking
- **Winston** - Logging
- **Morgan** - HTTP request logging

## 🚀 Deployment

### Backend Deployment
- **Railway** - Recommended for easy deployment
- **Render** - Alternative to Railway
- **VPS** - For full control

### Frontend Deployment
- **Vercel** - Recommended for Astro
- **Netlify** - Alternative to Vercel
- **GitHub Pages** - Free hosting

## 🔄 Dependencies Update

Semua dependencies telah diperbarui ke versi terbaru dan kompatibel dengan PayloadCMS 2.32.3:

- ✅ **PayloadCMS 2.32.3** - Versi terbaru
- ✅ **TypeScript 5.3.3** - Versi terbaru
- ✅ **Node.js 18+** - Versi minimum
- ✅ **Semua dependencies terbaru** - Tidak ada deprecated

### Dependencies yang Dihapus
- ❌ Plugin PayloadCMS yang tidak tersedia
- ❌ Dependencies deprecated
- ❌ Dependencies yang tidak kompatibel

## 📝 Documentation

- [DEPENDENCIES_UPDATED.md](./DEPENDENCIES_UPDATED.md) - Dependencies update details
- [PLUGIN_REALISTIC.md](./PLUGIN_REALISTIC.md) - Plugin availability guide
- [ASTRO_FRONTEND_SETUP.md](./ASTRO_FRONTEND_SETUP.md) - Frontend setup guide

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/payloadcms-backend-otomatis/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/payloadcms-backend-otomatis/wiki)

---

**Made with ❤️ using PayloadCMS 2.32.3**