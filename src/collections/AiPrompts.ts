import { CollectionConfig } from 'payload/types';

export const AiPrompts: CollectionConfig = {
  slug: 'aiPrompts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'provider', 'active', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name for the prompt',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of what this prompt does',
      },
    },
    {
      name: 'prompt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The actual prompt template',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Article',
          value: 'article',
        },
        {
          label: 'Product Description',
          value: 'product',
        },
        {
          label: 'SEO Content',
          value: 'seo',
        },
        {
          label: 'Social Media',
          value: 'social',
        },
        {
          label: 'Email',
          value: 'email',
        },
        {
          label: 'News',
          value: 'news',
        },
        {
          label: 'Review',
          value: 'review',
        },
        {
          label: 'Tutorial',
          value: 'tutorial',
        },
      ],
      required: true,
    },
    {
      name: 'provider',
      type: 'select',
      options: [
        {
          label: 'OpenAI',
          value: 'openai',
        },
        {
          label: 'Gemini',
          value: 'gemini',
        },
        {
          label: 'Claude',
          value: 'claude',
        },
        {
          label: 'Ollama',
          value: 'ollama',
        },
      ],
      required: true,
    },
    {
      name: 'model',
      type: 'text',
      admin: {
        description: 'Specific model to use (e.g., gpt-3.5-turbo, gemini-pro)',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this prompt should be used',
      },
    },
    {
      name: 'variables',
      type: 'group',
      fields: [
        {
          name: 'topic',
          type: 'text',
          admin: {
            description: 'Topic placeholder',
          },
        },
        {
          name: 'tone',
          type: 'select',
          options: [
            {
              label: 'Professional',
              value: 'professional',
            },
            {
              label: 'Casual',
              value: 'casual',
            },
            {
              label: 'Friendly',
              value: 'friendly',
            },
            {
              label: 'Formal',
              value: 'formal',
            },
            {
              label: 'Humorous',
              value: 'humorous',
            },
          ],
          defaultValue: 'professional',
        },
        {
          name: 'length',
          type: 'select',
          options: [
            {
              label: 'Short (100-200 words)',
              value: 'short',
            },
            {
              label: 'Medium (300-500 words)',
              value: 'medium',
            },
            {
              label: 'Long (600-1000 words)',
              value: 'long',
            },
          ],
          defaultValue: 'medium',
        },
        {
          name: 'language',
          type: 'text',
          defaultValue: 'English',
          admin: {
            description: 'Language for the content',
          },
        },
      ],
    },
    {
      name: 'maxTokens',
      type: 'number',
      defaultValue: 1000,
      admin: {
        description: 'Maximum tokens for the response',
      },
    },
    {
      name: 'temperature',
      type: 'number',
      defaultValue: 0.7,
      min: 0,
      max: 2,
      admin: {
        description: 'Creativity level (0 = focused, 2 = creative)',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'usageCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Number of times this prompt has been used',
      },
    },
    {
      name: 'lastUsedAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Last time this prompt was used',
      },
    },
    {
      name: 'metadata',
      type: 'json',
      admin: {
        description: 'Additional metadata',
      },
    },
  ],
  timestamps: true,
};