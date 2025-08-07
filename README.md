# 🚀 PayloadCMS Backend Otomatis

Backend CMS headless dengan integrasi AI, otomatisasi konten, dan plugin lengkap untuk mengelola konten secara otomatis.

## 📋 Fitur Utama

- 🤖 **AI Integration**: OpenAI, Gemini, Claude, Ollama
- 🖼 **Image Automation**: Unsplash, Pixabay, Pexels, AI Image Generation
- ⚙️ **Cron Jobs**: Bree.js untuk otomatisasi konten
- 📦 **Plugin Lengkap**: Import/export, SEO, cloud storage, monitoring
- 🔄 **Content Workflow**: Raw content → Review → Publish
- 🌐 **Headless CMS**: API-first untuk frontend modern

## 🎯 Plugin yang Diintegrasikan

### Plugin Wajib ✅
- `payload-enchants` - Import/export, duplikat, sorting
- `payload-tools` - CLI backup/export

### Plugin Rekomendasi 🚀
- `payload-plugin-seo` - SEO meta fields otomatis
- `payload-plugin-cloud-storage` - Upload ke cloud storage
- `payload-plugin-redis` - Cache dengan Redis
- `payload-plugin-sentry` - Error tracking & monitoring
- `payload-plugin-slug` - Auto-generate slug
- `payload-plugin-richtext-slate` - Rich text editor advanced
- `payload-plugin-email` - Email notifications
- `payload-plugin-webhooks` - Integrasi eksternal

### Plugin UI/UX 🎨
- `payload-plugin-color-picker` - Color picker field
- `payload-plugin-relationship` - Enhanced relationship fields
- `payload-plugin-media-library` - Media library advanced
- `payload-plugin-tabs` - Tab interface untuk fields

## 🛠️ Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/payloadcms-backend-otomatis.git
cd payloadcms-backend-otomatis
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env
```

Edit file `.env` dan isi dengan konfigurasi yang sesuai:
- MongoDB URI
- API keys untuk AI services
- Image service credentials
- Cloud storage configuration

### 4. Install Plugin Wajib
```bash
npm install payload-enchants payload-tools
```

### 5. Install Plugin Rekomendasi
```bash
npm install payload-plugin-cloud-storage payload-plugin-seo payload-plugin-cloud payload-plugin-vercel payload-plugin-redis payload-plugin-sentry payload-plugin-slug payload-plugin-richtext-slate payload-plugin-email payload-plugin-webhooks
```

### 6. Install Plugin UI/UX
```bash
npm install payload-plugin-color-picker payload-plugin-relationship payload-plugin-media-library payload-plugin-tabs
```

### 7. Install Plugin Development (Development Only)
```bash
npm install --save-dev payload-plugin-debug payload-plugin-testing payload-plugin-migrate
```

## 🚀 Menjalankan Aplikasi

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run serve
```

## 📁 Struktur Proyek

```
payloadcms-backend-otomatis/
├── src/
│   ├── collections/          # Koleksi PayloadCMS
│   ├── jobs/                # Cron jobs (Bree.js)
│   ├── plugins/             # Custom plugins
│   ├── services/            # AI & image services
│   └── payload.config.ts    # Konfigurasi utama
├── jobs/                    # Cron job files
├── docs/                    # Dokumentasi
├── tests/                   # Unit tests
└── package.json
```

## 🔧 Konfigurasi Plugin

### payload-enchants
```typescript
enchantsPlugin({
  collections: ['posts', 'pages', 'rawContents', 'products', 'services'],
  enableDuplicate: true,
  enableImport: true,
  enableExport: true,
  enableSorting: true,
  enableBulkActions: true,
})
```

### payload-tools
```typescript
toolsPlugin({
  backup: {
    enabled: true,
    schedule: '0 2 * * *', // Daily at 2 AM
    collections: ['posts', 'pages', 'rawContents'],
  },
  export: {
    enabled: true,
    collections: ['posts', 'pages', 'rawContents'],
    format: 'json',
  },
})
```

### payload-plugin-seo
```typescript
seoPlugin({
  collections: ['posts', 'pages', 'products', 'services'],
  generateTitle: ({ doc }) => `${doc.title} - My Site`,
  generateDescription: ({ doc }) => doc.excerpt || doc.content?.substring(0, 160),
  generateKeywords: ({ doc }) => doc.tags?.join(', ') || '',
  generateImage: ({ doc }) => doc.featuredImage?.url || '',
})
```

## 🤖 AI Integration

### OpenAI
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate content
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Write a blog post about..." }],
});
```

### Gemini (via proxy)
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const result = await model.generateContent("Write a blog post about...");
```

## 📷 Image Services

### Unsplash
```typescript
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const result = await unsplash.search.getPhotos({
  query: 'nature',
  page: 1,
  perPage: 10,
});
```

### Pixabay
```typescript
import PixabayApi from 'pixabay-api';

const pixabay = new PixabayApi(process.env.PIXABAY_API_KEY);
const result = await pixabay.query('nature');
```

## ⏱️ Cron Jobs

### RSS Fetcher
```typescript
// jobs/rssFetcher.ts
export default async function rssFetcher() {
  // Fetch RSS feeds and save to rawContents
  console.log('Fetching RSS feeds...');
}
```

### AI Content Generator
```typescript
// jobs/aiContentGenerator.ts
export default async function aiContentGenerator() {
  // Generate content using AI and save to rawContents
  console.log('Generating AI content...');
}
```

## 🔐 Environment Variables

Lihat file `.env.example` untuk daftar lengkap variabel lingkungan yang diperlukan.

## 📚 Dokumentasi Lengkap

Lihat file `PAYLOADCMS_BACKEND_DOKUMENTASI.md` untuk dokumentasi lengkap dengan:
- Struktur koleksi detail
- Alur otomatisasi konten
- Konfigurasi plugin lengkap
- API endpoints
- Deployment guide

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test
npm test -- --testNamePattern="AI Integration"
```

## 🚀 Deployment

### Railway
1. Connect repository ke Railway
2. Set environment variables
3. Deploy otomatis

### Vercel
1. Install Vercel CLI
2. Run `vercel --prod`
3. Set environment variables di dashboard

### VPS
1. Setup Node.js dan MongoDB
2. Install PM2: `npm install -g pm2`
3. Deploy: `pm2 start ecosystem.config.js`

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

- 📧 Email: support@yoursite.com
- 💬 Discord: [Join our server](https://discord.gg/yourserver)
- 📖 Documentation: [Read docs](https://docs.yoursite.com)

## 🙏 Acknowledgments

- [PayloadCMS](https://payloadcms.com/) - Headless CMS
- [Bree.js](https://jobscheduler.net/) - Job scheduler
- [Unsplash](https://unsplash.com/) - Free images
- [OpenAI](https://openai.com/) - AI services

---

**Made with ❤️ by [Your Name]**