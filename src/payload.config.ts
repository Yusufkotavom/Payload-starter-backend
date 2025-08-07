import { buildConfig } from 'payload/config';
import path from 'path';

// Plugin yang benar-benar tersedia
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
import { colorPickerPlugin } from 'payload-plugin-color-picker';
import { relationshipPlugin } from 'payload-plugin-relationship';
import { mediaLibraryPlugin } from 'payload-plugin-media-library';
import { tabsPlugin } from 'payload-plugin-tabs';
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
    // Plugin Wajib (Sangat Berguna)
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
    seoPlugin({
      collections: ['posts', 'pages', 'products', 'services'],
      generateSitemap: true,
      sitemap: {
        hostname: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
      },
    }),
    slugPlugin({
      collections: ['posts', 'pages', 'products', 'services', 'categories', 'tags'],
      field: 'slug',
      generateFrom: 'title',
    }),
    
    // Plugin Opsional (Bergantung Kebutuhan)
    ...(process.env.REDIS_URL ? [
      redisPlugin({
        url: process.env.REDIS_URL,
        collections: ['posts', 'pages', 'rawContents'],
        ttl: 3600, // 1 hour
      }),
    ] : []),
    
    ...(process.env.SENTRY_DSN ? [
      sentryPlugin({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        tracesSampleRate: 1.0,
      }),
    ] : []),
    
    ...(process.env.S3_BUCKET ? [
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
    ] : []),
    
    // Plugin UI/UX
    colorPickerPlugin({
      collections: ['categories', 'tags'],
      field: 'color',
    }),
    relationshipPlugin({
      collections: ['posts', 'pages', 'products', 'services'],
      enableSearch: true,
      enableSorting: true,
    }),
    mediaLibraryPlugin({
      collections: ['images'],
      enableSearch: true,
      enableSorting: true,
    }),
    tabsPlugin({
      collections: ['posts', 'pages', 'products', 'services'],
    }),
    
    // Plugin Development (hanya di development)
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
    
    // Plugin Deployment (hanya di production)
    ...(process.env.NODE_ENV === 'production' ? [
      cloudPlugin({
        collections: ['posts', 'pages', 'rawContents'],
      }),
      vercelPlugin({
        collections: ['posts', 'pages', 'rawContents'],
      }),
      emailPlugin({
        collections: ['posts', 'pages'],
        templates: {
          newPost: {
            subject: 'New Post Published: {{title}}',
            html: '<h1>{{title}}</h1><p>{{excerpt}}</p>',
          },
        },
      }),
      webhooksPlugin({
        collections: ['posts', 'pages'],
        endpoints: [
          {
            url: process.env.WEBHOOK_URL,
            events: ['post.create', 'post.update'],
          },
        ],
      }),
    ] : []),
  ],
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:4321',
    process.env.ADMIN_URL || 'http://localhost:3000',
  ],
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:4321',
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
    preMiddleware: [],
    postMiddleware: [],
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