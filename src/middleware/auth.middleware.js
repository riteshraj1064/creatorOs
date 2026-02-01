import jwt from 'jsonwebtoken';
import { oauth2Client } from '../utils/googleClient.js';

export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    oauth2Client.setCredentials({
      access_token: decoded.access_token,
      refresh_token: decoded.refresh_token
    });

    req.googleAuth = oauth2Client;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
