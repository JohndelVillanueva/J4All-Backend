// import { Hono } from 'hono'
// import { cors } from 'hono/cors'
// import { createUserController, userLoginController,createEmployerController } from './controllers/auth/index' // Import signup and userLogin controllers

// const app = new Hono()

// // Middleware
// app.use('*', cors())

// // Auth Routes
// app.post('/api/createw', createUserController )
// app.post('/api/login', userLoginController) // Assuming you have a login controller
// app.post('/api/createEmployer', createEmployerController) // Assuming you have a createEmployer controller

// // Health Check
// app.get('/', (c) => c.text('J4All API is running'))

// export default {
//   fetch: app.fetch
// }