import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { routes } from './controllers/routes.js'

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

// Mount routes at root level since the proxy will handle the /api prefix
routes.forEach((route) => {
  app.route('', route);
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
