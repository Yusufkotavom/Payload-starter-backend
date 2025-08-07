#!/bin/bash

# ========================================
# PAYLOADCMS BACKEND OTOMATIS - SETUP SCRIPT
# ========================================

echo "🚀 Setting up PayloadCMS Backend Otomatis..."
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Create necessary directories
echo "📁 Creating project directories..."
mkdir -p src/collections
mkdir -p src/jobs
mkdir -p src/plugins
mkdir -p src/services
mkdir -p jobs
mkdir -p docs
mkdir -p tests
mkdir -p backups
mkdir -p logs

echo "✅ Directories created"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Plugin Wajib
echo "🔧 Installing Plugin Wajib..."
npm install payload-enchants payload-tools

# Install Plugin Rekomendasi
echo "🚀 Installing Plugin Rekomendasi..."
npm install payload-plugin-cloud-storage payload-plugin-seo payload-plugin-cloud payload-plugin-vercel payload-plugin-redis payload-plugin-sentry payload-plugin-slug payload-plugin-richtext-slate payload-plugin-email payload-plugin-webhooks

# Install Plugin UI/UX
echo "🎨 Installing Plugin UI/UX..."
npm install payload-plugin-color-picker payload-plugin-relationship payload-plugin-media-library payload-plugin-tabs

# Install Plugin Development (Development Only)
if [ "$NODE_ENV" != "production" ]; then
    echo "🔧 Installing Plugin Development..."
    npm install --save-dev payload-plugin-debug payload-plugin-testing payload-plugin-migrate
fi

# Install AI & Image Integration
echo "🤖 Installing AI & Image Integration..."
npm install openai @google/generative-ai replicate unsplash-js pixabay-api pexels

# Install Cron Jobs & Scheduling
echo "⏱️ Installing Cron Jobs & Scheduling..."
npm install bree node-cron

# Install RSS & Scraping
echo "📰 Installing RSS & Scraping..."
npm install rss-parser cheerio puppeteer

# Install Database & Cache
echo "💾 Installing Database & Cache..."
npm install redis mongodb

# Install Utilities
echo "🛠️ Installing Utilities..."
npm install axios lodash moment slugify sharp multer

# Install Email & Notifications
echo "📧 Installing Email & Notifications..."
npm install nodemailer twilio

# Install Monitoring & Logging
echo "📊 Installing Monitoring & Logging..."
npm install @sentry/node winston morgan

# Install Development Dependencies
echo "🔧 Installing Development Dependencies..."
npm install --save-dev @types/node @types/express @types/lodash @types/moment @types/multer @types/nodemailer @types/morgan @types/node-cron @types/jest typescript ts-node nodemon eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser jest ts-jest supertest @types/supertest

# Setup environment file
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created from .env.example"
    echo "⚠️  Please edit .env file with your configuration"
else
    echo "✅ .env file already exists"
fi

# Create TypeScript config
if [ ! -f tsconfig.json ]; then
    echo "📝 Creating tsconfig.json..."
    cat > tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
    echo "✅ tsconfig.json created"
fi

# Create ESLint config
if [ ! -f .eslintrc.js ]; then
    echo "📝 Creating .eslintrc.js..."
    cat > .eslintrc.js << EOF
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
EOF
    echo "✅ .eslintrc.js created"
fi

# Create Jest config
if [ ! -f jest.config.js ]; then
    echo "📝 Creating jest.config.js..."
    cat > jest.config.js << EOF
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
EOF
    echo "✅ jest.config.js created"
fi

# Create Bree config
if [ ! -f bree.config.js ]; then
    echo "📝 Creating bree.config.js..."
    cat > bree.config.js << EOF
module.exports = {
  defaultJobLimit: 0,
  defaultJobConcurrency: 0,
  closeWorkerAfterMs: 500,
  disableDeprecationWarnings: false,
  jobsDirectory: 'jobs',
  workers: {
    workerMessageHandler: (message, workerId, jobName) => {
      console.log(\`Worker \${workerId} sent message for job \${jobName}:\`, message);
    },
  },
};
EOF
    echo "✅ bree.config.js created"
fi

# Create .gitignore
if [ ! -f .gitignore ]; then
    echo "📝 Creating .gitignore..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
.next/
out/

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# PayloadCMS specific
payload-types.ts
generated-schema.graphql

# Backup files
backups/
*.backup

# Test files
test-results/
playwright-report/
test-results.xml
EOF
    echo "✅ .gitignore created"
fi

# Create initial job files
echo "📝 Creating initial job files..."

# RSS Fetcher Job
cat > jobs/rssFetcher.ts << EOF
import { payload } from 'payload';

export default async function rssFetcher() {
  try {
    console.log('🔄 Starting RSS feed fetcher...');
    
    // Get active feeds
    const feeds = await payload.find({
      collection: 'feeds',
      where: {
        active: {
          equals: true,
        },
      },
    });

    console.log(\`📰 Found \${feeds.docs.length} active feeds\`);

    for (const feed of feeds.docs) {
      try {
        // Fetch RSS feed content
        const response = await fetch(feed.url);
        const xml = await response.text();
        
        // Parse RSS and save to rawContents
        // Implementation depends on your RSS parser
        
        console.log(\`✅ Processed feed: \${feed.title}\`);
      } catch (error) {
        console.error(\`❌ Error processing feed \${feed.title}:\`, error);
      }
    }
    
    console.log('✅ RSS fetcher completed');
  } catch (error) {
    console.error('❌ RSS fetcher error:', error);
  }
}
EOF

# AI Content Generator Job
cat > jobs/aiContentGenerator.ts << EOF
import { payload } from 'payload';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function aiContentGenerator() {
  try {
    console.log('🤖 Starting AI content generator...');
    
    // Get active AI prompts
    const prompts = await payload.find({
      collection: 'aiPrompts',
      where: {
        active: {
          equals: true,
        },
      },
    });

    console.log(\`🧠 Found \${prompts.docs.length} active prompts\`);

    for (const prompt of prompts.docs) {
      try {
        // Generate content using AI
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt.prompt }],
          max_tokens: 1000,
        });

        const generatedContent = completion.choices[0]?.message?.content;

        if (generatedContent) {
          // Save to rawContents
          await payload.create({
            collection: 'rawContents',
            data: {
              title: \`AI Generated: \${prompt.title}\`,
              content: generatedContent,
              source: 'AI',
              aiProvider: 'openai',
              status: 'draft',
              reviewed: false,
              autoGenerated: true,
              createdByAI: true,
            },
          });
          
          console.log(\`✅ Generated content for prompt: \${prompt.title}\`);
        }
      } catch (error) {
        console.error(\`❌ Error generating content for prompt \${prompt.title}:\`, error);
      }
    }
    
    console.log('✅ AI content generator completed');
  } catch (error) {
    console.error('❌ AI content generator error:', error);
  }
}
EOF

# Publish Scheduler Job
cat > jobs/publishScheduler.ts << EOF
import { payload } from 'payload';

export default async function publishScheduler() {
  try {
    console.log('📤 Starting publish scheduler...');
    
    // Get reviewed raw contents
    const rawContents = await payload.find({
      collection: 'rawContents',
      where: {
        and: [
          {
            reviewed: {
              equals: true,
            },
          },
          {
            status: {
              equals: 'draft',
            },
          },
        ],
      },
      limit: 5, // Max 5 per day
    });

    console.log(\`📝 Found \${rawContents.docs.length} reviewed contents to publish\`);

    for (const content of rawContents.docs) {
      try {
        // Promote to posts collection
        await payload.create({
          collection: 'posts',
          data: {
            title: content.title,
            content: content.content,
            status: 'published',
            publishedAt: new Date().toISOString(),
            // Add other fields as needed
          },
        });
        
        // Update raw content status
        await payload.update({
          collection: 'rawContents',
          id: content.id,
          data: {
            status: 'published',
          },
        });
        
        console.log(\`✅ Published content: \${content.title}\`);
      } catch (error) {
        console.error(\`❌ Error publishing content \${content.title}:\`, error);
      }
    }
    
    console.log('✅ Publish scheduler completed');
  } catch (error) {
    console.error('❌ Publish scheduler error:', error);
  }
}
EOF

echo "✅ Job files created"

# Set executable permissions
chmod +x scripts/setup.sh

echo ""
echo "🎉 Setup completed successfully!"
echo "=============================================="
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Run 'npm run dev' to start development server"
echo "3. Access admin panel at http://localhost:3000/admin"
echo ""
echo "📚 Documentation:"
echo "- README.md - Quick start guide"
echo "- PAYLOADCMS_BACKEND_DOKUMENTASI.md - Complete documentation"
echo ""
echo "🔧 Available commands:"
echo "- npm run dev - Start development server"
echo "- npm run build - Build for production"
echo "- npm run serve - Start production server"
echo "- npm test - Run tests"
echo "- npm run lint - Run linter"
echo ""
echo "🚀 Happy coding!"