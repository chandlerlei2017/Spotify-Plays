import React from 'react';
import Artist from './Artist';
import { authContext } from './AuthContext';
import Header from './Header';
import axios from 'axios';
import { artistsUrl } from '../../Client';

class TopArtists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
    };
  }
  static contextType = authContext;

  componentDidMount() {
    const timeRange = this.props.timeFrame;

    axios.get(artistsUrl(timeRange)).then(({ data }) => {
      const artists = [];
      for (let i = 0; i < data.items.length; i++) {
        const imageLink = data.items[i].images[2] || data.items[i].images[1] || { url: 'logo.png' };

        artists.push({
          name: data.items[i].name,
          artistLink: data.items[i].external_urls.spotify,
          imageLink: imageLink.url,
          popularity: data.items[i].popularity,
        });
      }

      this.setState(prevState => ({
        artists: [...prevState.artists, ...artists],
      }));
    });
  }

  render() {
    const artistList = this.state.artists.map((artist, index) => {
      return (
        <Artist num={index + 1} key={artist.name} artist={artist}>
          {' '}
        </Artist>
      );
    });

    const mapping = {
      short_term: ['Short Term', 'last 4 weeks'],
      medium_term: ['Medium Term', 'last 6 months'],
      long_term: ['Long Term', 'last several years'],
    };

    return (
      <React.Fragment>
        <Header title={`Top Artists (${mapping[this.props.timeFrame][0]})`} id="topArtists">
          {`${mapping[this.props.timeFrame][0]} represents playing history from the ${mapping[this.props.timeFrame][1]}`}
        </Header>
        <div className="row">{artistList}</div>
      </React.Fragment>
    );
  }
}

export default TopArtists;
