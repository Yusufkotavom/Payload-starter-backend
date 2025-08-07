# 🤖 AI & Image Services - Siap Pakai

Service wrapper lengkap untuk AI content generation dan image services dengan versi terbaru.

## 📦 Dependencies Terbaru

```json
{
  "openai": "^4.28.0",
  "@google/generative-ai": "^0.2.1",
  "replicate": "^0.25.1",
  "unsplash-js": "^7.0.19",
  "pixabay-api": "^1.0.4",
  "pexels": "^1.4.0",
  "axios": "^1.6.5"
}
```

## 🤖 AI Service

### Import dan Inisialisasi

```typescript
import { aiService } from './src/services/aiService';

// Service otomatis terinisialisasi dengan environment variables
// OPENAI_API_KEY, GEMINI_API_KEY, REPLICATE_API_TOKEN
```

### Generate Artikel

```typescript
// Generate artikel dengan OpenAI
const article = await aiService.generateArticle({
  topic: 'Teknologi AI',
  title: 'Masa Depan AI di Indonesia',
  tone: 'professional',
  length: 'medium',
  language: 'id',
  includeKeywords: ['AI', 'teknologi', 'Indonesia'],
  excludeKeywords: ['spam', 'clickbait'],
});

if (article.success) {
  console.log('Artikel berhasil dibuat:', article.content);
} else {
  console.error('Error:', article.error);
}
```

### Generate Deskripsi Produk

```typescript
const productDesc = await aiService.generateProductDescription({
  productName: 'Smartphone XYZ',
  category: 'Elektronik',
  features: ['5G', 'Kamera 108MP', 'Baterai 5000mAh'],
  targetAudience: 'Profesional muda',
  tone: 'persuasive',
  length: 'medium',
});

if (productDesc.success) {
  console.log('Deskripsi produk:', productDesc.content);
}
```

### Generate SEO Meta Description

```typescript
const seoDesc = await aiService.generateSEOMetaDescription({
  title: 'Cara Membuat Website dengan Next.js',
  content: 'Artikel lengkap tentang cara membuat website...',
  targetKeywords: ['Next.js', 'website', 'tutorial'],
  metaDescriptionLength: 160,
});

if (seoDesc.success) {
  console.log('Meta description:', seoDesc.content);
}
```

### Generate Social Media Post

```typescript
const socialPost = await aiService.generateSocialMediaPost({
  content: 'Artikel tentang teknologi terbaru',
  platform: 'twitter',
  tone: 'professional',
  includeHashtags: true,
  maxLength: 280,
});

if (socialPost.success) {
  console.log('Social media post:', socialPost.content);
}
```

### Generate AI Image

```typescript
const aiImage = await aiService.generateImage(
  'A beautiful landscape with mountains and lake, digital art style',
  {
    model: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
    width: 1024,
    height: 1024,
    numOutputs: 1,
    guidanceScale: 7.5,
    numInferenceSteps: 50,
  }
);

if (aiImage.success) {
  console.log('AI image URLs:', aiImage.images);
}
```

### Validasi API Keys

```typescript
const apiStatus = await aiService.validateAPIKeys();
console.log('API Status:', apiStatus);
// Output: { openai: true, gemini: true, replicate: true }

const serviceStatus = aiService.getServiceStatus();
console.log('Service Status:', serviceStatus);
// Output: { openai: true, gemini: true, replicate: true }
```

## 🖼️ Image Service

### Import dan Inisialisasi

```typescript
import { imageService } from './src/services/imageService';

// Service otomatis terinisialisasi dengan environment variables
// UNSPLASH_ACCESS_KEY, PIXABAY_API_KEY, PEXELS_API_KEY
```

### Search Images dari Semua Provider

```typescript
// Search dari semua provider sekaligus
const allResults = await imageService.searchAllImages({
  query: 'technology',
  page: 1,
  perPage: 10,
  orientation: 'landscape',
  orderBy: 'popular',
});

console.log('Total images found:', allResults.totalImages);
console.log('Unsplash images:', allResults.results.unsplash.images.length);
console.log('Pixabay images:', allResults.results.pixabay.images.length);
console.log('Pexels images:', allResults.results.pexels.images.length);
```

### Search dari Provider Tertentu

```typescript
// Search dari Unsplash
const unsplashResults = await imageService.searchUnsplashImages({
  query: 'nature',
  page: 1,
  perPage: 20,
  orientation: 'landscape',
  orderBy: 'popular',
});

if (unsplashResults.success) {
  console.log('Unsplash images:', unsplashResults.images);
}

// Search dari Pixabay
const pixabayResults = await imageService.searchPixabayImages({
  query: 'business',
  page: 1,
  perPage: 20,
  orientation: 'portrait',
  orderBy: 'popular',
  category: 'business',
});

if (pixabayResults.success) {
  console.log('Pixabay images:', pixabayResults.images);
}

// Search dari Pexels
const pexelsResults = await imageService.searchPexelsImages({
  query: 'food',
  page: 1,
  perPage: 20,
  orientation: 'squarish',
  color: 'red',
});

if (pexelsResults.success) {
  console.log('Pexels images:', pexelsResults.images);
}
```

### Random Images

```typescript
// Get random images dari Unsplash
const randomImages = await imageService.getRandomUnsplashImages({
  query: 'nature',
  orientation: 'landscape',
  count: 5,
});

if (randomImages.success) {
  console.log('Random images:', randomImages.images);
}
```

### Trending Images

```typescript
// Get trending images dari Unsplash
const trendingImages = await imageService.getTrendingUnsplashImages(10);

if (trendingImages.success) {
  console.log('Trending images:', trendingImages.images);
}
```

### Download Image

```typescript
// Download image dan dapatkan buffer
const downloadResult = await imageService.downloadImage('https://example.com/image.jpg');

if (downloadResult.success) {
  console.log('Image downloaded, size:', downloadResult.buffer?.length);
  // Gunakan buffer untuk upload ke storage atau processing
}
```

### Get Image Metadata

```typescript
// Get metadata image
const metadata = await imageService.getImageMetadata('https://example.com/image.jpg');

if (metadata.success) {
  console.log('Image metadata:', {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    size: metadata.size,
  });
}
```

### Attribution Text

```typescript
// Get attribution text untuk Unsplash
const unsplashAttribution = imageService.getUnsplashAttribution('john_doe', '123456');

// Get attribution text untuk Pixabay
const pixabayAttribution = imageService.getPixabayAttribution('jane_doe', '789012');

// Get attribution text untuk Pexels
const pexelsAttribution = imageService.getPexelsAttribution('photographer', '345678');
```

### Validasi API Keys

```typescript
const apiStatus = await imageService.validateAPIKeys();
console.log('Image API Status:', apiStatus);
// Output: { unsplash: true, pixabay: true, pexels: true }

const serviceStatus = imageService.getServiceStatus();
console.log('Image Service Status:', serviceStatus);
// Output: { unsplash: true, pixabay: true, pexels: true }
```

## 🔧 Environment Variables

### AI Services
```env
# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Google Gemini
GEMINI_API_KEY=your-gemini-api-key

# Replicate (AI Image Generation)
REPLICATE_API_TOKEN=your-replicate-api-token
```

### Image Services
```env
# Unsplash
UNSPLASH_ACCESS_KEY=your-unsplash-access-key

# Pixabay
PIXABAY_API_KEY=your-pixabay-api-key

# Pexels
PEXELS_API_KEY=your-pexels-api-key
```

## 📊 Error Handling

### AI Service Errors
```typescript
const result = await aiService.generateArticle({
  topic: 'Test topic',
});

if (!result.success) {
  console.error('AI generation failed:', result.error);
  console.log('Provider:', result.provider);
  console.log('Model:', result.model);
}
```

### Image Service Errors
```typescript
const result = await imageService.searchUnsplashImages({
  query: 'test',
});

if (!result.success) {
  console.error('Image search failed:', result.error);
  console.log('Provider:', result.provider);
}
```

## 🚀 Integration dengan PayloadCMS

### Di Collection Hooks

```typescript
// src/collections/Posts.ts
import { aiService } from '../services/aiService';
import { imageService } from '../services/imageService';

export const Posts: CollectionConfig = {
  slug: 'posts',
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Auto-generate excerpt jika kosong
        if (!data.excerpt && data.content) {
          const excerptResult = await aiService.generateSEOMetaDescription({
            title: data.title,
            content: data.content,
            metaDescriptionLength: 160,
          });
          
          if (excerptResult.success) {
            data.excerpt = excerptResult.content;
          }
        }

        // Auto-fetch featured image jika kosong
        if (!data.featuredImage && data.title) {
          const imageResult = await imageService.searchAllImages({
            query: data.title,
            perPage: 1,
            orientation: 'landscape',
          });

          if (imageResult.success && imageResult.totalImages > 0) {
            const firstImage = imageResult.results.unsplash.images[0] || 
                             imageResult.results.pixabay.images[0] || 
                             imageResult.results.pexels.images[0];
            
            if (firstImage) {
              data.featuredImage = {
                url: firstImage.url,
                alt: firstImage.alt,
                provider: firstImage.provider,
                providerId: firstImage.providerId,
              };
            }
          }
        }

        return data;
      },
    ],
  },
  // ... rest of collection config
};
```

### Di API Endpoints

```typescript
// src/index.ts
import { aiService } from './services/aiService';
import { imageService } from './services/imageService';

// AI Content Generation Endpoint
app.post('/api/ai/generate', async (req, res) => {
  try {
    const { type, options } = req.body;
    
    let result;
    switch (type) {
      case 'article':
        result = await aiService.generateArticle(options);
        break;
      case 'product':
        result = await aiService.generateProductDescription(options);
        break;
      case 'seo':
        result = await aiService.generateSEOMetaDescription(options);
        break;
      case 'social':
        result = await aiService.generateSocialMediaPost(options);
        break;
      default:
        return res.status(400).json({ error: 'Invalid type' });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Image Search Endpoint
app.get('/api/images/search', async (req, res) => {
  try {
    const { query, provider = 'all', ...options } = req.query;
    
    let result;
    switch (provider) {
      case 'unsplash':
        result = await imageService.searchUnsplashImages({ query, ...options });
        break;
      case 'pixabay':
        result = await imageService.searchPixabayImages({ query, ...options });
        break;
      case 'pexels':
        result = await imageService.searchPexelsImages({ query, ...options });
        break;
      default:
        result = await imageService.searchAllImages({ query, ...options });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## 📈 Performance & Monitoring

### Logging
Semua service menggunakan Winston logger untuk monitoring:

```typescript
import { logger } from '../utils/logger';

// Logs akan otomatis tercatat dengan format:
// - AI generation success/failure
// - Image search results
// - API key validation
// - Error details
```

### Rate Limiting
Service sudah dikonfigurasi dengan:
- Retry mechanism untuk API calls
- Timeout handling
- Error fallback ke provider lain

### Caching (Optional)
Untuk performa lebih baik, bisa ditambahkan Redis caching:

```typescript
// Cache AI results
const cacheKey = `ai:${type}:${JSON.stringify(options)}`;
const cached = await redis.get(cacheKey);
if (cached) {
  return JSON.parse(cached);
}

const result = await aiService.generateArticle(options);
await redis.setex(cacheKey, 3600, JSON.stringify(result)); // Cache 1 hour
```

## 🎯 Best Practices

1. **Error Handling**: Selalu cek `success` property
2. **Fallback**: Gunakan multiple providers untuk reliability
3. **Rate Limiting**: Implement rate limiting untuk API calls
4. **Caching**: Cache hasil untuk performa
5. **Monitoring**: Monitor API usage dan costs
6. **Attribution**: Selalu sertakan attribution untuk images
7. **Validation**: Validate input sebelum API calls

## 📚 Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Gemini API](https://ai.google.dev/)
- [Replicate API](https://replicate.com/docs)
- [Unsplash API](https://unsplash.com/developers)
- [Pixabay API](https://pixabay.com/api/docs/)
- [Pexels API](https://www.pexels.com/api/)

---

**🎉 Services siap pakai dengan versi terbaru dan error handling yang lengkap!**