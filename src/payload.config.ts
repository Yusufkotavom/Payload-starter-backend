import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';

// Collections
import { Users } from './collections/Users';
import { Posts } from './collections/Posts';
import { Pages } from './collections/Pages';
import { Products } from './collections/Products';
import { Services } from './collections/Services';
import { RawContents } from './collections/RawContents';
import { Images } from './collections/Images';
import { Feeds } from './collections/Feeds';
import { ScrapeSources } from './collections/ScrapeSources';
import { AiPrompts } from './collections/AiPrompts';

// Global Configs
import { MainMenu } from './globals/MainMenu';
import { SiteSettings } from './globals/SiteSettings';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- PayloadCMS Backend Otomatis',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Posts,
    Pages,
    Products,
    Services,
    RawContents,
    Images,
    Feeds,
    ScrapeSources,
    AiPrompts,
  ],
  globals: [
    MainMenu,
    SiteSettings,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost/payloadcms-backend-otomatis',
  }),
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
  cors: ['http://localhost:3000', 'http://localhost:4321'],
  csrf: ['http://localhost:3000', 'http://localhost:4321'],
  express: {
    preMiddleware: [
      // Add custom middleware here
    ],
  },
});