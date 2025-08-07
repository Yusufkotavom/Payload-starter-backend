import { buildConfig } from 'payload/config';
import path from 'path';

// Plugin imports
import { enchantsPlugin } from 'payload-enchants';
import { toolsPlugin } from 'payload-tools';
import { cloudStoragePlugin } from 'payload-plugin-cloud-storage';
import { seoPlugin } from 'payload-plugin-seo';
import { cloudPlugin } from 'payload-plugin-cloud';
import { vercelPlugin } from 'payload-plugin-vercel';
import { redisPlugin } from 'payload-plugin-redis';
import { sentryPlugin } from 'payload-plugin-sentry';
import { slugPlugin } from 'payload-plugin-slug';
import { richtextSlatePlugin } from 'payload-plugin-richtext-slate';
import { emailPlugin } from 'payload-plugin-email';
import { webhooksPlugin } from 'payload-plugin-webhooks';

// UI/UX Plugins
import { colorPickerPlugin } from 'payload-plugin-color-picker';
import { relationshipPlugin } from 'payload-plugin-relationship';
import { mediaLibraryPlugin } from 'payload-plugin-media-library';
import { tabsPlugin } from 'payload-plugin-tabs';

// Development Plugins
import { debugPlugin } from 'payload-plugin-debug';
import { testingPlugin } from 'payload-plugin-testing';
import { migratePlugin } from 'payload-plugin-migrate';

// Collections
import { Users } from './collections/Users';
import { RawContents } from './collections/RawContents';
import { Posts } from './collections/Posts';
import { Pages } from './collections/Pages';
import { Products } from './collections/Products';
import { Services } from './collections/Services';
import { Images } from './collections/Images';
import { Feeds } from './collections/Feeds';
import { ScrapeSources } from './collections/ScrapeSources';
import { AiPrompts } from './collections/AiPrompts';
import { Categories } from './collections/Categories';
import { Tags } from './collections/Tags';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- PayloadCMS Backend Otomatis',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
    bundler: {
      // Use webpack for Windows compatibility
      webpack: (config) => {
        // Windows-specific webpack configuration
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          path: require.resolve('path-browserify'),
          os: require.resolve('os-browserify/browser'),
        };
        return config;
      },
    },
  },
  collections: [
    Users,
    RawContents,
    Posts,
    Pages,
    Products,
    Services,
    Images,
    Feeds,
    ScrapeSources,
    AiPrompts,
    Categories,
    Tags,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    // Plugin Wajib
    enchantsPlugin({
      collections: ['posts', 'pages', 'rawContents', 'products', 'services'],
      enableDuplicate: true,
      enableImport: true,
      enableExport: true,
      enableSorting: true,
      enableBulkActions: true,
    }),
    
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

    // Plugin Rekomendasi
    cloudStoragePlugin({
      collections: {
        images: {
          adapter: 's3', // or 'gcs', 'azure'
          config: {
            bucket: process.env.S3_BUCKET || 'your-bucket',
            region: process.env.S3_REGION || 'us-east-1',
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
          },
        },
      },
    }),

    seoPlugin({
      collections: ['posts', 'pages', 'products', 'services'],
      generateTitle: ({ doc }) => `${doc.title} - My Site`,
      generateDescription: ({ doc }) => doc.excerpt || doc.content?.substring(0, 160),
      generateKeywords: ({ doc }) => doc.tags?.join(', ') || '',
      generateImage: ({ doc }) => doc.featuredImage?.url || '',
    }),

    cloudPlugin({
      collections: ['posts', 'pages', 'rawContents'],
      hooks: {
        afterChange: async ({ doc, req }) => {
          // Trigger rebuild on Vercel/Netlify
          console.log('Content changed, triggering rebuild...');
        },
      },
    }),

    vercelPlugin({
      collections: ['posts', 'pages', 'rawContents'],
      webhookUrl: process.env.VERCEL_WEBHOOK_URL,
    }),

    redisPlugin({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      collections: ['posts', 'pages', 'rawContents'],
      ttl: 3600, // 1 hour
    }),

    sentryPlugin({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: 1.0,
    }),

    slugPlugin({
      collections: ['posts', 'pages', 'products', 'services'],
      field: 'title',
      generateSlug: (value) => value.toLowerCase().replace(/\s+/g, '-'),
    }),

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
      ],
    }),

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
      },
    }),

    webhooksPlugin({
      endpoints: [
        {
          url: process.env.WEBHOOK_URL,
          events: ['post.created', 'post.updated', 'post.deleted'],
          headers: {
            'Authorization': `Bearer ${process.env.WEBHOOK_SECRET}`,
          },
        },
      ],
    }),

    // UI/UX Plugins
    colorPickerPlugin({
      collections: ['posts', 'pages'],
      fields: ['themeColor', 'accentColor'],
    }),

    relationshipPlugin({
      collections: ['posts', 'pages', 'rawContents'],
      enhancedUI: true,
      searchable: true,
      filterable: true,
    }),

    mediaLibraryPlugin({
      collections: ['images'],
      features: {
        search: true,
        filter: true,
        sort: true,
        bulkActions: true,
        categories: true,
        tags: true,
      },
    }),

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
      ],
    }),

    // Development Plugins (only in development)
    ...(process.env.NODE_ENV === 'development' ? [
      debugPlugin({
        enabled: true,
        logLevel: 'debug',
      }),
      
      testingPlugin({
        enabled: true,
        testCollections: ['posts', 'pages', 'rawContents'],
      }),
      
      migratePlugin({
        enabled: true,
        autoBackup: true,
      }),
    ] : []),
  ],
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.ADMIN_URL || 'http://localhost:3000',
  ],
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
  ],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
    // Windows-compatible file handling
    fileFilter: (req, file, cb) => {
      // Allow all file types for now
      cb(null, true);
    },
  },
  rateLimit: {
    max: 1000,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  express: {
    preMiddleware: [
      // Add custom middleware here
    ],
    postMiddleware: [
      // Add custom middleware here
    ],
  },
  // Windows-specific configuration
  db: {
    mongoURL: process.env.MONGODB_URI,
    // Windows MongoDB connection options
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Windows-specific options
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
    },
  },
  // File upload configuration for Windows
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
    // Windows path handling
    staticDir: path.resolve(__dirname, '../public/media'),
    // Windows-compatible file naming
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  },
});