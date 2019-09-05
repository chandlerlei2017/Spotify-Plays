import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import LoginButton from './LoginButton.js'

const authUrl = {
  endpoint: "https://accounts.spotify.com/authorize",
  clientId: "dd1a4178a17d46a0a922c0a19dfc148c",
  responseType: "token",
  redirectUri: "http://localhost:3000",
  scopes: ["user-read-recently-played","user-top-read"],
};

function authBuilder() {
  return `${authUrl.endpoint}?client_id=${authUrl.clientId}&redirect_uri=${authUrl.redirectUri}&scope=${authUrl.scopes.join('%20')}&response_type=${authUrl.responseType}`;
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authToken: '',
    };
    this.loginClick = this.loginClick.bind(this);
  }

  loginClick() {
    alert(authBuilder());
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LoginButton onClick={this.loginClick}></LoginButton>
        </header>
      </div>
    );
  }
}

export default App;
