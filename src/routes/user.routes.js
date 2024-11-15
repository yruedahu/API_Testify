import { Router } from 'express'
import { getUsers, getUserById, updateUserById, deleteUserById } from '../controllers/usersController.js'
import { login, register } from '../controllers/authController.js'
import { verifyTokenMiddleware } from '../middlewares/authMiddleware.js';

const userRoutes = Router()

userRoutes.post('/auth/register', register);
userRoutes.post('/auth/login', login);
userRoutes.get('/getUsers', verifyTokenMiddleware, getUsers)
userRoutes.get('/getUserById/:id', verifyTokenMiddleware, getUserById)
userRoutes.put('/updateUserById/:id', verifyTokenMiddleware, updateUserById);
userRoutes.delete('/deleteUserById/:id', verifyTokenMiddleware, deleteUserById);

export default userRoutes