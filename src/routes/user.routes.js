import { Router } from 'express'
import { getUsers } from '../controllers/usersController.js'

const userRoutes = Router()

userRoutes.get('/getUsers', getUsers)

export default userRoutes