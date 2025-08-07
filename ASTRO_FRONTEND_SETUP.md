# 🚀 Astro Frontend Setup untuk PayloadCMS Backend Otomatis

## 📋 Overview

Astro frontend yang terpisah untuk berjalan dengan PayloadCMS Backend Otomatis. Dibangun dengan teknologi modern untuk performa optimal.

## 🛠️ Tech Stack Terbaru

| Komponen | Versi | Keterangan |
|----------|-------|------------|
| **Astro** | 4.4.0 | Framework utama |
| **React** | 18.2.0 | UI library |
| **Tailwind CSS** | 3.4.0 | Styling framework |
| **TypeScript** | 5.3.3 | Type safety |
| **Vite** | 5.0.0 | Build tool |
| **SWR** | 2.2.4 | Data fetching |
| **Axios** | 1.6.5 | HTTP client |
| **Framer Motion** | 10.16.16 | Animations |
| **Heroicons** | 2.0.18 | Icons |
| **Lucide React** | 0.294.0 | Additional icons |

## 🚀 Quick Setup

### 1. Navigate ke Astro Frontend

```bash
cd astro-frontend
```

### 2. Run Setup Script

```bash
npm run setup
```

Script ini akan:
- ✅ Check Node.js version (18+)
- ✅ Install semua dependencies
- ✅ Create project structure
- ✅ Setup environment file
- ✅ Create public assets
- ✅ Setup TypeScript config

### 3. Configure Environment

Edit `.env` file:

```env
# API Configuration
PUBLIC_API_URL=http://localhost:3000
PUBLIC_SITE_URL=http://localhost:4321

# PayloadCMS Admin
PUBLIC_ADMIN_URL=http://localhost:3000/admin

# SEO Defaults
PUBLIC_SITE_NAME="PayloadCMS Backend Otomatis"
PUBLIC_SITE_DESCRIPTION="Backend CMS headless otomatis dengan integrasi AI, RSS, dan plugin lengkap"
```

### 4. Start Development Server

```bash
npm run dev
```

Akses di: `http://localhost:4321`

## 📁 Project Structure

```
astro-frontend/
├── src/
│   ├── components/          # React & Astro components
│   │   ├── Header.astro     # Navigation header
│   │   ├── Footer.astro     # Site footer
│   │   ├── Hero.astro       # Hero section
│   │   ├── Features.astro   # Feature showcase
│   │   └── Posts.astro      # Post grid/list
│   ├── layouts/            # Layout templates
│   │   └── Layout.astro    # Main layout
│   ├── pages/              # Astro pages
│   │   ├── index.astro     # Homepage
│   │   ├── posts/
│   │   │   ├── index.astro # Posts listing
│   │   │   └── [slug].astro # Single post
│   │   ├── products/       # Product pages
│   │   ├── services/       # Service pages
│   │   └── about.astro     # About page
│   ├── lib/                # Utilities & API
│   │   └── api.ts          # API client
│   └── types/              # TypeScript types
├── public/                 # Static assets
│   ├── favicon.svg         # Site favicon
│   ├── robots.txt          # SEO robots
│   └── sitemap.xml         # SEO sitemap
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies & scripts
├── .env.example           # Environment template
└── scripts/
    └── setup.js           # Setup script
```

## 🔌 API Integration

### Backend Requirements

Pastikan PayloadCMS backend berjalan dengan:

1. **CORS enabled** untuk `http://localhost:4321`
2. **Collections** yang sudah dibuat:
   - `posts`
   - `products` 
   - `services`
   - `categories`
   - `tags`

### API Endpoints

Frontend menggunakan endpoint berikut:

```typescript
// Posts
GET /api/posts?page=1&limit=12&where[status][equals]=published

// Single Post
GET /api/posts?where[slug][equals]=post-slug&limit=1

// Products
GET /api/products?page=1&limit=12&where[status][equals]=published

// Services
GET /api/services?page=1&limit=12&where[status][equals]=published

// Categories
GET /api/categories?where[active][equals]=true

// Tags
GET /api/tags?where[active][equals]=true

// Health Check
GET /api/status
```

## 🎨 Customization

### Styling dengan Tailwind

Edit `tailwind.config.mjs`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

### Components

Buat component baru di `src/components/`:

```astro
---
// src/components/MyComponent.astro
export interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div class="bg-white p-6 rounded-lg shadow">
  <h2 class="text-xl font-bold">{title}</h2>
  <slot />
</div>
```

### React Components

```tsx
// src/components/MyReactComponent.tsx
import React from 'react';

interface Props {
  title: string;
}

export default function MyReactComponent({ title }: Props) {
  return (
    <div className="bg-blue-100 p-4 rounded">
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
npm run build
vercel --prod
```

3. **Environment Variables**:
```env
PUBLIC_API_URL=https://your-backend.vercel.app
PUBLIC_SITE_URL=https://your-frontend.vercel.app
```

### Netlify

1. **Build**:
```bash
npm run build
```

2. **Deploy**:
```bash
netlify deploy --prod --dir=dist
```

### Manual VPS

1. **Build**:
```bash
npm run build
```

2. **Upload** `dist/` folder ke web server

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run start            # Alias untuk dev

# Build
npm run build            # Build untuk production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run typecheck        # TypeScript type checking

# Setup
npm run setup            # Run setup script
```

## 📊 Performance Features

- **Static Generation**: Halaman di-generate statis
- **Image Optimization**: Otomatis dengan Astro
- **Code Splitting**: Otomatis per route
- **Lazy Loading**: Images dan components
- **Caching**: Static assets cached
- **Minification**: CSS, JS, HTML

## 🔍 SEO Features

- **Meta Tags**: Otomatis dari frontmatter
- **Open Graph**: Social media sharing
- **Twitter Cards**: Twitter sharing
- **Structured Data**: JSON-LD schema
- **Sitemap**: Otomatis generated
- **Robots.txt**: SEO friendly

## 🎯 Integration Checklist

### Backend Setup
- [ ] PayloadCMS backend running di `http://localhost:3000`
- [ ] CORS configured untuk frontend
- [ ] Collections created (posts, products, services)
- [ ] Sample data added

### Frontend Setup
- [ ] Dependencies installed
- [ ] Environment configured
- [ ] Development server running
- [ ] API connection working

### Content Management
- [ ] Admin panel accessible
- [ ] Content created via admin
- [ ] Frontend displaying content
- [ ] Images loading correctly

### Deployment
- [ ] Production build working
- [ ] Environment variables set
- [ ] Domain configured
- [ ] SSL certificate active

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**
   ```
   Error: API request failed: 404
   ```
   **Solution**: Check backend URL in `.env` file

2. **CORS Error**
   ```
   Access to fetch at 'http://localhost:3000/api/posts' from origin 'http://localhost:4321' has been blocked
   ```
   **Solution**: Configure CORS in PayloadCMS backend

3. **Build Error**
   ```
   Error: Cannot find module 'react'
   ```
   **Solution**: Run `npm install` again

4. **TypeScript Error**
   ```
   Property 'title' does not exist on type 'Post'
   ```
   **Solution**: Update types in `src/lib/api.ts`

### Debug Mode

Enable debug mode in `.env`:

```env
PUBLIC_DEBUG_MODE=true
PUBLIC_ENABLE_LOGGING=true
```

## 📚 Resources

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PayloadCMS Documentation](https://payloadcms.com/docs)
- [React Documentation](https://react.dev/)

## 🤝 Support

Jika ada masalah:

1. Check console errors
2. Verify environment variables
3. Ensure backend is running
4. Check network connectivity
5. Review API responses

---

**🎉 Happy coding dengan Astro + PayloadCMS!**