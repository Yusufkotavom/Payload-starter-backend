import { CollectionConfig } from 'payload/types';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug for the page',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 200,
      admin: {
        description: 'Brief summary for previews',
      },
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
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'images',
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'SEO title (if empty, uses page title)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'SEO description (if empty, uses excerpt)',
          },
        },
        {
          name: 'metaKeywords',
          type: 'text',
          admin: {
            description: 'SEO keywords',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'images',
          admin: {
            description: 'Open Graph image',
          },
        },
      ],
    },
    {
      name: 'template',
      type: 'select',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'About',
          value: 'about',
        },
        {
          label: 'Contact',
          value: 'contact',
        },
        {
          label: 'Landing',
          value: 'landing',
        },
      ],
      defaultValue: 'default',
    },
    {
      name: 'isHomepage',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as homepage',
      },
    },
    {
      name: 'showInNavigation',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show in main navigation',
      },
    },
    {
      name: 'navigationOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order in navigation (lower numbers first)',
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate slug if not provided
        if (!data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        }
        
        // Set publishedAt if status is published
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        
        return data;
      },
    ],
  },
};