import express from 'express';
import { registerHost, verifyHostRegistration } from '../controllers/hostAuthController.js';

const router = express.Router();

router.post('/register', registerHost);
router.post('/verify', verifyHostRegistration);

export default router;
