import { Hono } from 'hono';
import { deleteUserController, getUserController, getUsersController, updateUserController, createUserController } from './index.js';


const router = new Hono()

.get('/users', getUsersController ) 
.post('/users', createUserController)
.get('/users/:id', getUserController)
.delete('/users/:id', deleteUserController)
.put('/users/:id', updateUserController)

export default router;

