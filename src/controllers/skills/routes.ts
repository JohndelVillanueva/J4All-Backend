import { Hono } from 'hono';
import { getAllSkillsController } from './index.js';
import { authMiddleware } from '../../utils/auth.js';

const skill = new Hono()

.get('/getAllSkill', getAllSkillsController)

export default skill;