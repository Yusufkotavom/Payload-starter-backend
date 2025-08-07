const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up PayloadCMS Backend Otomatis v2.32.3 (Updated Dependencies)...');
console.log('================================================================');

// Check Node.js version
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
  
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion < 18) {
    console.error('❌ Node.js version 18+ is required. Please upgrade Node.js.');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js 18+ first.');
  process.exit(1);
}

// Create basic directories
const directories = [
  'src/collections',
  'src/globals',
  'src/services',
  'src/utils',
  'src/types',
  'src/middleware',
  'jobs',
  'tests',
  'public/media',
  'logs'
];

console.log('📁 Creating directories...');
directories.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${dir}`);
  } else {
    console.log(`⏭️  Already exists: ${dir}`);
  }
});

// Install core PayloadCMS dependencies
console.log('📦 Installing core PayloadCMS dependencies...');
try {
  execSync('npm install payload@^2.32.3 express mongoose dotenv cross-env', { stdio: 'inherit' });
  console.log('✅ Core PayloadCMS dependencies installed');
} catch (error) {
  console.error('❌ Failed to install core dependencies:', error.message);
  process.exit(1);
}

// Install PayloadCMS adapters and bundlers
console.log('🔧 Installing PayloadCMS adapters...');
try {
  execSync('npm install @payloadcms/bundler-webpack @payloadcms/db-mongodb @payloadcms/richtext-slate', { stdio: 'inherit' });
  console.log('✅ PayloadCMS adapters installed');
} catch (error) {
  console.warn('⚠️  PayloadCMS adapters failed to install (continuing...)');
}

// Install essential utilities
console.log('🛠️ Installing essential utilities...');
try {
  execSync('npm install axios lodash moment slugify sharp multer', { stdio: 'inherit' });
  console.log('✅ Utilities installed');
} catch (error) {
  console.warn('⚠️  Some utilities failed to install (continuing...)');
}

// Install AI services (optional)
console.log('🤖 Installing AI services...');
try {
  execSync('npm install openai @google/generative-ai replicate', { stdio: 'inherit' });
  console.log('✅ AI services installed');
} catch (error) {
  console.warn('⚠️  AI services failed to install (continuing...)');
}

// Install image services (optional)
console.log('🖼️ Installing image services...');
try {
  execSync('npm install unsplash-js pixabay-api pexels', { stdio: 'inherit' });
  console.log('✅ Image services installed');
} catch (error) {
  console.warn('⚠️  Image services failed to install (continuing...)');
}

// Install cron jobs (optional)
console.log('⏱️ Installing cron jobs...');
try {
  execSync('npm install bree node-cron rss-parser cheerio puppeteer', { stdio: 'inherit' });
  console.log('✅ Cron jobs installed');
} catch (error) {
  console.warn('⚠️  Cron jobs failed to install (continuing...)');
}

// Install database and cache (optional)
console.log('🗄️ Installing database and cache...');
try {
  execSync('npm install redis mongodb', { stdio: 'inherit' });
  console.log('✅ Database and cache installed');
} catch (error) {
  console.warn('⚠️  Database and cache failed to install (continuing...)');
}

// Install monitoring and logging (optional)
console.log('📊 Installing monitoring and logging...');
try {
  execSync('npm install @sentry/node winston morgan', { stdio: 'inherit' });
  console.log('✅ Monitoring and logging installed');
} catch (error) {
  console.warn('⚠️  Monitoring and logging failed to install (continuing...)');
}

// Install development dependencies
console.log('🔧 Installing development dependencies...');
try {
  execSync('npm install --save-dev typescript ts-node nodemon @types/node', { stdio: 'inherit' });
  console.log('✅ Development dependencies installed');
} catch (error) {
  console.warn('⚠️  Development dependencies failed to install (continuing...)');
}

// Install testing dependencies (optional)
console.log('🧪 Installing testing dependencies...');
try {
  execSync('npm install --save-dev jest ts-jest supertest @types/jest @types/supertest', { stdio: 'inherit' });
  console.log('✅ Testing dependencies installed');
} catch (error) {
  console.warn('⚠️  Testing dependencies failed to install (continuing...)');
}

// Install linting dependencies (optional)
console.log('🔍 Installing linting dependencies...');
try {
  execSync('npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser', { stdio: 'inherit' });
  console.log('✅ Linting dependencies installed');
} catch (error) {
  console.warn('⚠️  Linting dependencies failed to install (continuing...)');
}

// Create .env file
const envExamplePath = path.join(process.cwd(), '.env.example');
const envPath = path.join(process.cwd(), '.env');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('📝 Creating .env file...');
  try {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created from .env.example');
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
  }
} else {
  console.log('✅ .env file already exists');
}

// Create basic tsconfig.json
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
      "isolatedModules": true,
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

// Create basic .gitignore
const gitignorePath = path.join(process.cwd(), '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  console.log('📝 Creating .gitignore...');
  const gitignore = `# Dependencies
node_modules/

# Environment variables
.env
.env.local
.env.production

# Build outputs
dist/
build/

# Logs
logs/
*.log

# OS files
.DS_Store
Thumbs.db

# PayloadCMS
payload-types.ts
generated-schema.graphql

# Coverage
coverage/`;
  
  try {
    fs.writeFileSync(gitignorePath, gitignore);
    console.log('✅ .gitignore created');
  } catch (error) {
    console.error('❌ Failed to create .gitignore:', error.message);
  }
}

console.log('');
console.log('🎉 Updated setup completed!');
console.log('====================================================');
console.log('');
console.log('📋 Next steps:');
console.log('1. Edit .env file with your configuration');
console.log('2. Run "npm run dev" to start development server');
console.log('3. Access admin panel at http://localhost:3000/admin');
console.log('');
console.log('🔧 Available commands:');
console.log('- npm run dev - Start development server');
console.log('- npm run build - Build for production');
console.log('- npm run serve - Start production server');
console.log('');
console.log('🚀 Happy coding!');