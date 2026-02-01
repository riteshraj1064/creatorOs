import express from 'express';
import {
  getChannel,
  getVideos,
  getVideoAnalytics
} from '../controllers/youtube.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/channel', requireAuth, getChannel);
router.get('/videos', requireAuth, getVideos);
router.get('/videos/:id/analytics', requireAuth, getVideoAnalytics);

export default router;
