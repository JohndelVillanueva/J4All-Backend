import { Hono } from 'hono';
import {  createUserController, userLoginController } from './index.js';


const auth = new Hono()

.post('/login', userLoginController ) 
.post('/create', createUserController)

export default auth;

