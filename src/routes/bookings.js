import express from 'express';
import { reserveSeat, getAllBookings } from '../controllers/bookingsController.js';

const router = express.Router();

router.post('/reserve', reserveSeat);
router.get('/', getAllBookings);

export default router;
