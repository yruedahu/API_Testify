import { Router } from "express";
import userRoutes from "./user.routes.js";

const router = Router();

// Usar las rutas de usuarios
router.use('/apiTestify/v1/users', userRoutes);

export default router;
