import { CollectionConfig } from 'payload/types';

export const Images: CollectionConfig = {
  slug: 'images',
  upload: {
    staticDir: '../public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'provider', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alt text for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      admin: {
        description: 'Image caption',
      },
    },
    {
      name: 'provider',
      type: 'select',
      options: [
        {
          label: 'Uploaded',
          value: 'uploaded',
        },
        {
          label: 'Unsplash',
          value: 'unsplash',
        },
        {
          label: 'Pixabay',
          value: 'pixabay',
        },
        {
          label: 'Pexels',
          value: 'pexels',
        },
        {
          label: 'AI Generated',
          value: 'ai',
        },
      ],
      defaultValue: 'uploaded',
      required: true,
    },
    {
      name: 'providerId',
      type: 'text',
      admin: {
        description: 'Original ID from provider (Unsplash, Pixabay, etc.)',
      },
    },
    {
      name: 'providerUrl',
      type: 'text',
      admin: {
        description: 'Original URL from provider',
      },
    },
    {
      name: 'aiPrompt',
      type: 'text',
      admin: {
        condition: (data) => data.provider === 'ai',
        description: 'Prompt used to generate this image',
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
      name: 'metadata',
      type: 'json',
      admin: {
        description: 'Additional metadata from provider',
      },
    },
    {
      name: 'usageCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Number of times this image is used',
      },
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this image can be used publicly',
      },
    },
  ],
  timestamps: true,
};