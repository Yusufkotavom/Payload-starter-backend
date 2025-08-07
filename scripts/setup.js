const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up PayloadCMS Backend Otomatis for Windows...');
console.log('====================================================');

// Check if Node.js is installed
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
  
  // Check Node.js version
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion < 18) {
    console.error('❌ Node.js version 18+ is required. Please upgrade Node.js.');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js 18+ first.');
  process.exit(1);
}

// Check if npm is installed
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm version: ${npmVersion}`);
} catch (error) {
  console.error('❌ npm is not installed. Please install npm first.');
  process.exit(1);
}

// Create necessary directories
const directories = [
  'src/collections',
  'src/jobs',
  'src/plugins',
  'src/services',
  'src/utils',
  'src/types',
  'src/middleware',
  'jobs',
  'tests/unit',
  'tests/integration',
  'tests/fixtures',
  'backups',
  'logs',
  'migrations',
  'config',
  'public/images',
  'public/icons',
  'public/media'
];

console.log('📁 Creating project directories...');
directories.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${dir}`);
  } else {
    console.log(`⏭️  Already exists: ${dir}`);
  }
});

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Install Plugin Wajib
console.log('🔧 Installing Plugin Wajib...');
try {
  execSync('npm install payload-enchants payload-tools', { stdio: 'inherit' });
  console.log('✅ Plugin wajib installed');
} catch (error) {
  console.error('❌ Failed to install plugin wajib:', error.message);
}

// Install Plugin Rekomendasi
console.log('🚀 Installing Plugin Rekomendasi...');
try {
  execSync('npm install payload-plugin-cloud-storage payload-plugin-seo payload-plugin-cloud payload-plugin-vercel payload-plugin-redis payload-plugin-sentry payload-plugin-slug payload-plugin-richtext-slate payload-plugin-email payload-plugin-webhooks', { stdio: 'inherit' });
  console.log('✅ Plugin rekomendasi installed');
} catch (error) {
  console.error('❌ Failed to install plugin rekomendasi:', error.message);
}

// Install Plugin UI/UX
console.log('🎨 Installing Plugin UI/UX...');
try {
  execSync('npm install payload-plugin-color-picker payload-plugin-relationship payload-plugin-media-library payload-plugin-tabs', { stdio: 'inherit' });
  console.log('✅ Plugin UI/UX installed');
} catch (error) {
  console.error('❌ Failed to install plugin UI/UX:', error.message);
}

// Install Plugin Development
if (process.env.NODE_ENV !== 'production') {
  console.log('🔧 Installing Plugin Development...');
  try {
    execSync('npm install --save-dev payload-plugin-debug payload-plugin-testing payload-plugin-migrate', { stdio: 'inherit' });
    console.log('✅ Plugin development installed');
  } catch (error) {
    console.error('❌ Failed to install plugin development:', error.message);
  }
}

// Install AI & Image Integration
console.log('🤖 Installing AI & Image Integration...');
try {
  execSync('npm install openai @google/generative-ai replicate unsplash-js pixabay-api pexels', { stdio: 'inherit' });
  console.log('✅ AI & Image integration installed');
} catch (error) {
  console.error('❌ Failed to install AI & Image integration:', error.message);
}

// Install Cron Jobs & Scheduling
console.log('⏱️ Installing Cron Jobs & Scheduling...');
try {
  execSync('npm install bree node-cron', { stdio: 'inherit' });
  console.log('✅ Cron jobs installed');
} catch (error) {
  console.error('❌ Failed to install cron jobs:', error.message);
}

// Install RSS & Scraping
console.log('📰 Installing RSS & Scraping...');
try {
  execSync('npm install rss-parser cheerio puppeteer', { stdio: 'inherit' });
  console.log('✅ RSS & Scraping installed');
} catch (error) {
  console.error('❌ Failed to install RSS & Scraping:', error.message);
}

// Install Database & Cache
console.log('💾 Installing Database & Cache...');
try {
  execSync('npm install redis mongodb', { stdio: 'inherit' });
  console.log('✅ Database & Cache installed');
} catch (error) {
  console.error('❌ Failed to install Database & Cache:', error.message);
}

// Install Utilities
console.log('🛠️ Installing Utilities...');
try {
  execSync('npm install axios lodash moment slugify sharp multer cross-env', { stdio: 'inherit' });
  console.log('✅ Utilities installed');
} catch (error) {
  console.error('❌ Failed to install Utilities:', error.message);
}

// Install Email & Notifications
console.log('📧 Installing Email & Notifications...');
try {
  execSync('npm install nodemailer twilio', { stdio: 'inherit' });
  console.log('✅ Email & Notifications installed');
} catch (error) {
  console.error('❌ Failed to install Email & Notifications:', error.message);
}

// Install Monitoring & Logging
console.log('📊 Installing Monitoring & Logging...');
try {
  execSync('npm install @sentry/node winston morgan', { stdio: 'inherit' });
  console.log('✅ Monitoring & Logging installed');
} catch (error) {
  console.error('❌ Failed to install Monitoring & Logging:', error.message);
}

// Install Development Dependencies
console.log('🔧 Installing Development Dependencies...');
try {
  execSync('npm install --save-dev @types/node @types/express @types/lodash @types/moment @types/multer @types/nodemailer @types/morgan @types/node-cron @types/jest typescript ts-node nodemon eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser jest ts-jest supertest @types/supertest concurrently', { stdio: 'inherit' });
  console.log('✅ Development Dependencies installed');
} catch (error) {
  console.error('❌ Failed to install Development Dependencies:', error.message);
}

// Setup environment file
const envExamplePath = path.join(process.cwd(), '.env.example');
const envPath = path.join(process.cwd(), '.env');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('📝 Creating .env file...');
  try {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created from .env.example');
    console.log('⚠️  Please edit .env file with your configuration');
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
  }
} else {
  console.log('✅ .env file already exists');
}

// Create TypeScript config
const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
if (!fs.existsSync(tsconfigPath)) {
  console.log('📝 Creating tsconfig.json...');
  const tsconfig = {
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
  };
  
  try {
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    console.log('✅ tsconfig.json created');
  } catch (error) {
    console.error('❌ Failed to create tsconfig.json:', error.message);
  }
}

// Create ESLint config
const eslintPath = path.join(process.cwd(), '.eslintrc.js');
if (!fs.existsSync(eslintPath)) {
  console.log('📝 Creating .eslintrc.js...');
  const eslintConfig = `module.exports = {
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
};`;
  
  try {
    fs.writeFileSync(eslintPath, eslintConfig);
    console.log('✅ .eslintrc.js created');
  } catch (error) {
    console.error('❌ Failed to create .eslintrc.js:', error.message);
  }
}

// Create Jest config
const jestPath = path.join(process.cwd(), 'jest.config.js');
if (!fs.existsSync(jestPath)) {
  console.log('📝 Creating jest.config.js...');
  const jestConfig = `module.exports = {
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
};`;
  
  try {
    fs.writeFileSync(jestPath, jestConfig);
    console.log('✅ jest.config.js created');
  } catch (error) {
    console.error('❌ Failed to create jest.config.js:', error.message);
  }
}

// Create Bree config
const breePath = path.join(process.cwd(), 'bree.config.js');
if (!fs.existsSync(breePath)) {
  console.log('📝 Creating bree.config.js...');
  const breeConfig = `module.exports = {
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
};`;
  
  try {
    fs.writeFileSync(breePath, breeConfig);
    console.log('✅ bree.config.js created');
  } catch (error) {
    console.error('❌ Failed to create bree.config.js:', error.message);
  }
}

// Create .gitignore
const gitignorePath = path.join(process.cwd(), '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  console.log('📝 Creating .gitignore...');
  const gitignore = `# Dependencies
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

# Windows specific
*.tmp
*.temp
desktop.ini`;
  
  try {
    fs.writeFileSync(gitignorePath, gitignore);
    console.log('✅ .gitignore created');
  } catch (error) {
    console.error('❌ Failed to create .gitignore:', error.message);
  }
}

console.log('');
console.log('🎉 Setup completed successfully!');
console.log('====================================================');
console.log('');
console.log('📋 Next steps:');
console.log('1. Edit .env file with your configuration');
console.log('2. Run "npm run dev" to start development server');
console.log('3. Access admin panel at http://localhost:3000/admin');
console.log('');
console.log('📚 Documentation:');
console.log('- README.md - Quick start guide');
console.log('- PAYLOADCMS_BACKEND_DOKUMENTASI.md - Complete documentation');
console.log('');
console.log('🔧 Available commands:');
console.log('- npm run dev - Start development server');
console.log('- npm run build - Build for production');
console.log('- npm run serve - Start production server');
console.log('- npm test - Run tests');
console.log('- npm run lint - Run linter');
console.log('');
console.log('🚀 Happy coding!');