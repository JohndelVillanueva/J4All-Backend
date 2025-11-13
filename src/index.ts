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

// CORS middleware - MUST be first
app.use('/*', cors({
  origin: [FRONTEND_URL],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}));

// ✅ STATIC FILE SERVING - MUST come before API routes
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

// ✅ Add handler for /api/uploads/* pattern
app.get("/api/uploads/*", async (c) => {
  const requestPath = c.req.path; // e.g., /api/uploads/resume/filename.pdf
  const filePath = requestPath.replace('/api/', ''); // Remove /api/ prefix
  
  console.log('API uploads request:', requestPath);
  console.log('Looking for file:', filePath);
  
  const fullPath = path.join(process.cwd(), 'public', filePath);
  console.log('Full path:', fullPath);
  
  try {
    const fileBuffer = await fs.readFile(fullPath);
    
    // Determine content type based on file extension
    let contentType = 'application/octet-stream';
    if (filePath.endsWith('.pdf')) {
      contentType = 'application/pdf';
    } else if (filePath.endsWith('.doc')) {
      contentType = 'application/msword';
    } else if (filePath.endsWith('.docx')) {
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline'
      }
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return c.json({ 
      success: false, 
      error: 'File not found',
      path: filePath 
    }, 404);
  }
});

// Request logging middleware
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

// Mount the new recommendation routes
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
      'GET /api/recommendations/stats',
      'GET /uploads/resume/filename.pdf',
      'GET /api/uploads/resume/filename.pdf'
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

// 404 handler for unmatched routes (MUST be last)
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
  console.log(`  - http://localhost:${info.port}/api/recommendations/skills`);
  console.log(`  - http://localhost:${info.port}/uploads/resume/test.pdf (test file serving)`);
  console.log(`${'='.repeat(50)}\n`);
});