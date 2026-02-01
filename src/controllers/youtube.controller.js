import { google } from 'googleapis';

export const getChannel = async (req, res) => {
  const youtube = google.youtube({ version: 'v3', auth: req.googleAuth });

  const response = await youtube.channels.list({
    part: 'snippet,statistics',
    mine: true
  });

  res.json(response.data.items[0]);
};

export const getVideos = async (req, res) => {
  const youtube = google.youtube({ version: 'v3', auth: req.googleAuth });

  const response = await youtube.search.list({
    part: 'snippet',
    forMine: true,
    type: 'video',
    maxResults: 25
  });

  res.json(response.data.items);
};

export const getVideoAnalytics = async (req, res) => {
  const analytics = google.youtubeAnalytics({
    version: 'v2',
    auth: req.googleAuth
  });

  const response = await analytics.reports.query({
    ids: 'channel==MINE',
    startDate: '2023-01-01',
    endDate: '2025-01-01',
    metrics: 'views,watchTime,averageViewDuration,likes',
    dimensions: 'day',
    filters: `video==${req.params.id}`
  });

  res.json(response.data);
};
