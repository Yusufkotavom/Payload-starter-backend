// AI Service Types

export interface AIProvider {
  name: 'openai' | 'gemini' | 'claude' | 'ollama';
  apiKey?: string;
  baseUrl?: string;
  model?: string;
}

export interface AIGenerationOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
  language?: string;
  tone?: 'professional' | 'casual' | 'friendly' | 'formal' | 'humorous';
  length?: 'short' | 'medium' | 'long';
}

export interface AIGenerationResult {
  success: boolean;
  content?: string;
  error?: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  model?: string;
  duration?: number;
}

export interface AIArticleOptions {
  topic: string;
  tone?: 'professional' | 'casual' | 'friendly' | 'formal';
  length?: 'short' | 'medium' | 'long';
  language?: string;
  includeIntroduction?: boolean;
  includeConclusion?: boolean;
  targetAudience?: string;
  keywords?: string[];
}

export interface AIProductDescriptionOptions {
  productName: string;
  features: string[];
  tone?: 'professional' | 'casual' | 'friendly';
  language?: string;
  includeBenefits?: boolean;
  includeSpecifications?: boolean;
  targetAudience?: string;
}

export interface AISEOOptions {
  title: string;
  content: string;
  maxLength?: number;
  language?: string;
  includeKeywords?: boolean;
  targetKeywords?: string[];
}

export interface AISocialMediaOptions {
  content: string;
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
  tone?: 'professional' | 'casual' | 'friendly';
  includeHashtags?: boolean;
  includeCallToAction?: boolean;
  maxHashtags?: number;
}

export interface AIPrompt {
  id: string;
  title: string;
  description?: string;
  prompt: string;
  type: 'article' | 'product' | 'seo' | 'social' | 'email' | 'news' | 'review' | 'tutorial';
  provider: 'openai' | 'gemini' | 'claude' | 'ollama';
  model?: string;
  active: boolean;
  variables?: {
    topic?: string;
    tone?: string;
    length?: string;
    language?: string;
  };
  maxTokens?: number;
  temperature?: number;
  usageCount?: number;
  lastUsedAt?: string;
  tags?: string[];
  categories?: string[];
  metadata?: any;
}

export interface AIGenerationRequest {
  promptId?: string;
  prompt: string;
  options: AIGenerationOptions;
  metadata?: {
    source?: string;
    userId?: string;
    sessionId?: string;
    requestId?: string;
  };
}

export interface AIGenerationResponse {
  requestId: string;
  result: AIGenerationResult;
  timestamp: string;
  metadata?: any;
}

export interface AIServiceConfig {
  openai?: {
    apiKey: string;
    baseUrl?: string;
    defaultModel?: string;
  };
  gemini?: {
    apiKey: string;
    baseUrl?: string;
    defaultModel?: string;
  };
  claude?: {
    apiKey: string;
    baseUrl?: string;
    defaultModel?: string;
  };
  ollama?: {
    baseUrl: string;
    defaultModel?: string;
  };
}

export interface AIServiceStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  totalTokensUsed: number;
  costEstimate: number;
  lastRequestAt?: string;
}

export interface AIContentTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: string[];
  category: string;
  tags: string[];
  examples?: string[];
}

export interface AIContentGenerationJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  promptId: string;
  options: AIGenerationOptions;
  result?: AIGenerationResult;
  error?: string;
  createdAt: string;
  completedAt?: string;
  metadata?: any;
}

export interface AIContentQuality {
  readability: number; // 0-100
  uniqueness: number; // 0-100
  relevance: number; // 0-100
  grammar: number; // 0-100
  overall: number; // 0-100
  suggestions?: string[];
}

export interface AIContentAnalysis {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: number; // in minutes
  keywords: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  quality: AIContentQuality;
  seoScore?: number;
}