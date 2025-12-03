import express from 'express';
import dotenv from 'dotenv';
import bookingsRouter from './routes/bookings.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/bookings', bookingsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server launched on port ${process.env.PORT}`);
});
