import React from 'react';
import './App.scss';
import TopTracks from './components/TopTracks.js'
import TopArtists from './components/TopArtists.js'
import RecentPlayed from './components/RecentPlayed.js'
import * as $ from 'jquery';
import Background from './assets/headphones2.jpg'
import {authContext} from './components/AuthContext.js'
import ButtonGroup from './components/ButtonGroup.js'

const testUrl = 'https://api.spotify.com/v1/me'

const authUrlData = {
  endpoint: 'https://accounts.spotify.com/authorize',
  clientId: process.env.REACT_APP_CLIENT_ID,
  responseType: 'token',
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  scopes: ['user-read-recently-played','user-top-read'],
};

const authUrl = `${authUrlData.endpoint}?client_id=${authUrlData.clientId}&redirect_uri=${authUrlData.redirectUri}&scope=${authUrlData.scopes.join('%20')}&response_type=${authUrlData.responseType}`;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authToken: '',
      loaded: false,
      term: 'short_term',
    };
    this.termOnClick = this.termOnClick.bind(this);
  }

  async componentDidMount() {
    const token = window.location.hash.split('&')[0].split('=')[1];

    if(token) {
      try {
        await $.ajax({
          url: testUrl,
          type: 'GET',
          beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
          },
          success: () => {
            this.setState({
              authToken: token,
            });
          },
        });
      } catch(e) {
        console.log(e);
      }
    }

    this.setState({
      loaded: true,
    });
  }

  termOnClick(e) {
    console.log(e.target.id);
    this.setState({
      term: e.target.id,
    });
  }

  render() {
    if (this.state.loaded === false) {
      return (null);
    }
    else if (!(this.state.authToken)) {
      return (
        <div className='App'>
          <header className='App-header' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Background})`}}>
              <h1 className='mb-5 title'>Spotify-Plays</h1>
              <a className='btn btn-primary login-button pl-5 pr-5' href={authUrl}>LOGIN</a>
          </header>
        </div>
      );
    } 
    else {
      return (
        <div className='p-3'>
          <authContext.Provider value={this.state.authToken}>
            <RecentPlayed></RecentPlayed>
            <h2 className="mb-5">Top Tracks: </h2>
            
            <ButtonGroup selected={this.state.term} onClick={e => this.termOnClick(e)}></ButtonGroup>

            <TopTracks timeFrame='short_term' display={this.state.term}></ TopTracks>
            <TopTracks timeFrame='medium_term' display={this.state.term}></ TopTracks>
            <TopTracks timeFrame='long_term' display={this.state.term}></ TopTracks>
            <div className="row">
              <div className="col-sm-4">
                <TopArtists timeFrame='short_term'></ TopArtists>
              </div>
              <div className="col-sm-4">
                <TopArtists timeFrame='medium_term'></ TopArtists>
              </div>
              <div className="col-sm-4">
                <TopArtists timeFrame='long_term'></ TopArtists>
              </div>
            </div>
          </authContext.Provider>
        </div>
      );
    }
  }
}

export default App;
