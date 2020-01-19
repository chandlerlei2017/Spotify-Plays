import React from 'react';
import Background from '../assets/headphones2.jpg';

const authUrlData = {
  endpoint: 'https://accounts.spotify.com/authorize',
  clientId: process.env.REACT_APP_CLIENT_ID,
  responseType: 'token',
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  scopes: ['user-read-recently-played', 'user-top-read'],
};

const authUrl = `${authUrlData.endpoint}?client_id=${authUrlData.clientId}&redirect_uri=${authUrlData.redirectUri}&scope=${authUrlData.scopes.join(
  '%20',
)}&response_type=${authUrlData.responseType}`;

function Login({ setDemo }) {
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Background})` }}>
        <h1 className="mb-5 title">Spotify-Tracks</h1>
        <div className="row">
          <div className="col-sm-6">
            <a className="btn btn-primary login-button pl-5 pr-5" href={authUrl}>
              LOGIN
            </a>
          </div>
          <div className="col-sm-6">
            <button className="btn btn-primary login-button pl-5 pr-5" onClick={setDemo}>
              DEMO
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Login;
