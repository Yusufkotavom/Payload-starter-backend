const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Astro Frontend untuk PayloadCMS Backend Otomatis...');
console.log('==============================================================');

// Check if Node.js is installed
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
  'src/components',
  'src/layouts',
  'src/pages',
  'src/pages/posts',
  'src/pages/products',
  'src/pages/services',
  'src/lib',
  'src/types',
  'src/utils',
  'public',
  'public/images',
  'public/icons',
  'public/fonts'
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

// Create public assets
console.log('🎨 Creating public assets...');

// Create favicon.svg
const faviconPath = path.join(process.cwd(), 'public/favicon.svg');
if (!fs.existsSync(faviconPath)) {
  const faviconContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
  <circle cx="8.5" cy="8.5" r="1.5"/>
  <polyline points="21,15 16,10 5,21"/>
</svg>`;
  fs.writeFileSync(faviconPath, faviconContent);
  console.log('✅ Created: public/favicon.svg');
}

// Create robots.txt
const robotsPath = path.join(process.cwd(), 'public/robots.txt');
if (!fs.existsSync(robotsPath)) {
  const robotsContent = `User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml`;
  fs.writeFileSync(robotsPath, robotsContent);
  console.log('✅ Created: public/robots.txt');
}

// Create sitemap.xml
const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/posts</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/products</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/services</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log('✅ Created: public/sitemap.xml');
}

// Create .gitignore
const gitignorePath = path.join(process.cwd(), '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  console.log('📝 Creating .gitignore...');
  const gitignore = `# build output
dist/
.output/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# runtime data
pids
*.pid
*.seed
*.pid.lock

# coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

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

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out
storybook-static

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

# Astro
.astro

# Local env files
.env*.local`;
  fs.writeFileSync(gitignorePath, gitignore);
  console.log('✅ .gitignore created');
}

console.log('');
console.log('🎉 Astro Frontend setup completed successfully!');
console.log('================================================');
console.log('');
console.log('📋 Next steps:');
console.log('1. Edit .env file with your backend URL');
console.log('2. Run "npm run dev" to start development server');
console.log('3. Access frontend at http://localhost:4321');
console.log('4. Make sure PayloadCMS backend is running at http://localhost:3000');
console.log('');
console.log('🔧 Available commands:');
console.log('- npm run dev - Start development server');
console.log('- npm run build - Build for production');
console.log('- npm run preview - Preview production build');
console.log('- npm run lint - Run linter');
console.log('- npm run typecheck - TypeScript type checking');
console.log('');
console.log('🚀 Happy coding dengan Astro + PayloadCMS!');