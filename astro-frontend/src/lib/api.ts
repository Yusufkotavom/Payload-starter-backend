const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published';
  publishedAt: string;
  featuredImage?: {
    url: string;
    alt?: string;
  };
  author?: {
    id: string;
    name: string;
  };
  categories?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  status: 'draft' | 'published';
  images?: Array<{
    url: string;
    alt?: string;
  }>;
  category?: {
    id: string;
    name: string;
  };
  tags?: Array<{
    id: string;
    name: string;
  }>;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  price?: number;
  priceType?: 'fixed' | 'hourly' | 'project';
  currency?: string;
  status: 'draft' | 'published';
  featuredImage?: {
    url: string;
    alt?: string;
  };
  category?: {
    id: string;
    name: string;
  };
}

export interface ApiResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage?: number;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Posts
  async getPosts(params: {
    page?: number;
    limit?: number;
    status?: 'draft' | 'published';
    category?: string;
    tag?: string;
    search?: string;
  } = {}): Promise<ApiResponse<Post>> {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.status) searchParams.append('where[status][equals]', params.status);
    if (params.category) searchParams.append('where[categories][slug][equals]', params.category);
    if (params.tag) searchParams.append('where[tags][slug][equals]', params.tag);
    if (params.search) searchParams.append('where[title][contains]', params.search);

    return this.request<ApiResponse<Post>>(`/api/posts?${searchParams.toString()}`);
  }

  async getPost(slug: string): Promise<Post | null> {
    try {
      const response = await this.request<ApiResponse<Post>>(
        `/api/posts?where[slug][equals]=${slug}&limit=1`
      );
      return response.docs[0] || null;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  }

  // Products
  async getProducts(params: {
    page?: number;
    limit?: number;
    status?: 'draft' | 'published';
    category?: string;
    search?: string;
  } = {}): Promise<ApiResponse<Product>> {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.status) searchParams.append('where[status][equals]', params.status);
    if (params.category) searchParams.append('where[categories][slug][equals]', params.category);
    if (params.search) searchParams.append('where[name][contains]', params.search);

    return this.request<ApiResponse<Product>>(`/api/products?${searchParams.toString()}`);
  }

  async getProduct(slug: string): Promise<Product | null> {
    try {
      const response = await this.request<ApiResponse<Product>>(
        `/api/products?where[slug][equals]=${slug}&limit=1`
      );
      return response.docs[0] || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  // Services
  async getServices(params: {
    page?: number;
    limit?: number;
    status?: 'draft' | 'published';
    category?: string;
    search?: string;
  } = {}): Promise<ApiResponse<Service>> {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.status) searchParams.append('where[status][equals]', params.status);
    if (params.category) searchParams.append('where[categories][slug][equals]', params.category);
    if (params.search) searchParams.append('where[name][contains]', params.search);

    return this.request<ApiResponse<Service>>(`/api/services?${searchParams.toString()}`);
  }

  async getService(slug: string): Promise<Service | null> {
    try {
      const response = await this.request<ApiResponse<Service>>(
        `/api/services?where[slug][equals]=${slug}&limit=1`
      );
      return response.docs[0] || null;
    } catch (error) {
      console.error('Error fetching service:', error);
      return null;
    }
  }

  // Categories
  async getCategories(): Promise<Array<{ id: string; name: string; slug: string }>> {
    try {
      const response = await this.request<ApiResponse<{ id: string; name: string; slug: string }>>(
        '/api/categories?where[active][equals]=true'
      );
      return response.docs;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  // Tags
  async getTags(): Promise<Array<{ id: string; name: string; slug: string }>> {
    try {
      const response = await this.request<ApiResponse<{ id: string; name: string; slug: string }>>(
        '/api/tags?where[active][equals]=true'
      );
      return response.docs;
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  }

  // Health check
  async getStatus(): Promise<{ status: string; timestamp: string }> {
    try {
      return this.request<{ status: string; timestamp: string }>('/api/status');
    } catch (error) {
      console.error('Error fetching status:', error);
      return { status: 'error', timestamp: new Date().toISOString() };
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();