import React from 'react';
import './App.scss';
import TopTracks from './components/TopTracks.js'
import TopArtists from './components/TopArtists.js'
import RecentPlayed from './components/RecentPlayed.js'
import * as $ from 'jquery';
import Background from './assets/headphones2.jpg'
import {authContext} from './components/AuthContext.js'
import ButtonGroup from './components/ButtonGroup.js'
import Header from './components/Header.js'

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

  humanizeTerm() {
    const terms = {
      'short_term': ['Short Term', 'last 4 weeks'],
      'medium_term': ['Medium Term', 'last 6 months'],
      'long_term': ['Long Term', 'last several years'],
    }

    return terms[this.state.term];
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
      const terms = this.humanizeTerm();

      return (
        <React.Fragment>
          <div className="pos-f-t sticky">
            <div className="collapse" id="navbarToggleExternalContent">
              <div className="bg-navbar p-4 row">
                <div className='col-sm-3'>
                  <Header title={'Spotify-Plays'} margin={false} color='text-green'>
                    A web app that provides data for Spotify playing history
                  </Header>
                </div>
                <div className='col-sm-3 center text-center'>
                  <a className='btn btn-primary login-button pl-5 pr-5' href='#recentPlayed'>Recently Played</a>
                </div>
                <div className='col-sm-3 center text-center'>
                  <a className='btn btn-primary login-button pl-5 pr-5' href='#topTracks'>Top Tracks</a>
                </div>
                <div className='col-sm-3 center text-center'>
                  <a className='btn btn-primary login-button pl-5 pr-5' href='#topArtists'>Top Artists</a>
                </div>
              </div>
            </div>
            <nav className="navbar navbar-dark rounded nav-dark">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>
          </div>
          <div className='p-3 mt-5'>
            <authContext.Provider value={this.state.authToken}>
              <RecentPlayed></RecentPlayed>
              <Header title={`Top Tracks (${terms[0]})`} id='topTracks'>
                {`${terms[0]} represents playing history from the ${terms[1]}`}
              </Header>
              
              <ButtonGroup selected={this.state.term} onClick={e => this.termOnClick(e)}></ButtonGroup>

              <TopTracks timeFrame='short_term' display={this.state.term}></ TopTracks>
              <TopTracks timeFrame='medium_term' display={this.state.term}></ TopTracks>
              <TopTracks timeFrame='long_term' display={this.state.term}></ TopTracks>
              <div className="row" id='topArtists'>
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
        </React.Fragment>
      );
    }
  }
}

export default App;
