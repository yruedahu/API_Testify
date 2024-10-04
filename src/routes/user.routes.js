import { Router } from 'express'
import { getUsers } from '../controllers/usersController.js'
import { login, register } from '../controllers/authController.js'
import { verifyTokenMiddleware } from '../middlewares/authMiddleware.js';

const userRoutes = Router()

userRoutes.post('/auth/register', register);
userRoutes.post('/auth/login', login);
userRoutes.get('/getUsers', verifyTokenMiddleware, getUsers)

export default userRoutes