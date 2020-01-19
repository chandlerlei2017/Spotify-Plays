import React from 'react';
import './App.scss';
import Login from './components/Login';
import Content from './components/Content/index';
import * as $ from 'jquery';

const testUrl = 'https://api.spotify.com/v1/me';

class App extends React.Component {
  constructor(props) {
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

    if (token) {
      try {
        await $.ajax({
          url: testUrl,
          type: 'GET',
          beforeSend: xhr => {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
          },
          success: () => {
            this.setState({
              authToken: token,
            });
          },
        });
      } catch (e) {
        console.log(e);
      }
    }

    this.setState({
      loaded: true,
    });
  }

  termOnClick(e) {
    this.setState({
      term: e.target.id,
    });
  }

  render() {
    if (this.state.loaded === false) {
      return null;
    } else if (!this.state.authToken) {
      return <Login />;
    } else {
      return <Content authToken={this.state.authToken} term={this.state.term} termOnClick={this.termOnClick} />;
    }
  }
}

export default App;
