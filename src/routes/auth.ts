import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validateLogin, validateRegister } from '../middleware/validation';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/login', validateLogin, authController.login.bind(authController));
router.post('/register', validateRegister, authController.register.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));

// Protected routes
router.get('/profile', authenticate, authController.getProfile.bind(authController));

export default router;