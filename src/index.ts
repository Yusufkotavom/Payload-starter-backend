import express from 'express';
import payload from 'payload';
import { errorHandler, notFound } from './middleware/errorHandler';
import logger from './utils/logger';

// Initialize express
const app = express();

// Initialize PayloadCMS
const start = async () => {
  try {
    // Initialize PayloadCMS
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
      express: app,
      onInit: async () => {
        logger.info('PayloadCMS initialized successfully');
        
        // Log startup information
        logger.info('Server starting...', {
          nodeEnv: process.env.NODE_ENV,
          port: process.env.PORT || 3000,
          serverUrl: process.env.PAYLOAD_PUBLIC_SERVER_URL,
        });
      },
    });

    // Add custom middleware
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
      });
    });

    // API status endpoint
    app.get('/api/status', (req, res) => {
      res.json({
        status: 'running',
        version: '1.0.0',
        features: {
          ai: !!process.env.OPENAI_API_KEY,
          images: !!process.env.UNSPLASH_ACCESS_KEY,
          monitoring: !!process.env.SENTRY_DSN,
        },
      });
    });

    // Custom API routes
    app.get('/api/raw-contents', async (req, res) => {
      try {
        const rawContents = await payload.find({
          collection: 'rawContents',
          limit: 10,
          sort: '-createdAt',
        });
        
        res.json({
          success: true,
          data: rawContents.docs,
          total: rawContents.totalDocs,
        });
      } catch (error) {
        logger.error('Error fetching raw contents:', error);
        res.status(500).json({
          success: false,
          error: 'Failed to fetch raw contents',
        });
      }
    });

    // Promote raw content to final collection
    app.post('/api/promote/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const { target } = req.body; // 'posts', 'pages', 'products', 'services'

        // Get raw content
        const rawContent = await payload.findByID({
          collection: 'rawContents',
          id,
        });

        if (!rawContent) {
          return res.status(404).json({
            success: false,
            error: 'Raw content not found',
          });
        }

        // Prepare data for target collection
        const publishData: any = {
          title: rawContent.title,
          content: rawContent.content,
          excerpt: rawContent.excerpt,
          status: 'published',
          publishedAt: new Date().toISOString(),
          tags: rawContent.tags || [],
          categories: rawContent.categories || [],
          author: rawContent.author,
        };

        // Add collection-specific fields
        if (target === 'posts') {
          publishData.slug = rawContent.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        } else if (target === 'products') {
          publishData.name = rawContent.title;
          publishData.description = rawContent.content;
          publishData.shortDescription = rawContent.excerpt;
          publishData.status = 'active';
        } else if (target === 'services') {
          publishData.name = rawContent.title;
          publishData.description = rawContent.content;
          publishData.shortDescription = rawContent.excerpt;
          publishData.status = 'active';
        }

        // Create content in target collection
        const publishedContent = await payload.create({
          collection: target,
          data: publishData,
        });

        // Update raw content status
        await payload.update({
          collection: 'rawContents',
          id,
          data: {
            status: 'published',
            metadata: {
              ...rawContent.metadata,
              publishedTo: target,
              publishedAt: new Date().toISOString(),
              publishedContentId: publishedContent.id,
            },
          },
        });

        res.json({
          success: true,
          data: publishedContent,
          message: `Content promoted to ${target} successfully`,
        });
      } catch (error) {
        logger.error('Error promoting content:', error);
        res.status(500).json({
          success: false,
          error: 'Failed to promote content',
        });
      }
    });

    // Review raw content
    app.post('/api/review/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const { reviewed, tags, categories } = req.body;

        const updatedContent = await payload.update({
          collection: 'rawContents',
          id,
          data: {
            reviewed: reviewed || true,
            tags: tags || [],
            categories: categories || [],
          },
        });

        res.json({
          success: true,
          data: updatedContent,
          message: 'Content reviewed successfully',
        });
      } catch (error) {
        logger.error('Error reviewing content:', error);
        res.status(500).json({
          success: false,
          error: 'Failed to review content',
        });
      }
    });

    // Get AI prompts
    app.get('/api/ai-prompts', async (req, res) => {
      try {
        const prompts = await payload.find({
          collection: 'aiPrompts',
          where: {
            active: {
              equals: true,
            },
          },
        });

        res.json({
          success: true,
          data: prompts.docs,
          total: prompts.totalDocs,
        });
      } catch (error) {
        logger.error('Error fetching AI prompts:', error);
        res.status(500).json({
          success: false,
          error: 'Failed to fetch AI prompts',
        });
      }
    });

    // Get RSS feeds
    app.get('/api/feeds', async (req, res) => {
      try {
        const feeds = await payload.find({
          collection: 'feeds',
          where: {
            active: {
              equals: true,
            },
          },
        });

        res.json({
          success: true,
          data: feeds.docs,
          total: feeds.totalDocs,
        });
      } catch (error) {
        logger.error('Error fetching feeds:', error);
        res.status(500).json({
          success: false,
          error: 'Failed to fetch feeds',
        });
      }
    });

    // Error handling middleware
    app.use(notFound);
    app.use(errorHandler);

    // Start server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
      logger.info(`Admin panel: http://localhost:${port}/admin`);
      logger.info(`API docs: http://localhost:${port}/api/docs`);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the application
start();