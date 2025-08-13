import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import translateRouter from './routes/translate.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('✅ Language Translation API is running...');
});

app.use('/api/translate', translateRouter);

export default app;
