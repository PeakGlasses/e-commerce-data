// src/server/routes/userRoutes.ts
import { Router } from 'express';
import { userController } from '../controllers/UserController';

const router = Router();

// Register user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Get user profile
router.get('/me', userController.getProfile);

export default router;
