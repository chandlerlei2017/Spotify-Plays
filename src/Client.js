import axios from 'axios';

// export const initAxios = () => {};

export const setAuth = token => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  axios.defaults.baseURL = 'https://api.spotify.com/v1/me/';
};

// Request URLs

const playedUrlData = {
  endpoint: 'player/recently-played',
  limit: '50',
};

export const playedUrl = auth => (auth ? `${playedUrlData.endpoint}?limit=${playedUrlData.limit}` : './demo/recent.json');

const artistsUrlData = {
  endpoint: 'top/',
  type: 'artists',
  limit: '50',
};

export const artistsUrl = (auth, timeRange) =>
  auth ? `${artistsUrlData.endpoint + artistsUrlData.type}?limit=${artistsUrlData.limit}&time_range=${timeRange}` : `./demo/artist_${timeRange}.json`;

const urlData = {
  endpoint: 'top/',
  type: 'tracks',
  limit: '50',
};

export const tracksUrl = (auth, timeRange) =>
  auth ? `${urlData.endpoint + urlData.type}?limit=${urlData.limit}&time_range=${timeRange}` : `./demo/track_${timeRange}.json`;
