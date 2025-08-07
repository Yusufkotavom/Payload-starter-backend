import Bree from 'bree';
import path from 'path';
import logger from './utils/logger';

// Initialize Bree job scheduler
const bree = new Bree({
  // Jobs directory
  jobsDirectory: path.join(__dirname, '../jobs'),
  
  // Default job limit (0 = unlimited)
  defaultJobLimit: 0,
  
  // Default job concurrency (0 = unlimited)
  defaultJobConcurrency: 0,
  
  // Close worker after job completion (in milliseconds)
  closeWorkerAfterMs: 500,
  
  // Disable deprecation warnings
  disableDeprecationWarnings: false,
  
  // Logger configuration
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    custom: (level, message, meta) => {
      const timestamp = new Date().toISOString();
      logger.info(`[CRON] ${message}`, meta);
    },
  },
  
  // Job timeout (in milliseconds)
  jobTimeout: 300000, // 5 minutes
  
  // Retry configuration
  retry: {
    maxAttempts: 3,
    delay: 5000,
    backoff: true,
  },
  
  // Job scheduling
  scheduling: {
    timezone: 'UTC',
    defaultSchedule: '0 * * * *', // Every hour
  },
  
  // Job validation
  validation: {
    validateJobFiles: true,
    requiredProperties: ['name', 'handler'],
  },
  
  // Performance monitoring
  monitoring: {
    enabled: true,
    metrics: {
      jobExecutionTime: true,
      jobSuccessRate: true,
      workerUtilization: true,
    },
  },
  
  // Error handling
  errorHandling: {
    globalErrorHandler: (error, jobName) => {
      logger.error(`Global error in job ${jobName}:`, error);
      
      // Send error to monitoring service (e.g., Sentry)
      if (process.env.SENTRY_DSN) {
        // Sentry.captureException(error);
      }
    },
    
    jobErrorHandlers: {
      'rssFetcher': (error) => {
        logger.error('RSS Fetcher error:', error);
        // Send notification to admin
      },
      'aiContentGenerator': (error) => {
        logger.error('AI Content Generator error:', error);
        // Log to AI service monitoring
      },
      'publishScheduler': (error) => {
        logger.error('Publish Scheduler error:', error);
        // Send urgent notification
      },
    },
  },
  
  // Job dependencies
  dependencies: {
    executionOrder: [
      'rssFetcher',
      'aiContentGenerator',
      'publishScheduler',
    ],
    jobDependencies: {
      'publishScheduler': ['rssFetcher', 'aiContentGenerator'],
    },
  },
  
  // Environment-specific configuration
  environments: {
    development: {
      defaultJobLimit: 1,
      closeWorkerAfterMs: 1000,
      logger: {
        level: 'debug',
      },
    },
    production: {
      defaultJobLimit: 0,
      closeWorkerAfterMs: 500,
      logger: {
        level: 'info',
      },
      monitoring: {
        enabled: true,
      },
    },
    test: {
      defaultJobLimit: 1,
      closeWorkerAfterMs: 100,
      logger: {
        level: 'error',
      },
    },
  },
});

// Start Bree
const startCronJobs = async () => {
  try {
    logger.info('Starting cron job scheduler...');
    
    // Start Bree
    await bree.start();
    
    logger.info('Cron job scheduler started successfully');
    
    // Log available jobs
    const jobs = bree.getJobs();
    logger.info(`Loaded ${jobs.length} cron jobs:`, jobs.map(job => job.name));
    
  } catch (error) {
    logger.error('Failed to start cron job scheduler:', error);
    process.exit(1);
  }
};

// Stop Bree
const stopCronJobs = async () => {
  try {
    logger.info('Stopping cron job scheduler...');
    await bree.stop();
    logger.info('Cron job scheduler stopped successfully');
  } catch (error) {
    logger.error('Error stopping cron job scheduler:', error);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down cron jobs gracefully');
  await stopCronJobs();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down cron jobs gracefully');
  await stopCronJobs();
  process.exit(0);
});

// Export functions
export { startCronJobs, stopCronJobs, bree };

// Start if this file is run directly
if (require.main === module) {
  startCronJobs();
}