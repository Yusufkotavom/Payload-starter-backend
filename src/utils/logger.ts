import winston from 'winston';

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'payloadcms-backend' },
  transports: [
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    // Write all logs with level 'info' and below to combined.log
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    }),
  ],
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Custom log levels
const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

// Helper functions for specific log types
export const logInfo = (message: string, meta?: any) => {
  logger.info(message, meta);
};

export const logError = (message: string, error?: any) => {
  logger.error(message, { error: error?.message || error, stack: error?.stack });
};

export const logWarn = (message: string, meta?: any) => {
  logger.warn(message, meta);
};

export const logDebug = (message: string, meta?: any) => {
  logger.debug(message, meta);
};

// AI-specific logging
export const logAIGeneration = (prompt: string, result: any, duration: number) => {
  logger.info('AI Content Generation', {
    prompt: prompt.substring(0, 100) + '...',
    success: result.success,
    contentLength: result.content?.length || 0,
    duration: `${duration}ms`,
    model: result.model,
    usage: result.usage,
  });
};

// RSS-specific logging
export const logRSSFetch = (feedName: string, itemCount: number, success: boolean) => {
  logger.info('RSS Feed Fetch', {
    feedName,
    itemCount,
    success,
    timestamp: new Date().toISOString(),
  });
};

// Publishing-specific logging
export const logPublish = (contentId: string, targetCollection: string, success: boolean) => {
  logger.info('Content Publishing', {
    contentId,
    targetCollection,
    success,
    timestamp: new Date().toISOString(),
  });
};

// Image service logging
export const logImageFetch = (provider: string, query: string, success: boolean, count: number) => {
  logger.info('Image Service Fetch', {
    provider,
    query,
    success,
    count,
    timestamp: new Date().toISOString(),
  });
};

// Plugin-specific logging
export const logPluginAction = (pluginName: string, action: string, success: boolean, details?: any) => {
  logger.info('Plugin Action', {
    pluginName,
    action,
    success,
    details,
    timestamp: new Date().toISOString(),
  });
};

// Performance logging
export const logPerformance = (operation: string, duration: number, metadata?: any) => {
  logger.info('Performance', {
    operation,
    duration: `${duration}ms`,
    metadata,
    timestamp: new Date().toISOString(),
  });
};

// Error logging with context
export const logErrorWithContext = (message: string, error: any, context: any) => {
  logger.error(message, {
    error: error?.message || error,
    stack: error?.stack,
    context,
    timestamp: new Date().toISOString(),
  });
};

// API request logging
export const logAPIRequest = (method: string, url: string, statusCode: number, duration: number) => {
  logger.info('API Request', {
    method,
    url,
    statusCode,
    duration: `${duration}ms`,
    timestamp: new Date().toISOString(),
  });
};

// Database operation logging
export const logDBOperation = (operation: string, collection: string, success: boolean, duration: number) => {
  logger.info('Database Operation', {
    operation,
    collection,
    success,
    duration: `${duration}ms`,
    timestamp: new Date().toISOString(),
  });
};

// Cron job logging
export const logCronJob = (jobName: string, success: boolean, duration: number, details?: any) => {
  logger.info('Cron Job', {
    jobName,
    success,
    duration: `${duration}ms`,
    details,
    timestamp: new Date().toISOString(),
  });
};

export default logger;