const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up PayloadCMS Backend Otomatis v2.32.3...');
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

// Install dependencies step by step
console.log('📦 Installing dependencies...');

// First, install core dependencies
try {
  console.log('📦 Installing core dependencies...');
  execSync('npm install payload@^2.32.3 express mongoose dotenv', { stdio: 'inherit' });
  console.log('✅ Core dependencies installed');
} catch (error) {
  console.error('❌ Failed to install core dependencies:', error.message);
  process.exit(1);
}

// Install utilities
try {
  console.log('🛠️ Installing utilities...');
  execSync('npm install axios lodash moment slugify sharp multer cross-env', { stdio: 'inherit' });
  console.log('✅ Utilities installed');
} catch (error) {
  console.error('❌ Failed to install utilities:', error.message);
}

// Install AI & Image services
try {
  console.log('🤖 Installing AI & Image services...');
  execSync('npm install openai @google/generative-ai replicate unsplash-js pixabay-api pexels', { stdio: 'inherit' });
  console.log('✅ AI & Image services installed');
} catch (error) {
  console.error('❌ Failed to install AI & Image services:', error.message);
}

// Install cron jobs
try {
  console.log('⏱️ Installing cron jobs...');
  execSync('npm install bree node-cron', { stdio: 'inherit' });
  console.log('✅ Cron jobs installed');
} catch (error) {
  console.error('❌ Failed to install cron jobs:', error.message);
}

// Install RSS & scraping
try {
  console.log('📰 Installing RSS & scraping...');
  execSync('npm install rss-parser cheerio puppeteer', { stdio: 'inherit' });
  console.log('✅ RSS & scraping installed');
} catch (error) {
  console.error('❌ Failed to install RSS & scraping:', error.message);
}

// Install database & cache
try {
  console.log('💾 Installing database & cache...');
  execSync('npm install redis mongodb', { stdio: 'inherit' });
  console.log('✅ Database & cache installed');
} catch (error) {
  console.error('❌ Failed to install database & cache:', error.message);
}

// Install email & notifications
try {
  console.log('📧 Installing email & notifications...');
  execSync('npm install nodemailer twilio', { stdio: 'inherit' });
  console.log('✅ Email & notifications installed');
} catch (error) {
  console.error('❌ Failed to install email & notifications:', error.message);
}

// Install monitoring & logging
try {
  console.log('📊 Installing monitoring & logging...');
  execSync('npm install @sentry/node winston morgan', { stdio: 'inherit' });
  console.log('✅ Monitoring & logging installed');
} catch (error) {
  console.error('❌ Failed to install monitoring & logging:', error.message);
}

// Install PayloadCMS plugins (optional - skip if errors)
try {
  console.log('🔌 Installing PayloadCMS plugins...');
  execSync('npm install payload-enchants payload-tools', { stdio: 'inherit' });
  console.log('✅ PayloadCMS plugins installed');
} catch (error) {
  console.warn('⚠️  Some PayloadCMS plugins failed to install (this is normal if plugins are not available)');
}

// Install development dependencies
try {
  console.log('🔧 Installing development dependencies...');
  execSync('npm install --save-dev @types/node @types/express @types/lodash @types/moment @types/multer @types/nodemailer @types/morgan @types/node-cron @types/jest typescript ts-node nodemon eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser jest ts-jest supertest @types/supertest concurrently mongodb-memory-server', { stdio: 'inherit' });
  console.log('✅ Development dependencies installed');
} catch (error) {
  console.error('❌ Failed to install development dependencies:', error.message);
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
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": ["**/*.ts", "**/*.tsx"],
    "exclude": ["node_modules", "dist"]
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
    '@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  env: {
    node: true,
    es6: true,
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