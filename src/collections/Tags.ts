import { CollectionConfig } from 'payload/types';

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'usageCount', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug for the tag',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Tag description',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Tag color (hex code)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this tag is active',
      },
    },
    {
      name: 'usageCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Number of times this tag is used',
      },
    },
    {
      name: 'lastUsedAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Last time this tag was used',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'SEO title',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'SEO description',
          },
        },
        {
          name: 'metaKeywords',
          type: 'text',
          admin: {
            description: 'SEO keywords',
          },
        },
      ],
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate slug if not provided
        if (!data.slug && data.name) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        }
        
        return data;
      },
    ],
  },
};