import OpenAI from 'openai';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import Replicate from 'replicate';
import { logger } from '../utils/logger';

// Types
export interface AIGenerationOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export interface AIArticleOptions extends AIGenerationOptions {
  title?: string;
  topic: string;
  tone?: 'professional' | 'casual' | 'academic' | 'creative';
  length?: 'short' | 'medium' | 'long';
  language?: 'id' | 'en';
  includeKeywords?: string[];
  excludeKeywords?: string[];
}

export interface AIProductDescriptionOptions extends AIGenerationOptions {
  productName: string;
  category: string;
  features?: string[];
  targetAudience?: string;
  tone?: 'professional' | 'casual' | 'persuasive';
  length?: 'short' | 'medium' | 'long';
}

export interface AISEOOptions extends AIGenerationOptions {
  title: string;
  content: string;
  targetKeywords?: string[];
  metaDescriptionLength?: number;
}

export interface AISocialMediaOptions extends AIGenerationOptions {
  content: string;
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
  tone?: 'professional' | 'casual' | 'funny' | 'inspirational';
  includeHashtags?: boolean;
  maxLength?: number;
}

export interface AIGenerationResult {
  success: boolean;
  content?: string;
  error?: string;
  provider: 'openai' | 'gemini' | 'replicate';
  model: string;
  tokensUsed?: number;
  cost?: number;
}

export class AIService {
  private openai: OpenAI;
  private gemini: GoogleGenerativeAI;
  private geminiModel: GenerativeModel;
  private replicate: Replicate;

  constructor() {
    // Initialize OpenAI
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        maxRetries: 3,
        timeout: 60000,
      });
    }

    // Initialize Google Gemini
    if (process.env.GEMINI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.geminiModel = this.gemini.getGenerativeModel({ model: 'gemini-pro' });
    }

    // Initialize Replicate
    if (process.env.REPLICATE_API_TOKEN) {
      this.replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });
    }
  }

  /**
   * Generate general content using OpenAI
   */
  async generateContentWithOpenAI(
    prompt: string,
    options: AIGenerationOptions = {}
  ): Promise<AIGenerationResult> {
    try {
      if (!this.openai) {
        throw new Error('OpenAI API key not configured');
      }

      const {
        model = 'gpt-4',
        maxTokens = 1000,
        temperature = 0.7,
        topP = 1,
        frequencyPenalty = 0,
        presencePenalty = 0,
      } = options;

      const response = await this.openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens,
        temperature,
        top_p: topP,
        frequency_penalty: frequencyPenalty,
        presence_penalty: presencePenalty,
      });

      const content = response.choices[0]?.message?.content;
      const tokensUsed = response.usage?.total_tokens;

      logger.info('OpenAI content generated successfully', {
        model,
        tokensUsed,
        promptLength: prompt.length,
      });

      return {
        success: true,
        content,
        provider: 'openai',
        model,
        tokensUsed,
      };
    } catch (error) {
      logger.error('OpenAI generation failed', { error: error.message });
      return {
        success: false,
        error: error.message,
        provider: 'openai',
        model: options.model || 'gpt-4',
      };
    }
  }

  /**
   * Generate content using Google Gemini
   */
  async generateContentWithGemini(
    prompt: string,
    options: AIGenerationOptions = {}
  ): Promise<AIGenerationResult> {
    try {
      if (!this.geminiModel) {
        throw new Error('Gemini API key not configured');
      }

      const {
        model = 'gemini-pro',
        maxTokens = 1000,
        temperature = 0.7,
      } = options;

      const result = await this.geminiModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature,
        },
      });

      const content = result.response.text();
      const tokensUsed = result.response.usageMetadata?.totalTokenCount;

      logger.info('Gemini content generated successfully', {
        model,
        tokensUsed,
        promptLength: prompt.length,
      });

      return {
        success: true,
        content,
        provider: 'gemini',
        model,
        tokensUsed,
      };
    } catch (error) {
      logger.error('Gemini generation failed', { error: error.message });
      return {
        success: false,
        error: error.message,
        provider: 'gemini',
        model: options.model || 'gemini-pro',
      };
    }
  }

  /**
   * Generate article content
   */
  async generateArticle(options: AIArticleOptions): Promise<AIGenerationResult> {
    const {
      topic,
      title,
      tone = 'professional',
      length = 'medium',
      language = 'id',
      includeKeywords = [],
      excludeKeywords = [],
    } = options;

    const lengthMap = {
      short: 300,
      medium: 800,
      long: 1500,
    };

    const prompt = `
Tulis artikel tentang "${topic}"${title ? ` dengan judul "${title}"` : ''}.

Kriteria:
- Tone: ${tone}
- Panjang: ${lengthMap[length]} kata
- Bahasa: ${language === 'id' ? 'Indonesia' : 'English'}
${includeKeywords.length > 0 ? `- Sertakan keyword: ${includeKeywords.join(', ')}` : ''}
${excludeKeywords.length > 0 ? `- Hindari keyword: ${excludeKeywords.join(', ')}` : ''}

Struktur artikel:
1. Pendahuluan yang menarik
2. Pembahasan utama dengan contoh dan data
3. Kesimpulan yang merangkum poin-poin penting

Pastikan artikel informatif, engaging, dan SEO-friendly.
`;

    // Try OpenAI first, then fallback to Gemini
    let result = await this.generateContentWithOpenAI(prompt, options);
    if (!result.success && this.geminiModel) {
      result = await this.generateContentWithGemini(prompt, options);
    }

    return result;
  }

  /**
   * Generate product description
   */
  async generateProductDescription(
    options: AIProductDescriptionOptions
  ): Promise<AIGenerationResult> {
    const {
      productName,
      category,
      features = [],
      targetAudience,
      tone = 'professional',
      length = 'medium',
    } = options;

    const prompt = `
Tulis deskripsi produk untuk "${productName}" dalam kategori "${category}".

Kriteria:
- Tone: ${tone}
- Panjang: ${length === 'short' ? 'singkat' : length === 'medium' ? 'sedang' : 'panjang'}
${targetAudience ? `- Target audience: ${targetAudience}` : ''}
${features.length > 0 ? `- Fitur utama: ${features.join(', ')}` : ''}

Deskripsi harus:
- Menarik dan persuasif
- Menjelaskan manfaat produk
- Menggunakan bahasa yang mudah dipahami
- Optimized untuk SEO
- Termasuk call-to-action yang tepat
`;

    let result = await this.generateContentWithOpenAI(prompt, options);
    if (!result.success && this.geminiModel) {
      result = await this.generateContentWithGemini(prompt, options);
    }

    return result;
  }

  /**
   * Generate SEO meta description
   */
  async generateSEOMetaDescription(
    options: AISEOOptions
  ): Promise<AIGenerationResult> {
    const {
      title,
      content,
      targetKeywords = [],
      metaDescriptionLength = 160,
    } = options;

    const prompt = `
Buat meta description untuk artikel dengan judul: "${title}"

Konten artikel: ${content.substring(0, 500)}...

Kriteria:
- Panjang maksimal: ${metaDescriptionLength} karakter
- Sertakan keyword utama: ${targetKeywords.join(', ')}
- Menarik dan informatif
- Optimized untuk SEO
- Termasuk call-to-action

Meta description harus:
- Menjelaskan isi artikel dengan jelas
- Menggunakan keyword secara natural
- Memicu klik dari search results
- Tidak terlalu panjang atau pendek
`;

    let result = await this.generateContentWithOpenAI(prompt, options);
    if (!result.success && this.geminiModel) {
      result = await this.generateContentWithGemini(prompt, options);
    }

    return result;
  }

  /**
   * Generate social media post
   */
  async generateSocialMediaPost(
    options: AISocialMediaOptions
  ): Promise<AIGenerationResult> {
    const {
      content,
      platform,
      tone = 'professional',
      includeHashtags = true,
      maxLength = 280,
    } = options;

    const platformInfo = {
      twitter: { maxLength: 280, hashtagCount: 2 },
      facebook: { maxLength: 63206, hashtagCount: 3 },
      instagram: { maxLength: 2200, hashtagCount: 30 },
      linkedin: { maxLength: 3000, hashtagCount: 5 },
    };

    const { maxLength: platformMaxLength, hashtagCount } = platformInfo[platform];
    const actualMaxLength = Math.min(maxLength, platformMaxLength);

    const prompt = `
Buat post untuk ${platform} berdasarkan konten berikut:

Konten: ${content}

Kriteria:
- Tone: ${tone}
- Panjang maksimal: ${actualMaxLength} karakter
- Platform: ${platform}
${includeHashtags ? `- Sertakan ${hashtagCount} hashtag yang relevan` : ''}

Post harus:
- Menarik dan engaging
- Sesuai dengan tone yang diminta
- Menggunakan bahasa yang sesuai platform
- Memicu engagement (like, comment, share)
- Termasuk call-to-action yang tepat
`;

    let result = await this.generateContentWithOpenAI(prompt, options);
    if (!result.success && this.geminiModel) {
      result = await this.generateContentWithGemini(prompt, options);
    }

    return result;
  }

  /**
   * Generate AI image using Replicate
   */
  async generateImage(
    prompt: string,
    options: {
      model?: string;
      width?: number;
      height?: number;
      numOutputs?: number;
      guidanceScale?: number;
      numInferenceSteps?: number;
    } = {}
  ): Promise<{
    success: boolean;
    images?: string[];
    error?: string;
    model: string;
  }> {
    try {
      if (!this.replicate) {
        throw new Error('Replicate API token not configured');
      }

      const {
        model = 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
        width = 1024,
        height = 1024,
        numOutputs = 1,
        guidanceScale = 7.5,
        numInferenceSteps = 50,
      } = options;

      const output = await this.replicate.run(model, {
        input: {
          prompt,
          width,
          height,
          num_outputs: numOutputs,
          guidance_scale: guidanceScale,
          num_inference_steps: numInferenceSteps,
        },
      });

      const images = Array.isArray(output) ? output : [output];

      logger.info('AI image generated successfully', {
        model,
        prompt,
        imageCount: images.length,
      });

      return {
        success: true,
        images,
        model,
      };
    } catch (error) {
      logger.error('AI image generation failed', { error: error.message });
      return {
        success: false,
        error: error.message,
        model: options.model || 'sdxl',
      };
    }
  }

  /**
   * Check API key validity
   */
  async validateAPIKeys(): Promise<{
    openai: boolean;
    gemini: boolean;
    replicate: boolean;
  }> {
    const results = {
      openai: false,
      gemini: false,
      replicate: false,
    };

    // Test OpenAI
    if (this.openai) {
      try {
        await this.openai.models.list();
        results.openai = true;
      } catch (error) {
        logger.error('OpenAI API key validation failed', { error: error.message });
      }
    }

    // Test Gemini
    if (this.geminiModel) {
      try {
        await this.geminiModel.generateContent('Test');
        results.gemini = true;
      } catch (error) {
        logger.error('Gemini API key validation failed', { error: error.message });
      }
    }

    // Test Replicate
    if (this.replicate) {
      try {
        // Simple test - list models
        await this.replicate.models.list();
        results.replicate = true;
      } catch (error) {
        logger.error('Replicate API key validation failed', { error: error.message });
      }
    }

    return results;
  }

  /**
   * Get service status
   */
  getServiceStatus(): {
    openai: boolean;
    gemini: boolean;
    replicate: boolean;
  } {
    return {
      openai: !!this.openai,
      gemini: !!this.geminiModel,
      replicate: !!this.replicate,
    };
  }
}

// Export singleton instance
export const aiService = new AIService();