import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth, jobPosting, routes, skill, applicant, notifications, messages } from './controllers/routes.js'
import { serveStatic } from 'hono/serve-static';
import { promises as fs } from 'fs'
import path from 'path'

const app = new Hono()

// Add CORS middleware
app.use('/*', cors({
  origin: ['http://localhost:5173'], // Your frontend URL
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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



app.use('/uploads/*', serveStatic({
  root: './',
  rewriteRequestPath: (path) => path.replace(/^\/uploads/, '/backend/public/uploads'),
  getContent: async (filePath) => {
    const filename = filePath.replace(/^\/+/, '')
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png)$/i.test(filename)) {
      return null // Reject malformed filenames
    }
    const absPath = path.join('./backend/public/uploads', filename)
    return await fs.readFile(absPath)
  }
}))

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

// Add a test route
app.get('/test', (c) => {
  return c.json({ message: 'Server is working!' });
});

console.log('Starting server...');
serve({
  fetch: app.fetch,
  port: 3111
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
