import { createApi } from 'unsplash-js';

class UnsplashService {
  private api: any;

  constructor() {
    this.api = createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
    });
  }

  /**
   * Search for photos
   */
  async searchPhotos(query: string, options: {
    page?: number;
    perPage?: number;
    orientation?: 'landscape' | 'portrait' | 'squarish';
    orderBy?: 'relevant' | 'latest';
  } = {}) {
    try {
      const {
        page = 1,
        perPage = 10,
        orientation = 'landscape',
        orderBy = 'relevant'
      } = options;

      const result = await this.api.search.getPhotos({
        query,
        page,
        perPage,
        orientation,
        orderBy,
      });

      if (result.errors) {
        throw new Error(result.errors[0]);
      }

      return {
        success: true,
        photos: result.response?.results || [],
        total: result.response?.total || 0,
        totalPages: result.response?.total_pages || 0,
      };
    } catch (error) {
      console.error('Unsplash API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get random photos
   */
  async getRandomPhotos(options: {
    query?: string;
    count?: number;
    orientation?: 'landscape' | 'portrait' | 'squarish';
  } = {}) {
    try {
      const {
        query = 'nature',
        count = 10,
        orientation = 'landscape'
      } = options;

      const result = await this.api.photos.getRandom({
        query,
        count,
        orientation,
      });

      if (result.errors) {
        throw new Error(result.errors[0]);
      }

      return {
        success: true,
        photos: Array.isArray(result.response) ? result.response : [result.response],
      };
    } catch (error) {
      console.error('Unsplash API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get photo by ID
   */
  async getPhoto(photoId: string) {
    try {
      const result = await this.api.photos.get({
        photoId,
      });

      if (result.errors) {
        throw new Error(result.errors[0]);
      }

      return {
        success: true,
        photo: result.response,
      };
    } catch (error) {
      console.error('Unsplash API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get trending photos
   */
  async getTrendingPhotos(options: {
    page?: number;
    perPage?: number;
  } = {}) {
    try {
      const {
        page = 1,
        perPage = 10
      } = options;

      const result = await this.api.photos.list({
        page,
        perPage,
        orderBy: 'popular',
      });

      if (result.errors) {
        throw new Error(result.errors[0]);
      }

      return {
        success: true,
        photos: result.response?.results || [],
        total: result.response?.total || 0,
        totalPages: result.response?.total_pages || 0,
      };
    } catch (error) {
      console.error('Unsplash API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Search for collections
   */
  async searchCollections(query: string, options: {
    page?: number;
    perPage?: number;
  } = {}) {
    try {
      const {
        page = 1,
        perPage = 10
      } = options;

      const result = await this.api.search.getCollections({
        query,
        page,
        perPage,
      });

      if (result.errors) {
        throw new Error(result.errors[0]);
      }

      return {
        success: true,
        collections: result.response?.results || [],
        total: result.response?.total || 0,
        totalPages: result.response?.total_pages || 0,
      };
    } catch (error) {
      console.error('Unsplash API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get photos from a collection
   */
  async getCollectionPhotos(collectionId: string, options: {
    page?: number;
    perPage?: number;
  } = {}) {
    try {
      const {
        page = 1,
        perPage = 10
      } = options;

      const result = await this.api.collections.getPhotos({
        collectionId,
        page,
        perPage,
      });

      if (result.errors) {
        throw new Error(result.errors[0]);
      }

      return {
        success: true,
        photos: result.response?.results || [],
        total: result.response?.total || 0,
        totalPages: result.response?.total_pages || 0,
      };
    } catch (error) {
      console.error('Unsplash API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Check if API key is valid
   */
  async validateAPIKey(): Promise<boolean> {
    try {
      const response = await this.searchPhotos('nature', { perPage: 1 });
      return response.success;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get photo download link
   */
  getDownloadLink(photo: any): string {
    return photo?.links?.download || photo?.urls?.regular || '';
  }

  /**
   * Get photo attribution
   */
  getAttribution(photo: any): string {
    const photographer = photo?.user?.name || 'Unknown';
    const unsplashUrl = photo?.links?.html || 'https://unsplash.com';
    return `Photo by ${photographer} on Unsplash`;
  }
}

export default new UnsplashService();