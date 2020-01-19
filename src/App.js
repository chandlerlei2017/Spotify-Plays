import React from 'react';
import './App.scss';
import Login from './components/Login';
import Content from './components/Content/index';
import { setAuth, initAxios } from './Client';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: '',
      loaded: false,
      term: 'short_term',
      demo: false,
    };
  }

  async componentDidMount() {
    initAxios();

    const token = window.location.hash.split('&')[0].split('=')[1];

    if (token) {
      setAuth(token);

      await axios.get().then(() => {
        this.setState({ authToken: token });
      });
    }

    this.setState({
      loaded: true,
    });
  }

  termOnClick = e => {
    this.setState({
      term: e.target.id,
    });
  };

  setDemo = () => {
    this.setState({
      demo: true,
    });
  };

  render() {
    if (this.state.loaded === false) {
      return null;
    } else if (!this.state.authToken && !this.state.demo) {
      return <Login setDemo={this.setDemo} />;
    } else {
      return <Content authToken={this.state.authToken} term={this.state.term} termOnClick={this.termOnClick} />;
    }
  }
}

export default App;
