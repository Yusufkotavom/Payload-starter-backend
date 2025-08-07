import OpenAI from 'openai';

class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Generate content using OpenAI
   */
  async generateContent(prompt: string, options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;
  } = {}) {
    try {
      const {
        model = 'gpt-3.5-turbo',
        maxTokens = 1000,
        temperature = 0.7,
        systemPrompt = 'You are a helpful content writer.'
      } = options;

      const completion = await this.client.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: maxTokens,
        temperature,
      });

      return {
        success: true,
        content: completion.choices[0]?.message?.content || '',
        usage: completion.usage,
        model: completion.model,
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Generate article content
   */
  async generateArticle(topic: string, options: {
    tone?: 'professional' | 'casual' | 'friendly' | 'formal';
    length?: 'short' | 'medium' | 'long';
    language?: string;
  } = {}) {
    const {
      tone = 'professional',
      length = 'medium',
      language = 'English'
    } = options;

    const lengthWords = {
      short: '100-200',
      medium: '300-500',
      long: '600-1000'
    };

    const prompt = `Write a ${tone} article about "${topic}" in ${language}. 
    The article should be ${lengthWords[length]} words long.
    Include an engaging introduction, well-structured body paragraphs, and a conclusion.
    Make it informative and engaging for readers.`;

    return this.generateContent(prompt, {
      maxTokens: length === 'long' ? 1500 : length === 'medium' ? 1000 : 500,
      temperature: 0.7,
      systemPrompt: 'You are a professional content writer who creates engaging and informative articles.'
    });
  }

  /**
   * Generate product description
   */
  async generateProductDescription(productName: string, features: string[], options: {
    tone?: 'professional' | 'casual' | 'friendly';
    language?: string;
  } = {}) {
    const {
      tone = 'professional',
      language = 'English'
    } = options;

    const featuresText = features.join(', ');

    const prompt = `Write a ${tone} product description for "${productName}" in ${language}.
    Key features: ${featuresText}
    Make it compelling and highlight the benefits. Keep it concise but informative.`;

    return this.generateContent(prompt, {
      maxTokens: 300,
      temperature: 0.8,
      systemPrompt: 'You are a marketing copywriter who creates compelling product descriptions.'
    });
  }

  /**
   * Generate SEO meta description
   */
  async generateSEODescription(title: string, content: string, options: {
    maxLength?: number;
    language?: string;
  } = {}) {
    const {
      maxLength = 160,
      language = 'English'
    } = options;

    const prompt = `Create a compelling SEO meta description for this article in ${language}:
    Title: "${title}"
    Content: "${content.substring(0, 500)}..."
    
    The description should be maximum ${maxLength} characters and include relevant keywords naturally.`;

    return this.generateContent(prompt, {
      maxTokens: 100,
      temperature: 0.6,
      systemPrompt: 'You are an SEO specialist who creates optimized meta descriptions.'
    });
  }

  /**
   * Generate social media post
   */
  async generateSocialPost(content: string, platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin', options: {
    tone?: 'professional' | 'casual' | 'friendly';
    includeHashtags?: boolean;
  } = {}) {
    const {
      tone = 'professional',
      includeHashtags = true
    } = options;

    const platformInfo = {
      twitter: '280 characters',
      facebook: '500 characters',
      instagram: '300 characters',
      linkedin: '600 characters'
    };

    const prompt = `Create a ${tone} social media post for ${platform} (${platformInfo[platform]}) about this content:
    "${content.substring(0, 200)}..."
    
    ${includeHashtags ? 'Include relevant hashtags.' : 'Do not include hashtags.'}
    Make it engaging and encourage interaction.`;

    return this.generateContent(prompt, {
      maxTokens: 200,
      temperature: 0.8,
      systemPrompt: 'You are a social media expert who creates engaging posts.'
    });
  }

  /**
   * Check if API key is valid
   */
  async validateAPIKey(): Promise<boolean> {
    try {
      const response = await this.generateContent('Hello', {
        maxTokens: 10,
        temperature: 0
      });
      return response.success;
    } catch (error) {
      return false;
    }
  }
}

export default new OpenAIService();