import React from 'react';
import * as $ from 'jquery';
import Artist from './Artist.js'

const urlData = {
  endpoint: 'https://api.spotify.com/v1/me/top/',
  type: 'artists',
  limit: '50',
};


class TopArtists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
    };
  }

  componentDidMount() {
    const timeRange = this.props.timeFrame;
    const artistsUrl = `${urlData.endpoint + urlData.type}?limit=${urlData.limit}&time_range=${timeRange}`;

    $.ajax({
      url: artistsUrl,
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.props.token);
      },
      success: (data) => {
        const artists = [];
        for (let i = 0; i < data.items.length; i++) {
          artists.push({
            name: data.items[i].name,
            artistLink: data.items[i].external_urls.spotify,
            imageLink: data.items[i].images[2].url,
            popularity: data.items[i].popularity,
          });
        }

        this.setState(prevState => ({
          artists: [...prevState.artists, ...artists],
        }));
      }
    });
  }

  render() {
    const artistList = this.state.artists.map((artist, index) => {
      return <Artist num={index+1} key={artist.name} artist={artist}> </Artist>
    });

    const mapping = {
      'short_term': 'Short Term',
      'medium_term': 'Medium Term',
      'long_term': 'Long Term',
    }

    return(
      <React.Fragment>
        <h2 className="mt-5 mb-5">Top Artists ({mapping[this.props.timeFrame]}): </h2>
        <div className='row'>
          {artistList}
        </div>
      </React.Fragment>
    );
  }
}

export default TopArtists;
