import express from 'express';
import { createState} from '../controllers/stateController';

const router =  express.Router();
router.post('/createstate' , createState);
export default router;