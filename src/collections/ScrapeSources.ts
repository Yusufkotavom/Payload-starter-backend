import { CollectionConfig } from 'payload/types';

export const ScrapeSources: CollectionConfig = {
  slug: 'scrapeSources',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'url', 'type', 'active', 'lastScrapedAt'],
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
        description: 'Display name for the source',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'URL to scrape',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of what this source contains',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Marketplace',
          value: 'marketplace',
        },
        {
          label: 'News Site',
          value: 'news',
        },
        {
          label: 'Blog',
          value: 'blog',
        },
        {
          label: 'E-commerce',
          value: 'ecommerce',
        },
        {
          label: 'Social Media',
          value: 'social',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      required: true,
    },
    {
      name: 'platform',
      type: 'select',
      options: [
        {
          label: 'Shopee',
          value: 'shopee',
        },
        {
          label: 'Tokopedia',
          value: 'tokopedia',
        },
        {
          label: 'Lazada',
          value: 'lazada',
        },
        {
          label: 'Bukalapak',
          value: 'bukalapak',
        },
        {
          label: 'Instagram',
          value: 'instagram',
        },
        {
          label: 'TikTok',
          value: 'tiktok',
        },
        {
          label: 'Facebook',
          value: 'facebook',
        },
        {
          label: 'Twitter',
          value: 'twitter',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this source should be scraped',
      },
    },
    {
      name: 'keywords',
      type: 'array',
      fields: [
        {
          name: 'keyword',
          type: 'text',
          required: true,
        },
        {
          name: 'priority',
          type: 'select',
          options: [
            {
              label: 'High',
              value: 'high',
            },
            {
              label: 'Medium',
              value: 'medium',
            },
            {
              label: 'Low',
              value: 'low',
            },
          ],
          defaultValue: 'medium',
        },
      ],
      admin: {
        description: 'Keywords to search for on this source',
      },
    },
    {
      name: 'scrapingConfig',
      type: 'group',
      fields: [
        {
          name: 'selectors',
          type: 'json',
          admin: {
            description: 'CSS selectors for scraping',
          },
        },
        {
          name: 'waitTime',
          type: 'number',
          defaultValue: 2000,
          admin: {
            description: 'Wait time in milliseconds',
          },
        },
        {
          name: 'maxPages',
          type: 'number',
          defaultValue: 10,
          admin: {
            description: 'Maximum pages to scrape',
          },
        },
        {
          name: 'userAgent',
          type: 'text',
          defaultValue: 'Mozilla/5.0 (compatible; PayloadCMS-Bot/1.0)',
          admin: {
            description: 'User agent for requests',
          },
        },
      ],
    },
    {
      name: 'lastScrapedAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Last time this source was scraped',
      },
    },
    {
      name: 'lastScrapeStatus',
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
          label: 'Never Scraped',
          value: 'never',
        },
      ],
      defaultValue: 'never',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'lastScrapeError',
      type: 'textarea',
      admin: {
        readOnly: true,
        description: 'Error message from last scrape attempt',
      },
    },
    {
      name: 'scrapeInterval',
      type: 'number',
      defaultValue: 86400, // 24 hours in seconds
      admin: {
        description: 'Scrape interval in seconds',
      },
    },
    {
      name: 'autoPublish',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Automatically publish scraped content',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        description: 'Tags to automatically assign to scraped content',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        description: 'Categories to automatically assign to scraped content',
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