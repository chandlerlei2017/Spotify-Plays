import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopTracks from './components/TopTracks.js'
import TopArtists from './components/TopArtists.js'
import RecentPlayed from './components/RecentPlayed.js'

const authUrlData = {
  endpoint: 'https://accounts.spotify.com/authorize',
  clientId: 'dd1a4178a17d46a0a922c0a19dfc148c',
  responseType: 'token',
  redirectUri: 'https://upbeat-rosalind-c7ecc5.netlify.com/',
  scopes: ['user-read-recently-played','user-top-read'],
};

const authUrl = `${authUrlData.endpoint}?client_id=${authUrlData.clientId}&redirect_uri=${authUrlData.redirectUri}&scope=${authUrlData.scopes.join('%20')}&response_type=${authUrlData.responseType}`;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authToken: '',
    };
  }

  componentDidMount() {
    const token = window.location.hash.split('&')[0].split('=')[1];
    if(token) {
      this.setState({
        authToken: token,
      });
    }
  }

  render() {
    if (!(this.state.authToken)) {
      return (
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
              <a className='btn btn-primary' href={authUrl}>Login</a>
          </header>
        </div>
      );
    }
    else {
      return (
        <div className='p-3'>
          <p>You Have been authorized!</p>
            <RecentPlayed token={this.state.authToken}></RecentPlayed>
            <TopTracks timeFrame='short_term' token={this.state.authToken}></ TopTracks>
            <TopTracks timeFrame='medium_term' token={this.state.authToken}></ TopTracks>
            <TopTracks timeFrame='long_term' token={this.state.authToken}></ TopTracks>
            <div className="row">
              <div className="col-sm-4">
                <TopArtists timeFrame='short_term' token={this.state.authToken}></ TopArtists>
              </div>
              <div className="col-sm-4">
                <TopArtists timeFrame='medium_term' token={this.state.authToken}></ TopArtists>
              </div>
              <div className="col-sm-4">
                <TopArtists timeFrame='long_term' token={this.state.authToken}></ TopArtists>
              </div>
            </div>
        </div>
      );
    }
  }
}

export default App;
