import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { signup } from '../controllers/auth.controller'

const app = new Hono()

// Middleware
app.use('*', cors())

// Routes
app.post('/api/signup', signup)

// Health Check
app.get('/', (c) => c.text('J4All API is running'))

export default {
  fetch: app.fetch
}