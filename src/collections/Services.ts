import { CollectionConfig } from 'payload/types';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'status', 'createdAt'],
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
        description: 'URL slug for the service',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 200,
      admin: {
        description: 'Brief description for listings',
      },
    },
    {
      name: 'price',
      type: 'number',
      min: 0,
      admin: {
        description: 'Price in USD (0 for free)',
      },
    },
    {
      name: 'priceType',
      type: 'select',
      options: [
        {
          label: 'Fixed',
          value: 'fixed',
        },
        {
          label: 'Hourly',
          value: 'hourly',
        },
        {
          label: 'Daily',
          value: 'daily',
        },
        {
          label: 'Monthly',
          value: 'monthly',
        },
        {
          label: 'Free',
          value: 'free',
        },
      ],
      defaultValue: 'fixed',
      required: true,
    },
    {
      name: 'currency',
      type: 'select',
      options: [
        {
          label: 'USD',
          value: 'USD',
        },
        {
          label: 'EUR',
          value: 'EUR',
        },
        {
          label: 'IDR',
          value: 'IDR',
        },
      ],
      defaultValue: 'USD',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Paused',
          value: 'paused',
        },
        {
          label: 'Discontinued',
          value: 'discontinued',
        },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'images',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'images',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'provider',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Service provider',
      },
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
        },
        {
          name: 'isRemote',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'duration',
      type: 'group',
      fields: [
        {
          name: 'minDuration',
          type: 'number',
          min: 1,
          admin: {
            description: 'Minimum duration in hours',
          },
        },
        {
          name: 'maxDuration',
          type: 'number',
          min: 1,
          admin: {
            description: 'Maximum duration in hours',
          },
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'requirements',
      type: 'array',
      fields: [
        {
          name: 'requirement',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'deliverables',
      type: 'array',
      fields: [
        {
          name: 'deliverable',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'SEO title (if empty, uses service name)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'SEO description (if empty, uses short description)',
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
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'isPopular',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      admin: {
        readOnly: true,
        description: 'Average rating',
      },
    },
    {
      name: 'reviewCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'viewCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'inquiryCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
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