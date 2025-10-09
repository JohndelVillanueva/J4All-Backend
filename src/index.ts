import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth, jobPosting, routes, skill, applicant, notifications, messages, photos, interview, admin } from './controllers/routes.js'
import { serveStatic } from 'hono/serve-static';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import path from 'path';
import fs from 'fs/promises';

const app = new Hono()

// Environment configuration
const PORT = process.env.PORT || 3111;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Serve static files (uploads, images, etc.)
app.use("/uploads/*", serveStatic({
  root: './',
  getContent: async (filePath: string, c) => {
    console.log('Requested filePath for static:', filePath);
    const fullPath = path.join(process.cwd(), 'public', filePath);
    console.log('Resolved fullpath for static:', fullPath);
    try {
      const fileBuffer = await fs.readFile(fullPath);
      // Convert Buffer to Uint8Array which is compatible with Data type
      return new Uint8Array(fileBuffer);
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }
}));

// CORS middleware
app.use('/*', cors({
  origin: [FRONTEND_URL], // Use environment variable
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}));

// Request logging middleware (consolidated)
app.use('*', async (c, next) => {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] ${c.req.method} ${c.req.path}`);
  
  await next();
  
  const duration = Date.now() - startTime;
  console.log(`Response: ${c.res.status} (${duration}ms)`);
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
    ]
  });
});

// Health check route
app.get('/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test route (for development)
if (process.env.NODE_ENV === 'development') {
  app.get('/test', (c) => {
    return c.json({ message: 'Server is working!' });
  });
}

// Error handling middleware (must be last)
app.onError(errorHandler);

// 404 handler for unmatched routes
app.notFound(notFoundHandler);

// Start server
console.log('Starting J4PWDs server...');
serve({
  fetch: app.fetch,
  port: Number(PORT)
}, (info) => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 J4IPWDs server is running on http://localhost:${info.port}`);
  console.log(`📱 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`${'='.repeat(50)}\n`);
  console.log('Available test endpoints:');
  console.log(`  - http://localhost:${info.port}/health`);
  console.log(`  - http://localhost:${info.port}/debug-routes`);
  console.log(`  - http://localhost:${info.port}/api/stats`);
  console.log(`${'='.repeat(50)}\n`);
});