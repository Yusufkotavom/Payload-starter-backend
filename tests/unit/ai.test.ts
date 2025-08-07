import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import openaiService from '../../src/services/openaiService';

// Mock OpenAI
jest.mock('openai', () => ({
  default: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: 'This is a test response from AI',
              },
            },
          ],
          usage: {
            prompt_tokens: 10,
            completion_tokens: 50,
            total_tokens: 60,
          },
          model: 'gpt-3.5-turbo',
        }),
      },
    },
  })),
}));

describe('OpenAI Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateContent', () => {
    it('should generate content successfully', async () => {
      const prompt = 'Write a short article about technology';
      const options = {
        model: 'gpt-3.5-turbo',
        maxTokens: 100,
        temperature: 0.7,
      };

      const result = await openaiService.generateContent(prompt, options);

      expect(result.success).toBe(true);
      expect(result.content).toBe('This is a test response from AI');
      expect(result.model).toBe('gpt-3.5-turbo');
      expect(result.usage).toBeDefined();
    });

    it('should handle API errors gracefully', async () => {
      const mockOpenAI = require('openai').default;
      mockOpenAI.mockImplementation(() => ({
        chat: {
          completions: {
            create: jest.fn().mockRejectedValue(new Error('API Error')),
          },
        },
      }));

      const result = await openaiService.generateContent('test prompt');

      expect(result.success).toBe(false);
      expect(result.error).toBe('API Error');
    });
  });

  describe('generateArticle', () => {
    it('should generate article with correct parameters', async () => {
      const topic = 'Artificial Intelligence';
      const options = {
        tone: 'professional' as const,
        length: 'medium' as const,
        language: 'English',
      };

      const result = await openaiService.generateArticle(topic, options);

      expect(result.success).toBe(true);
      expect(result.content).toBe('This is a test response from AI');
    });

    it('should use default options when not provided', async () => {
      const topic = 'Machine Learning';

      const result = await openaiService.generateArticle(topic);

      expect(result.success).toBe(true);
      expect(result.content).toBe('This is a test response from AI');
    });
  });

  describe('generateProductDescription', () => {
    it('should generate product description', async () => {
      const productName = 'Smartphone X';
      const features = ['5G', 'High-resolution camera', 'Long battery life'];
      const options = {
        tone: 'professional' as const,
        language: 'English',
      };

      const result = await openaiService.generateProductDescription(productName, features, options);

      expect(result.success).toBe(true);
      expect(result.content).toBe('This is a test response from AI');
    });
  });

  describe('generateSEODescription', () => {
    it('should generate SEO description', async () => {
      const title = 'Best Smartphones 2024';
      const content = 'This article discusses the best smartphones available in 2024...';
      const options = {
        maxLength: 160,
        language: 'English',
      };

      const result = await openaiService.generateSEODescription(title, content, options);

      expect(result.success).toBe(true);
      expect(result.content).toBe('This is a test response from AI');
    });
  });

  describe('generateSocialPost', () => {
    it('should generate social media post for Twitter', async () => {
      const content = 'Check out our latest article about technology trends';
      const platform = 'twitter' as const;
      const options = {
        tone: 'casual' as const,
        includeHashtags: true,
      };

      const result = await openaiService.generateSocialPost(content, platform, options);

      expect(result.success).toBe(true);
      expect(result.content).toBe('This is a test response from AI');
    });

    it('should generate social media post for LinkedIn', async () => {
      const content = 'Professional insights on business strategy';
      const platform = 'linkedin' as const;
      const options = {
        tone: 'professional' as const,
        includeHashtags: false,
      };

      const result = await openaiService.generateSocialPost(content, platform, options);

      expect(result.success).toBe(true);
      expect(result.content).toBe('This is a test response from AI');
    });
  });

  describe('validateAPIKey', () => {
    it('should return true for valid API key', async () => {
      const isValid = await openaiService.validateAPIKey();
      expect(isValid).toBe(true);
    });

    it('should return false for invalid API key', async () => {
      const mockOpenAI = require('openai').default;
      mockOpenAI.mockImplementation(() => ({
        chat: {
          completions: {
            create: jest.fn().mockRejectedValue(new Error('Invalid API key')),
          },
        },
      }));

      const isValid = await openaiService.validateAPIKey();
      expect(isValid).toBe(false);
    });
  });
});