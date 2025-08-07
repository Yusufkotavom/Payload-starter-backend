import { createApi } from 'unsplash-js';
import PixabayApi from 'pixabay-api';
import { createClient } from 'pexels';
import axios from 'axios';
import { logger } from '../utils/logger';

// Types
export interface ImageSearchOptions {
  query: string;
  page?: number;
  perPage?: number;
  orientation?: 'landscape' | 'portrait' | 'squarish';
  orderBy?: 'latest' | 'oldest' | 'popular' | 'views' | 'downloads' | 'featured';
  color?: string;
  minWidth?: number;
  minHeight?: number;
  category?: string;
  language?: string;
}

export interface ImageResult {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  provider: 'unsplash' | 'pixabay' | 'pexels';
  providerId: string;
  photographer?: string;
  downloadUrl?: string;
  thumbnailUrl?: string;
  tags?: string[];
  description?: string;
  createdAt?: string;
  likes?: number;
  downloads?: number;
}

export interface ImageSearchResult {
  success: boolean;
  images: ImageResult[];
  total: number;
  page: number;
  perPage: number;
  provider: 'unsplash' | 'pixabay' | 'pexels';
  error?: string;
}

export interface RandomImageOptions {
  query?: string;
  orientation?: 'landscape' | 'portrait' | 'squarish';
  count?: number;
  category?: string;
}

export class ImageService {
  private unsplash: any;
  private pixabay: any;
  private pexels: any;

  constructor() {
    // Initialize Unsplash
    if (process.env.UNSPLASH_ACCESS_KEY) {
      this.unsplash = createApi({
        accessKey: process.env.UNSPLASH_ACCESS_KEY,
        headers: {
          'Accept-Version': 'v1',
        },
      });
    }

    // Initialize Pixabay
    if (process.env.PIXABAY_API_KEY) {
      this.pixabay = new PixabayApi(process.env.PIXABAY_API_KEY);
    }

    // Initialize Pexels
    if (process.env.PEXELS_API_KEY) {
      this.pexels = createClient(process.env.PEXELS_API_KEY);
    }
  }

  /**
   * Search images from Unsplash
   */
  async searchUnsplashImages(options: ImageSearchOptions): Promise<ImageSearchResult> {
    try {
      if (!this.unsplash) {
        throw new Error('Unsplash API key not configured');
      }

      const {
        query,
        page = 1,
        perPage = 20,
        orientation,
        orderBy = 'relevant',
      } = options;

      const response = await this.unsplash.search.getPhotos({
        query,
        page,
        perPage,
        orientation,
        orderBy,
      });

      const images: ImageResult[] = response.response?.results?.map((photo: any) => ({
        id: photo.id,
        url: photo.urls.regular,
        alt: photo.alt_description || query,
        width: photo.width,
        height: photo.height,
        provider: 'unsplash',
        providerId: photo.id,
        photographer: photo.user?.name,
        downloadUrl: photo.links.download,
        thumbnailUrl: photo.urls.thumb,
        tags: photo.tags?.map((tag: any) => tag.title),
        description: photo.description,
        createdAt: photo.created_at,
        likes: photo.likes,
        downloads: photo.downloads,
      })) || [];

      logger.info('Unsplash images searched successfully', {
        query,
        count: images.length,
        total: response.response?.total,
      });

      return {
        success: true,
        images,
        total: response.response?.total || 0,
        page,
        perPage,
        provider: 'unsplash',
      };
    } catch (error) {
      logger.error('Unsplash search failed', { error: error.message, query: options.query });
      return {
        success: false,
        images: [],
        total: 0,
        page: options.page || 1,
        perPage: options.perPage || 20,
        provider: 'unsplash',
        error: error.message,
      };
    }
  }

  /**
   * Search images from Pixabay
   */
  async searchPixabayImages(options: ImageSearchOptions): Promise<ImageSearchResult> {
    try {
      if (!this.pixabay) {
        throw new Error('Pixabay API key not configured');
      }

      const {
        query,
        page = 1,
        perPage = 20,
        orientation,
        orderBy = 'popular',
        category,
        minWidth,
        minHeight,
        color,
      } = options;

      const response = await this.pixabay.searchImages({
        q: query,
        page,
        per_page: perPage,
        orientation,
        order: orderBy,
        category,
        min_width: minWidth,
        min_height: minHeight,
        colors: color,
        lang: 'en',
        safesearch: true,
      });

      const images: ImageResult[] = response.hits?.map((hit: any) => ({
        id: hit.id.toString(),
        url: hit.webformatURL,
        alt: query,
        width: hit.webformatWidth,
        height: hit.webformatHeight,
        provider: 'pixabay',
        providerId: hit.id.toString(),
        photographer: hit.user,
        downloadUrl: hit.largeImageURL,
        thumbnailUrl: hit.previewURL,
        tags: hit.tags?.split(', '),
        description: hit.tags,
        createdAt: new Date(hit.created_at).toISOString(),
        likes: hit.likes,
        downloads: hit.downloads,
      })) || [];

      logger.info('Pixabay images searched successfully', {
        query,
        count: images.length,
        total: response.totalHits,
      });

      return {
        success: true,
        images,
        total: response.totalHits || 0,
        page,
        perPage,
        provider: 'pixabay',
      };
    } catch (error) {
      logger.error('Pixabay search failed', { error: error.message, query: options.query });
      return {
        success: false,
        images: [],
        total: 0,
        page: options.page || 1,
        perPage: options.perPage || 20,
        provider: 'pixabay',
        error: error.message,
      };
    }
  }

  /**
   * Search images from Pexels
   */
  async searchPexelsImages(options: ImageSearchOptions): Promise<ImageSearchResult> {
    try {
      if (!this.pexels) {
        throw new Error('Pexels API key not configured');
      }

      const {
        query,
        page = 1,
        perPage = 20,
        orientation,
        color,
        minWidth,
        minHeight,
      } = options;

      const response = await this.pexels.photos.search({
        query,
        page,
        per_page: perPage,
        orientation,
        color,
        min_width: minWidth,
        min_height: minHeight,
      });

      const images: ImageResult[] = response.photos?.map((photo: any) => ({
        id: photo.id.toString(),
        url: photo.src.medium,
        alt: query,
        width: photo.width,
        height: photo.height,
        provider: 'pexels',
        providerId: photo.id.toString(),
        photographer: photo.photographer,
        downloadUrl: photo.src.large2x,
        thumbnailUrl: photo.src.small,
        tags: photo.alt?.split(' '),
        description: photo.alt,
        createdAt: new Date().toISOString(), // Pexels doesn't provide creation date
        likes: 0, // Pexels doesn't provide likes count
        downloads: 0, // Pexels doesn't provide downloads count
      })) || [];

      logger.info('Pexels images searched successfully', {
        query,
        count: images.length,
        total: response.total_results,
      });

      return {
        success: true,
        images,
        total: response.total_results || 0,
        page,
        perPage,
        provider: 'pexels',
      };
    } catch (error) {
      logger.error('Pexels search failed', { error: error.message, query: options.query });
      return {
        success: false,
        images: [],
        total: 0,
        page: options.page || 1,
        perPage: options.perPage || 20,
        provider: 'pexels',
        error: error.message,
      };
    }
  }

  /**
   * Search images from all providers
   */
  async searchAllImages(options: ImageSearchOptions): Promise<{
    success: boolean;
    results: {
      unsplash: ImageSearchResult;
      pixabay: ImageSearchResult;
      pexels: ImageSearchResult;
    };
    totalImages: number;
  }> {
    const [unsplashResult, pixabayResult, pexelsResult] = await Promise.allSettled([
      this.searchUnsplashImages(options),
      this.searchPixabayImages(options),
      this.searchPexelsImages(options),
    ]);

    const results = {
      unsplash: unsplashResult.status === 'fulfilled' ? unsplashResult.value : {
        success: false,
        images: [],
        total: 0,
        page: options.page || 1,
        perPage: options.perPage || 20,
        provider: 'unsplash',
        error: 'Service unavailable',
      },
      pixabay: pixabayResult.status === 'fulfilled' ? pixabayResult.value : {
        success: false,
        images: [],
        total: 0,
        page: options.page || 1,
        perPage: options.perPage || 20,
        provider: 'pixabay',
        error: 'Service unavailable',
      },
      pexels: pexelsResult.status === 'fulfilled' ? pexelsResult.value : {
        success: false,
        images: [],
        total: 0,
        page: options.page || 1,
        perPage: options.perPage || 20,
        provider: 'pexels',
        error: 'Service unavailable',
      },
    };

    const totalImages = results.unsplash.images.length + results.pixabay.images.length + results.pexels.images.length;

    logger.info('Multi-provider image search completed', {
      query: options.query,
      totalImages,
      unsplashCount: results.unsplash.images.length,
      pixabayCount: results.pixabay.images.length,
      pexelsCount: results.pexels.images.length,
    });

    return {
      success: totalImages > 0,
      results,
      totalImages,
    };
  }

  /**
   * Get random images from Unsplash
   */
  async getRandomUnsplashImages(options: RandomImageOptions = {}): Promise<ImageSearchResult> {
    try {
      if (!this.unsplash) {
        throw new Error('Unsplash API key not configured');
      }

      const { query, orientation, count = 10 } = options;

      const response = await this.unsplash.photos.getRandom({
        query,
        orientation,
        count,
      });

      const images: ImageResult[] = (Array.isArray(response.response) ? response.response : [response.response])
        .filter((photo: any) => photo)
        .map((photo: any) => ({
          id: photo.id,
          url: photo.urls.regular,
          alt: photo.alt_description || query || 'Random image',
          width: photo.width,
          height: photo.height,
          provider: 'unsplash',
          providerId: photo.id,
          photographer: photo.user?.name,
          downloadUrl: photo.links.download,
          thumbnailUrl: photo.urls.thumb,
          tags: photo.tags?.map((tag: any) => tag.title),
          description: photo.description,
          createdAt: photo.created_at,
          likes: photo.likes,
          downloads: photo.downloads,
        }));

      logger.info('Random Unsplash images fetched successfully', {
        count: images.length,
        query,
      });

      return {
        success: true,
        images,
        total: images.length,
        page: 1,
        perPage: count,
        provider: 'unsplash',
      };
    } catch (error) {
      logger.error('Random Unsplash images failed', { error: error.message });
      return {
        success: false,
        images: [],
        total: 0,
        page: 1,
        perPage: options.count || 10,
        provider: 'unsplash',
        error: error.message,
      };
    }
  }

  /**
   * Get trending images from Unsplash
   */
  async getTrendingUnsplashImages(count: number = 20): Promise<ImageSearchResult> {
    try {
      if (!this.unsplash) {
        throw new Error('Unsplash API key not configured');
      }

      const response = await this.unsplash.photos.list({
        page: 1,
        perPage: count,
        orderBy: 'popular',
      });

      const images: ImageResult[] = response.response?.results?.map((photo: any) => ({
        id: photo.id,
        url: photo.urls.regular,
        alt: photo.alt_description || 'Trending image',
        width: photo.width,
        height: photo.height,
        provider: 'unsplash',
        providerId: photo.id,
        photographer: photo.user?.name,
        downloadUrl: photo.links.download,
        thumbnailUrl: photo.urls.thumb,
        tags: photo.tags?.map((tag: any) => tag.title),
        description: photo.description,
        createdAt: photo.created_at,
        likes: photo.likes,
        downloads: photo.downloads,
      })) || [];

      logger.info('Trending Unsplash images fetched successfully', {
        count: images.length,
      });

      return {
        success: true,
        images,
        total: images.length,
        page: 1,
        perPage: count,
        provider: 'unsplash',
      };
    } catch (error) {
      logger.error('Trending Unsplash images failed', { error: error.message });
      return {
        success: false,
        images: [],
        total: 0,
        page: 1,
        perPage: count,
        provider: 'unsplash',
        error: error.message,
      };
    }
  }

  /**
   * Download image and get buffer
   */
  async downloadImage(url: string): Promise<{ success: boolean; buffer?: Buffer; error?: string }> {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 30000,
        headers: {
          'User-Agent': 'PayloadCMS-Backend/1.0.0',
        },
      });

      const buffer = Buffer.from(response.data, 'binary');

      logger.info('Image downloaded successfully', {
        url,
        size: buffer.length,
      });

      return {
        success: true,
        buffer,
      };
    } catch (error) {
      logger.error('Image download failed', { error: error.message, url });
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get image metadata
   */
  async getImageMetadata(url: string): Promise<{
    success: boolean;
    width?: number;
    height?: number;
    format?: string;
    size?: number;
    error?: string;
  }> {
    try {
      const response = await axios.head(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'PayloadCMS-Backend/1.0.0',
        },
      });

      const contentType = response.headers['content-type'];
      const contentLength = response.headers['content-length'];

      // Basic metadata extraction
      const metadata = {
        width: undefined,
        height: undefined,
        format: contentType?.split('/')[1]?.split(';')[0],
        size: contentLength ? parseInt(contentLength) : undefined,
      };

      logger.info('Image metadata fetched successfully', {
        url,
        metadata,
      });

      return {
        success: true,
        ...metadata,
      };
    } catch (error) {
      logger.error('Image metadata fetch failed', { error: error.message, url });
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Validate API keys
   */
  async validateAPIKeys(): Promise<{
    unsplash: boolean;
    pixabay: boolean;
    pexels: boolean;
  }> {
    const results = {
      unsplash: false,
      pixabay: false,
      pexels: false,
    };

    // Test Unsplash
    if (this.unsplash) {
      try {
        await this.unsplash.photos.getRandom({ count: 1 });
        results.unsplash = true;
      } catch (error) {
        logger.error('Unsplash API key validation failed', { error: error.message });
      }
    }

    // Test Pixabay
    if (this.pixabay) {
      try {
        await this.pixabay.searchImages({ q: 'test', per_page: 1 });
        results.pixabay = true;
      } catch (error) {
        logger.error('Pixabay API key validation failed', { error: error.message });
      }
    }

    // Test Pexels
    if (this.pexels) {
      try {
        await this.pexels.photos.search({ query: 'test', per_page: 1 });
        results.pexels = true;
      } catch (error) {
        logger.error('Pexels API key validation failed', { error: error.message });
      }
    }

    return results;
  }

  /**
   * Get service status
   */
  getServiceStatus(): {
    unsplash: boolean;
    pixabay: boolean;
    pexels: boolean;
  } {
    return {
      unsplash: !!this.unsplash,
      pixabay: !!this.pixabay,
      pexels: !!this.pexels,
    };
  }

  /**
   * Get attribution text for Unsplash images
   */
  getUnsplashAttribution(photographer: string, photoId: string): string {
    return `Photo by <a href="https://unsplash.com/@${photographer}?utm_source=your-app&utm_medium=referral">${photographer}</a> on <a href="https://unsplash.com/?utm_source=your-app&utm_medium=referral">Unsplash</a>`;
  }

  /**
   * Get attribution text for Pixabay images
   */
  getPixabayAttribution(photographer: string, photoId: string): string {
    return `Image by <a href="https://pixabay.com/users/${photographer}-${photoId}/">${photographer}</a> on <a href="https://pixabay.com/">Pixabay</a>`;
  }

  /**
   * Get attribution text for Pexels images
   */
  getPexelsAttribution(photographer: string, photoId: string): string {
    return `Photo by <a href="https://www.pexels.com/@${photographer}">${photographer}</a> on <a href="https://www.pexels.com/">Pexels</a>`;
  }
}

// Export singleton instance
export const imageService = new ImageService();