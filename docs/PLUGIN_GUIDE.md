# 📦 Panduan Plugin PayloadCMS Backend Otomatis

Panduan lengkap untuk semua plugin yang diintegrasikan dalam PayloadCMS Backend Otomatis.

## 🎯 Plugin Wajib

### 1. payload-enchants
**Fungsi**: Import/export JSON, duplikat, sorting, bulk actions

**Instalasi**:
```bash
npm install payload-enchants
```

**Konfigurasi**:
```typescript
import { enchantsPlugin } from 'payload-enchants';

export default buildConfig({
  plugins: [
    enchantsPlugin({
      collections: ['posts', 'pages', 'rawContents', 'products', 'services'],
      enableDuplicate: true,
      enableImport: true,
      enableExport: true,
      enableSorting: true,
      enableBulkActions: true,
    }),
  ],
});
```

**Fitur**:
- ✅ Import/export data dalam format JSON
- ✅ Duplikat dokumen dengan mudah
- ✅ Sorting dan filtering advanced
- ✅ Bulk actions (delete, update multiple)
- ✅ Drag & drop reordering

**Link**: [GitHub](https://github.com/r1tsuu/payload-enchants)

---

### 2. payload-tools
**Fungsi**: CLI backup/export, database management

**Instalasi**:
```bash
npm install payload-tools
```

**Konfigurasi**:
```typescript
import { toolsPlugin } from 'payload-tools';

export default buildConfig({
  plugins: [
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
      import: {
        enabled: true,
        collections: ['posts', 'pages', 'rawContents'],
      },
    }),
  ],
});
```

**CLI Commands**:
```bash
# Backup database
npx payload-tools backup

# Export data
npx payload-tools export --collection=posts

# Import data
npx payload-tools import --file=data.json
```

**Link**: [GitHub](https://github.com/shefing/payload-tools)

---

## 🚀 Plugin Rekomendasi

### 3. payload-plugin-seo
**Fungsi**: SEO meta fields otomatis

**Instalasi**:
```bash
npm install payload-plugin-seo
```

**Konfigurasi**:
```typescript
import { seoPlugin } from 'payload-plugin-seo';

export default buildConfig({
  plugins: [
    seoPlugin({
      collections: ['posts', 'pages', 'products', 'services'],
      generateTitle: ({ doc }) => `${doc.title} - My Site`,
      generateDescription: ({ doc }) => doc.excerpt || doc.content?.substring(0, 160),
      generateKeywords: ({ doc }) => doc.tags?.join(', ') || '',
      generateImage: ({ doc }) => doc.featuredImage?.url || '',
      generateUrl: ({ doc }) => `https://yoursite.com/${doc.slug}`,
    }),
  ],
});
```

**Fields yang Ditambahkan**:
- `metaTitle`
- `metaDescription`
- `metaKeywords`
- `metaImage`
- `canonicalURL`
- `ogTitle`
- `ogDescription`
- `ogImage`
- `twitterCard`

---

### 4. payload-plugin-cloud-storage
**Fungsi**: Upload ke cloud storage (AWS S3, Google Cloud Storage, Azure)

**Instalasi**:
```bash
npm install payload-plugin-cloud-storage
```

**Konfigurasi AWS S3**:
```typescript
import { cloudStoragePlugin } from 'payload-plugin-cloud-storage';

export default buildConfig({
  plugins: [
    cloudStoragePlugin({
      collections: {
        images: {
          adapter: 's3',
          config: {
            bucket: process.env.S3_BUCKET,
            region: process.env.S3_REGION,
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
          },
        },
      },
    }),
  ],
});
```

**Konfigurasi Google Cloud Storage**:
```typescript
cloudStoragePlugin({
  collections: {
    images: {
      adapter: 'gcs',
      config: {
        bucket: process.env.GCS_BUCKET,
        keyFilename: process.env.GCS_KEY_FILE,
      },
    },
  },
})
```

---

### 5. payload-plugin-redis
**Fungsi**: Cache dengan Redis untuk performa optimal

**Instalasi**:
```bash
npm install payload-plugin-redis
```

**Konfigurasi**:
```typescript
import { redisPlugin } from 'payload-plugin-redis';

export default buildConfig({
  plugins: [
    redisPlugin({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      collections: ['posts', 'pages', 'rawContents'],
      ttl: 3600, // 1 hour
      prefix: 'payload:',
    }),
  ],
});
```

**Fitur**:
- ✅ Cache API responses
- ✅ Cache collection queries
- ✅ Automatic cache invalidation
- ✅ Configurable TTL
- ✅ Redis cluster support

---

### 6. payload-plugin-sentry
**Fungsi**: Error tracking & monitoring

**Instalasi**:
```bash
npm install payload-plugin-sentry
```

**Konfigurasi**:
```typescript
import { sentryPlugin } from 'payload-plugin-sentry';

export default buildConfig({
  plugins: [
    sentryPlugin({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: 1.0,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({ app: express }),
      ],
    }),
  ],
});
```

**Fitur**:
- ✅ Error tracking
- ✅ Performance monitoring
- ✅ User context
- ✅ Breadcrumbs
- ✅ Release tracking

---

### 7. payload-plugin-slug
**Fungsi**: Auto-generate slug dari title

**Instalasi**:
```bash
npm install payload-plugin-slug
```

**Konfigurasi**:
```typescript
import { slugPlugin } from 'payload-plugin-slug';

export default buildConfig({
  plugins: [
    slugPlugin({
      collections: ['posts', 'pages', 'products', 'services'],
      field: 'title',
      generateSlug: (value) => value.toLowerCase().replace(/\s+/g, '-'),
      unique: true,
    }),
  ],
});
```

**Fitur**:
- ✅ Auto-generate slug dari field lain
- ✅ Custom slug generation function
- ✅ Unique slug validation
- ✅ Slug history tracking

---

### 8. payload-plugin-richtext-slate
**Fungsi**: Rich text editor yang lebih powerful

**Instalasi**:
```bash
npm install payload-plugin-richtext-slate
```

**Konfigurasi**:
```typescript
import { richtextSlatePlugin } from 'payload-plugin-richtext-slate';

export default buildConfig({
  plugins: [
    richtextSlatePlugin({
      collections: ['posts', 'pages', 'rawContents'],
      features: [
        'heading',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'link',
        'blockquote',
        'code',
        'ul',
        'ol',
        'image',
        'video',
        'table',
        'alignment',
        'indent',
        'highlight',
      ],
    }),
  ],
});
```

**Fitur**:
- ✅ Advanced text formatting
- ✅ Media embedding
- ✅ Table support
- ✅ Code highlighting
- ✅ Custom elements

---

### 9. payload-plugin-email
**Fungsi**: Email notifications

**Instalasi**:
```bash
npm install payload-plugin-email
```

**Konfigurasi**:
```typescript
import { emailPlugin } from 'payload-plugin-email';

export default buildConfig({
  plugins: [
    emailPlugin({
      fromName: 'PayloadCMS Backend',
      fromAddress: 'noreply@yoursite.com',
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      templates: {
        welcome: {
          subject: 'Welcome to PayloadCMS Backend',
          html: '<h1>Welcome!</h1><p>Your account has been created successfully.</p>',
        },
        contentPublished: {
          subject: 'Content Published',
          html: '<h1>Content Published</h1><p>Your content has been published successfully.</p>',
        },
        contentReview: {
          subject: 'Content Review Required',
          html: '<h1>Content Review</h1><p>New content requires your review.</p>',
        },
      },
    }),
  ],
});
```

**Fitur**:
- ✅ Email templates
- ✅ SMTP configuration
- ✅ HTML email support
- ✅ Attachment support
- ✅ Email scheduling

---

### 10. payload-plugin-webhooks
**Fungsi**: Webhook untuk integrasi eksternal

**Instalasi**:
```bash
npm install payload-plugin-webhooks
```

**Konfigurasi**:
```typescript
import { webhooksPlugin } from 'payload-plugin-webhooks';

export default buildConfig({
  plugins: [
    webhooksPlugin({
      endpoints: [
        {
          url: process.env.WEBHOOK_URL,
          events: ['post.created', 'post.updated', 'post.deleted'],
          headers: {
            'Authorization': `Bearer ${process.env.WEBHOOK_SECRET}`,
            'Content-Type': 'application/json',
          },
          timeout: 5000,
          retries: 3,
        },
        {
          url: process.env.VERCEL_WEBHOOK_URL,
          events: ['post.created', 'post.updated'],
          headers: {
            'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
          },
        },
      ],
    }),
  ],
});
```

**Events Available**:
- `collection.created`
- `collection.updated`
- `collection.deleted`
- `user.created`
- `user.updated`
- `user.deleted`

---

## 🎨 Plugin UI/UX

### 11. payload-plugin-color-picker
**Fungsi**: Color picker field

**Instalasi**:
```bash
npm install payload-plugin-color-picker
```

**Konfigurasi**:
```typescript
import { colorPickerPlugin } from 'payload-plugin-color-picker';

export default buildConfig({
  plugins: [
    colorPickerPlugin({
      collections: ['posts', 'pages'],
      fields: ['themeColor', 'accentColor', 'backgroundColor'],
      defaultColors: ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff'],
    }),
  ],
});
```

---

### 12. payload-plugin-relationship
**Fungsi**: Enhanced relationship fields

**Instalasi**:
```bash
npm install payload-plugin-relationship
```

**Konfigurasi**:
```typescript
import { relationshipPlugin } from 'payload-plugin-relationship';

export default buildConfig({
  plugins: [
    relationshipPlugin({
      collections: ['posts', 'pages', 'rawContents'],
      enhancedUI: true,
      searchable: true,
      filterable: true,
      sortable: true,
      pagination: true,
    }),
  ],
});
```

---

### 13. payload-plugin-media-library
**Fungsi**: Media library yang lebih advanced

**Instalasi**:
```bash
npm install payload-plugin-media-library
```

**Konfigurasi**:
```typescript
import { mediaLibraryPlugin } from 'payload-plugin-media-library';

export default buildConfig({
  plugins: [
    mediaLibraryPlugin({
      collections: ['images'],
      features: {
        search: true,
        filter: true,
        sort: true,
        bulkActions: true,
        categories: true,
        tags: true,
        folders: true,
        favorites: true,
      },
    }),
  ],
});
```

---

### 14. payload-plugin-tabs
**Fungsi**: Tab interface untuk fields

**Instalasi**:
```bash
npm install payload-plugin-tabs
```

**Konfigurasi**:
```typescript
import { tabsPlugin } from 'payload-plugin-tabs';

export default buildConfig({
  plugins: [
    tabsPlugin({
      collections: ['posts', 'pages', 'rawContents'],
      tabs: [
        {
          label: 'Content',
          fields: ['title', 'content', 'excerpt'],
        },
        {
          label: 'SEO',
          fields: ['metaTitle', 'metaDescription', 'metaKeywords'],
        },
        {
          label: 'Settings',
          fields: ['status', 'publishedAt', 'author'],
        },
        {
          label: 'Media',
          fields: ['featuredImage', 'gallery'],
        },
      ],
    }),
  ],
});
```

---

## 🔧 Plugin Development

### 15. payload-plugin-debug
**Fungsi**: Debug mode untuk development

**Instalasi**:
```bash
npm install --save-dev payload-plugin-debug
```

**Konfigurasi**:
```typescript
import { debugPlugin } from 'payload-plugin-debug';

export default buildConfig({
  plugins: [
    ...(process.env.NODE_ENV === 'development' ? [
      debugPlugin({
        enabled: true,
        logLevel: 'debug',
        showQueries: true,
        showPerformance: true,
      }),
    ] : []),
  ],
});
```

---

### 16. payload-plugin-testing
**Fungsi**: Testing utilities

**Instalasi**:
```bash
npm install --save-dev payload-plugin-testing
```

**Konfigurasi**:
```typescript
import { testingPlugin } from 'payload-plugin-testing';

export default buildConfig({
  plugins: [
    ...(process.env.NODE_ENV === 'test' ? [
      testingPlugin({
        enabled: true,
        testCollections: ['posts', 'pages', 'rawContents'],
        mockData: true,
        cleanupAfterTests: true,
      }),
    ] : []),
  ],
});
```

---

### 17. payload-plugin-migrate
**Fungsi**: Database migration tools

**Instalasi**:
```bash
npm install --save-dev payload-plugin-migrate
```

**Konfigurasi**:
```typescript
import { migratePlugin } from 'payload-plugin-migrate';

export default buildConfig({
  plugins: [
    migratePlugin({
      enabled: true,
      autoBackup: true,
      backupPath: './backups',
      migrationsPath: './migrations',
    }),
  ],
});
```

---

## 📋 Checklist Instalasi Plugin

### Plugin Wajib
- [ ] `payload-enchants` - Import/export, duplikat, sorting
- [ ] `payload-tools` - CLI backup/export

### Plugin Rekomendasi
- [ ] `payload-plugin-seo` - SEO meta fields otomatis
- [ ] `payload-plugin-cloud-storage` - Upload ke cloud storage
- [ ] `payload-plugin-redis` - Cache dengan Redis
- [ ] `payload-plugin-sentry` - Error tracking & monitoring
- [ ] `payload-plugin-slug` - Auto-generate slug
- [ ] `payload-plugin-richtext-slate` - Rich text editor advanced
- [ ] `payload-plugin-email` - Email notifications
- [ ] `payload-plugin-webhooks` - Integrasi eksternal

### Plugin UI/UX
- [ ] `payload-plugin-color-picker` - Color picker field
- [ ] `payload-plugin-relationship` - Enhanced relationship fields
- [ ] `payload-plugin-media-library` - Media library advanced
- [ ] `payload-plugin-tabs` - Tab interface untuk fields

### Plugin Development
- [ ] `payload-plugin-debug` - Debug mode untuk development
- [ ] `payload-plugin-testing` - Testing utilities
- [ ] `payload-plugin-migrate` - Database migration tools

---

## 🚀 Script Instalasi Otomatis

Gunakan script setup otomatis untuk instalasi semua plugin:

```bash
# Clone repository
git clone https://github.com/yourusername/payloadcms-backend-otomatis.git
cd payloadcms-backend-otomatis

# Run setup script
chmod +x scripts/setup.sh
./scripts/setup.sh
```

---

## 🔧 Troubleshooting

### Plugin tidak ter-load
1. Pastikan plugin sudah di-install: `npm list payload-plugin-name`
2. Check import statement di `payload.config.ts`
3. Restart development server: `npm run dev`

### Konfigurasi tidak bekerja
1. Check environment variables
2. Verify plugin options
3. Check console untuk error messages

### Performance issues
1. Enable Redis cache
2. Optimize database queries
3. Use CDN untuk static assets

---

## 📚 Referensi

- [PayloadCMS Documentation](https://payloadcms.com/docs)
- [PayloadCMS Plugins Directory](https://payloadcms.com/plugins)
- [Plugin Development Guide](https://payloadcms.com/docs/admin/components#building-a-custom-field)

---

**Plugin guide ini akan terus diperbarui sesuai dengan perkembangan plugin PayloadCMS terbaru.**