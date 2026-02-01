import jwt from 'jsonwebtoken';
import { oauth2Client } from '../utils/googleClient.js';

const SCOPES = [
  'openid',
  'profile',
  'email',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/yt-analytics.readonly'
];

export const googleLogin = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES
  });
console.log(url)
  res.redirect(url);
};

export const googleCallback = async (req, res) => {
  try {
    console.log('🔥 Google callback hit');
    console.log('Query:', req.query);

    const { code } = req.query;

    if (!code) {
      return res.status(400).send('No code received');
    }

    const { tokens } = await oauth2Client.getToken(code);
    console.log('✅ Tokens received');

    oauth2Client.setCredentials(tokens);

    const jwtToken = jwt.sign(
      {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('➡️ Redirecting to Expo');
    console.log(`creatoros://auth?token=${jwtToken}`);
    res.redirect(`creatoros://auth?token=${jwtToken}`);
  } catch (err) {
    console.error('❌ OAuth Error:', err);
    res.status(500).send('OAuth failed');
  }
};

