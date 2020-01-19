import axios from 'axios';

export const initAxios = () => {
  axios.defaults.baseURL = 'https://api.spotify.com/v1/me/';
};

export const setAuth = token => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

// Request URLs

const playedUrlData = {
  endpoint: 'player/recently-played',
  limit: '50',
};

export const playedUrl = `${playedUrlData.endpoint}?limit=${playedUrlData.limit}`;

const artistsUrlData = {
  endpoint: 'top/',
  type: 'artists',
  limit: '50',
};

export const artistsUrl = timeRange => `${artistsUrlData.endpoint + artistsUrlData.type}?limit=${artistsUrlData.limit}&time_range=${timeRange}`;

const urlData = {
  endpoint: 'top/',
  type: 'tracks',
  limit: '50',
};

export const tracksUrl = timeRange => `${urlData.endpoint + urlData.type}?limit=${urlData.limit}&time_range=${timeRange}`;
