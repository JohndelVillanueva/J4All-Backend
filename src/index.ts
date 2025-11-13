import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { 
  auth, 
  jobPosting, 
  routes, 
  skill, 
  applicant, 
  notifications, 
  messages, 
  photos, 
  interview, 
  admin,
  recommendations
} from './controllers/routes.js'
import { serveStatic } from 'hono/serve-static';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import path from 'path';
import fs from 'fs/promises';

const app = new Hono()

// Environment configuration
const PORT = process.env.PORT || 3111;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const MAX_BODY_SIZE = parseInt(process.env.MAX_FILE_SIZE || '10485760'); // 10MB default

// Serve static files (uploads, images, etc.)
app.use("/uploads/*", serveStatic({
  root: './',
  getContent: async (filePath: string, c) => {
    console.log('Requested filePath for static:', filePath);
    const fullPath = path.join(process.cwd(), 'public', filePath);
    console.log('Resolved fullpath for static:', fullPath);
    try {
      const fileBuffer = await fs.readFile(fullPath);
      return new Uint8Array(fileBuffer);
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }
}));

// ==================== BODY SIZE LIMIT MIDDLEWARE ====================
// This prevents 413 errors by checking request size before processing
app.use('*', async (c, next) => {
  const contentLength = c.req.header('content-length');
  
  if (contentLength) {
    const size = parseInt(contentLength);
    const sizeMB = (size / 1024 / 1024).toFixed(2);
    
    // Log file upload attempts
    if (size > 1024 * 1024) { // Only log if > 1MB
      console.log(`📦 Large request detected: ${sizeMB}MB`);
    }
    
    if (size > MAX_BODY_SIZE) {
      const maxSizeMB = (MAX_BODY_SIZE / 1024 / 1024).toFixed(1);
      console.error(`❌ Request too large: ${sizeMB}MB (max: ${maxSizeMB}MB)`);
      
      return c.json({
        success: false,
        error: 'Request entity too large',
        message: `The uploaded files exceed the maximum size limit of ${maxSizeMB}MB. Please compress your images and try again.`,
        details: {
          received: `${sizeMB}MB`,
          maximum: `${maxSizeMB}MB`,
          suggestion: 'Compress images to under 1MB each before uploading'
        }
      }, 413);
    }
  }
  
  await next();
});

// CORS middleware
app.use('/*', cors({
  origin: [FRONTEND_URL],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}));

// Request logging middleware
app.use('*', async (c, next) => {
  const startTime = Date.now();
  const method = c.req.method;
  const path = c.req.path;
  
  // Enhanced logging for file uploads
  const contentLength = c.req.header('content-length');
  const contentType = c.req.header('content-type');
  
  let logMessage = `[${new Date().toISOString()}] ${method} ${path}`;
  
  if (contentLength && parseInt(contentLength) > 1024 * 1024) {
    const sizeMB = (parseInt(contentLength) / 1024 / 1024).toFixed(2);
    logMessage += ` [${sizeMB}MB]`;
  }
  
  if (contentType?.includes('multipart/form-data')) {
    logMessage += ` [FILE UPLOAD]`;
  }
  
  console.log(logMessage);
  
  await next();
  
  const duration = Date.now() - startTime;
  const status = c.res.status;
  const statusEmoji = status >= 500 ? '❌' : status >= 400 ? '⚠️' : '✅';
  
  console.log(`${statusEmoji} Response: ${status} (${duration}ms)`);
});

// Mount API routes
const mountRoutes = (routes: readonly any[], prefix: string = '/api') => {
  console.log(`📍 Mounting ${routes.length} route(s) at prefix: ${prefix}`);
  routes.forEach((route, index) => {
    console.log(`  - Route ${index + 1}: Mounting...`);
    app.route(prefix, route);
  });
};

// Mount all route groups
console.log('\n🔧 Starting route registration...\n');
mountRoutes(routes);
mountRoutes(auth);
mountRoutes(interview, '/api/interview');
mountRoutes(skill);
mountRoutes(jobPosting);
mountRoutes(applicant);

// Mount specific route groups with custom prefixes
mountRoutes(notifications, '/api/notifications');
mountRoutes(messages, '/api/messages');
mountRoutes(photos, '/api/photos');
mountRoutes(admin, '/api/admin');

// Mount the recommendation routes
mountRoutes(recommendations, '/api/recommendations');

console.log('\n✅ Route registration complete\n');

// Debug route to check what routes are registered
app.get('/debug-routes', (c) => {
  return c.json({
    message: 'Debug endpoint - checking route registration',
    info: 'Routes should be available',
    testEndpoints: [
      'GET /api/stats',
      'POST /api/login',
      'GET /health',
      'POST /api/recommendations/jobs',
      'GET /api/recommendations/skills',
      'GET /api/recommendations/stats'
    ]
  });
});

// Health check route
app.get('/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    config: {
      maxBodySize: `${(MAX_BODY_SIZE / 1024 / 1024).toFixed(1)}MB`,
      frontendUrl: FRONTEND_URL,
      port: PORT
    }
  });
});

// Test route (for development)
if (process.env.NODE_ENV === 'development') {
  app.get('/test', (c) => {
    return c.json({ 
      message: 'Server is working!',
      uploadLimits: {
        maxBodySize: `${(MAX_BODY_SIZE / 1024 / 1024).toFixed(1)}MB`,
        maxLogoSize: `${(parseInt(process.env.MAX_LOGO_SIZE || '5242880') / 1024 / 1024).toFixed(1)}MB`,
        maxPhotoSize: `${(parseInt(process.env.MAX_PHOTO_SIZE || '5242880') / 1024 / 1024).toFixed(1)}MB`
      }
    });
  });
}

// Global error handler for catching unhandled errors
app.onError((err, c) => {
  console.error('Global error handler caught:', err);
  
  // Handle payload too large errors
  if (err.message.includes('payload') || 
      err.message.includes('too large') || 
      err.message.includes('LIMIT_FILE_SIZE')) {
    return c.json({
      success: false,
      error: 'Request entity too large',
      message: 'The uploaded files are too large. Please compress your images (recommended: under 1MB each) and try again.',
    }, 413);
  }
  
  // Handle multipart form data errors
  if (err.message.includes('multipart')) {
    return c.json({
      success: false,
      error: 'Invalid file upload',
      message: 'There was an error processing your file upload. Please ensure you are uploading valid image files.',
    }, 400);
  }
  
  // Use the custom error handler
  return errorHandler(err, c);
});

// 404 handler for unmatched routes
app.notFound(notFoundHandler);

// Start server
console.log('Starting J4PWDs server...');
serve({
  fetch: app.fetch,
  port: Number(PORT)
}, (info) => {
  const maxSizeMB = (MAX_BODY_SIZE / 1024 / 1024).toFixed(1);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 J4IPWDs server is running on http://localhost:${info.port}`);
  console.log(`📱 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📦 Max upload size: ${maxSizeMB}MB`);
  console.log(`${'='.repeat(60)}\n`);
  
  console.log('📋 Upload Configuration:');
  console.log(`  - Max request body: ${maxSizeMB}MB`);
  console.log(`  - Max logo size: ${(parseInt(process.env.MAX_LOGO_SIZE || '5242880') / 1024 / 1024).toFixed(1)}MB`);
  console.log(`  - Max photo size: ${(parseInt(process.env.MAX_PHOTO_SIZE || '5242880') / 1024 / 1024).toFixed(1)}MB`);
  console.log(`  - Upload directory: public/uploads`);
  console.log(`${'='.repeat(60)}\n`);
  
  console.log('Available test endpoints:');
  console.log(`  - http://localhost:${info.port}/health`);
  console.log(`  - http://localhost:${info.port}/test`);
  console.log(`  - http://localhost:${info.port}/debug-routes`);
  console.log(`  - http://localhost:${info.port}/api/stats`);
  console.log(`  - http://localhost:${info.port}/api/recommendations/skills`);
  console.log(`${'='.repeat(60)}\n`);
});