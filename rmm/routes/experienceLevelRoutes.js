import express from 'express';
import { createExperienceLevel, getAllExperienceLevels } from '../controllers/experienceLevelController';
const router = express.Router();

router.post('/', createExperienceLevel);
router.get('/', getAllExperienceLevels);

export default router;
