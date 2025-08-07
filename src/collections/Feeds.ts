import { CollectionConfig } from 'payload/types';

export const Feeds: CollectionConfig = {
  slug: 'feeds',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'url', 'active', 'lastFetchedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name for the feed',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'RSS feed URL',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of the feed',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this feed should be fetched',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Technology',
          value: 'technology',
        },
        {
          label: 'News',
          value: 'news',
        },
        {
          label: 'Business',
          value: 'business',
        },
        {
          label: 'Entertainment',
          value: 'entertainment',
        },
        {
          label: 'Sports',
          value: 'sports',
        },
        {
          label: 'Science',
          value: 'science',
        },
        {
          label: 'Health',
          value: 'health',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      defaultValue: 'other',
      required: true,
    },
    {
      name: 'lastFetchedAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Last time this feed was fetched',
      },
    },
    {
      name: 'lastFetchStatus',
      type: 'select',
      options: [
        {
          label: 'Success',
          value: 'success',
        },
        {
          label: 'Error',
          value: 'error',
        },
        {
          label: 'Never Fetched',
          value: 'never',
        },
      ],
      defaultValue: 'never',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'lastFetchError',
      type: 'textarea',
      admin: {
        readOnly: true,
        description: 'Error message from last fetch attempt',
      },
    },
    {
      name: 'fetchInterval',
      type: 'number',
      defaultValue: 3600, // 1 hour in seconds
      admin: {
        description: 'Fetch interval in seconds',
      },
    },
    {
      name: 'maxItems',
      type: 'number',
      defaultValue: 10,
      admin: {
        description: 'Maximum number of items to fetch per run',
      },
    },
    {
      name: 'autoPublish',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Automatically publish fetched content',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        description: 'Tags to automatically assign to fetched content',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        description: 'Categories to automatically assign to fetched content',
      },
    },
    {
      name: 'metadata',
      type: 'json',
      admin: {
        description: 'Additional feed metadata',
      },
    },
  ],
  timestamps: true,
};