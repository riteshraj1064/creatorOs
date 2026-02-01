import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import youtubeRoutes from './routes/youtube.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/youtube', youtubeRoutes);

export default app;
