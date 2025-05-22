import { Hono } from 'hono';
import {  createEmployerController, createUserController, userLoginController } from './index.js';


const auth = new Hono()

.post('/login', userLoginController ) 
.post('/create', createUserController)
.post('/employers', createEmployerController)

export default auth;

