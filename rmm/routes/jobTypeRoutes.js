import express from 'express';
import { createJobType, getAllJobTypes } from '../controllers/jobTypeController';
const router = express.Router();

router.post('/', createJobType);
router.get('/', getAllJobTypes);

export default router;
