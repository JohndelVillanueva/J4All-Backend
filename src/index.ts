import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth, jobPosting, routes, skill, applicant, notifications, messages, photos } from './controllers/routes.js'
import { serveStatic } from 'hono/serve-static';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import path from 'path';
import fs from 'fs/promises';

const app = new Hono()

// Serve static files (uploads, images, etc.) FIRST
app.use('/uploads/*', serveStatic({
  getContent: async (filePath, c) => {
    console.log('Requested filePath for static:', filePath);
    const fullPath = path.join(process.cwd(), 'public', filePath);
    console.log('Resolved fullPath for static:', fullPath);
    try {
      return await fs.readFile(fullPath);
    } catch (e) {
      console.error('Error reading file:', e);
      return null;
    }
  }
}));


// Add CORS middleware
// Add CORS middleware
app.use('/*', cors({
  origin: ['http://localhost:5173'], // Your frontend URL
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}))

// Add request logging middleware
app.use('*', async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`);
  await next();
  console.log(`Response status: ${c.res.status}`);
});

app.use('*', async (c, next) => {
  console.log(`[${new Date().toISOString()}] ${c.req.method} ${c.req.path}`);
  await next();
  console.log(`Response: ${c.res.status}`);
});

// Mount routes with /api prefix
routes.forEach((route) => {
  app.route('/api', route);
});

auth.forEach((authRoute) => {
  app.route('/api', authRoute);
});
skill.forEach((skillRoutes) => {
  app.route('/api', skillRoutes);
});

jobPosting.forEach((jobRoute) => {
  app.route('/api', jobRoute);
});

applicant.forEach((applicantRoute) => {
  app.route('/api', applicantRoute);
});

notifications.forEach((notificationRoute) => {
  app.route('/api/notifications', notificationRoute);
});

messages.forEach((messageRoute) => {
  app.route('/api/messages', messageRoute);
});

photos.forEach((photoRoute) => {
  app.route('/api/photos', photoRoute);
});

// Add a test route
app.get('/test', (c) => {
  return c.json({ message: 'Server is working!' });
});

// Add error handling middleware (must be last)
app.onError(errorHandler);

// Add 404 handler for unmatched routes
app.notFound(notFoundHandler);

console.log('Starting server...');
serve({
  fetch: app.fetch,
  port: 3111
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
