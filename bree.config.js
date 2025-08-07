module.exports = {
  // Default job limit (0 = unlimited)
  defaultJobLimit: 0,
  
  // Default job concurrency (0 = unlimited)
  defaultJobConcurrency: 0,
  
  // Close worker after job completion (in milliseconds)
  closeWorkerAfterMs: 500,
  
  // Disable deprecation warnings
  disableDeprecationWarnings: false,
  
  // Jobs directory
  jobsDirectory: 'jobs',
  
  // Workers configuration
  workers: {
    // Worker message handler
    workerMessageHandler: (message, workerId, jobName) => {
      console.log(`Worker ${workerId} sent message for job ${jobName}:`, message);
    },
  },
  
  // Logger configuration
  logger: {
    // Log level
    level: process.env.LOG_LEVEL || 'info',
    
    // Custom logger
    custom: (level, message, meta) => {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, meta || '');
    },
  },
  
  // Job timeout (in milliseconds)
  jobTimeout: 300000, // 5 minutes
  
  // Retry configuration
  retry: {
    // Maximum retry attempts
    maxAttempts: 3,
    
    // Retry delay (in milliseconds)
    delay: 5000,
    
    // Exponential backoff
    backoff: true,
  },
  
  // Job scheduling
  scheduling: {
    // Timezone
    timezone: 'UTC',
    
    // Default cron schedule
    defaultSchedule: '0 * * * *', // Every hour
  },
  
  // Job validation
  validation: {
    // Validate job files
    validateJobFiles: true,
    
    // Required job properties
    requiredProperties: ['name', 'handler'],
  },
  
  // Performance monitoring
  monitoring: {
    // Enable performance monitoring
    enabled: true,
    
    // Metrics collection
    metrics: {
      jobExecutionTime: true,
      jobSuccessRate: true,
      workerUtilization: true,
    },
  },
  
  // Error handling
  errorHandling: {
    // Global error handler
    globalErrorHandler: (error, jobName) => {
      console.error(`Global error in job ${jobName}:`, error);
      
      // Send error to monitoring service (e.g., Sentry)
      if (process.env.SENTRY_DSN) {
        // Sentry.captureException(error);
      }
    },
    
    // Job-specific error handlers
    jobErrorHandlers: {
      'rssFetcher': (error) => {
        console.error('RSS Fetcher error:', error);
        // Send notification to admin
      },
      'aiContentGenerator': (error) => {
        console.error('AI Content Generator error:', error);
        // Log to AI service monitoring
      },
      'publishScheduler': (error) => {
        console.error('Publish Scheduler error:', error);
        // Send urgent notification
      },
    },
  },
  
  // Job dependencies
  dependencies: {
    // Job execution order
    executionOrder: [
      'rssFetcher',
      'aiContentGenerator',
      'publishScheduler',
    ],
    
    // Job dependencies
    jobDependencies: {
      'publishScheduler': ['rssFetcher', 'aiContentGenerator'],
    },
  },
  
  // Environment-specific configuration
  environments: {
    development: {
      // Development-specific settings
      defaultJobLimit: 1,
      closeWorkerAfterMs: 1000,
      logger: {
        level: 'debug',
      },
    },
    production: {
      // Production-specific settings
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
      // Test-specific settings
      defaultJobLimit: 1,
      closeWorkerAfterMs: 100,
      logger: {
        level: 'error',
      },
    },
  },
};