import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createUserController, userLogin } from './controllers/users/index' // Import signup and userLogin controllers

const app = new Hono()

// Middleware
app.use('*', cors())

// Routes
app.post('/api/signup', createUserController )
app.post('/api/login', userLogin) // Assuming you have a login controller

// Health Check
app.get('/', (c) => c.text('J4All API is running'))

export default {
  fetch: app.fetch
}