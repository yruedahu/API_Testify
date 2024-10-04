import { Router } from "express";
import userRoutes from "./user.routes.js";

const router = Router();

router.use('/apiTestify/v1/users', userRoutes);

export default router;
