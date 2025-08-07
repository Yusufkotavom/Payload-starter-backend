# 🚀 Astro Frontend untuk PayloadCMS Backend Otomatis

Frontend modern yang dibangun dengan **Astro**, **React**, dan **Tailwind CSS** untuk berjalan dengan PayloadCMS Backend Otomatis.

## ✨ Fitur

- 🎨 **Modern UI/UX** dengan Tailwind CSS
- ⚡ **Performance** dengan Astro static generation
- 🔄 **React Components** untuk interaktivitas
- 📱 **Responsive Design** untuk semua device
- 🔍 **SEO Optimized** dengan meta tags
- 🚀 **Fast Loading** dengan image optimization
- 📊 **Analytics Ready** (Google Analytics, Facebook Pixel)
- 🔧 **TypeScript** untuk type safety

## 🛠️ Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| **Framework** | Astro 4.4.0 |
| **UI Library** | React 18.2.0 |
| **Styling** | Tailwind CSS 3.4.0 |
| **Language** | TypeScript 5.3.3 |
| **Icons** | Heroicons, Lucide React |
| **Animations** | Framer Motion |
| **HTTP Client** | SWR, Axios |
| **Deployment** | Vercel, Netlify |

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd astro-frontend
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env
```

Edit `.env` file:
```env
PUBLIC_API_URL=http://localhost:3000
PUBLIC_SITE_URL=http://localhost:4321
```

### 3. Run Development Server

```bash
npm run dev
```

Akses di: `http://localhost:4321`

### 4. Build untuk Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
astro-frontend/
├── src/
│   ├── components/          # React & Astro components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   └── Posts.astro
│   ├── layouts/            # Layout templates
│   │   └── Layout.astro
│   ├── pages/              # Astro pages
│   │   ├── index.astro
│   │   ├── posts/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── products/
│   │   ├── services/
│   │   └── about.astro
│   ├── lib/                # Utilities & API
│   │   └── api.ts
│   └── types/              # TypeScript types
├── public/                 # Static assets
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔌 API Integration

Frontend terintegrasi dengan PayloadCMS backend melalui REST API:

### Endpoints yang Digunakan

- `GET /api/posts` - Artikel blog
- `GET /api/products` - Produk e-commerce
- `GET /api/services` - Layanan
- `GET /api/categories` - Kategori
- `GET /api/tags` - Tags
- `GET /api/status` - Health check

### API Client

```typescript
import { apiClient } from '@/lib/api';

// Fetch posts
const posts = await apiClient.getPosts({
  page: 1,
  limit: 12,
  status: 'published'
});

// Fetch single post
const post = await apiClient.getPost('post-slug');
```

## 🎨 Components

### Layout Components

- **Layout.astro** - Main layout dengan SEO meta tags
- **Header.astro** - Navigation header
- **Footer.astro** - Site footer

### Page Components

- **Hero.astro** - Hero section
- **Features.astro** - Feature showcase
- **Posts.astro** - Post grid/list

### React Components

```tsx
// Example React component
import React from 'react';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md">
      <img src={post.featuredImage?.url} alt={post.title} />
      <div className="p-6">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-gray-600">{post.excerpt}</p>
      </div>
    </article>
  );
}
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables untuk Production

```env
PUBLIC_API_URL=https://your-backend.vercel.app
PUBLIC_SITE_URL=https://your-frontend.vercel.app
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run typecheck    # TypeScript type checking
```

### Adding New Pages

1. Create file in `src/pages/`
2. Import Layout component
3. Add content with Astro syntax

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Title">
  <h1>Page Content</h1>
</Layout>
```

### Adding React Components

1. Create `.tsx` file in `src/components/`
2. Import in Astro page
3. Use with client:load directive

```astro
---
import ReactComponent from '../components/ReactComponent.tsx';
---

<ReactComponent client:load />
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized
- **Image Optimization**: Automatic with Astro
- **Code Splitting**: Automatic
- **Caching**: Static assets cached

## 🔍 SEO Features

- Meta tags optimization
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt

## 🎯 Next Steps

1. **Setup Backend**: Pastikan PayloadCMS backend berjalan di `http://localhost:3000`
2. **Configure Environment**: Edit `.env` file dengan URL backend yang benar
3. **Add Content**: Buat konten melalui admin panel
4. **Customize Design**: Edit Tailwind config dan components
5. **Deploy**: Deploy ke Vercel/Netlify

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

---

**🎉 Happy coding dengan Astro + PayloadCMS!**