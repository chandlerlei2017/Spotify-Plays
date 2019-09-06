import React from 'react';
import * as $ from 'jquery';

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
          artists.push(data.items[i].name);
        }

        this.setState(prevState => ({
          artists: [...prevState.artists, ...artists],
        }));
      }
    });
  }

  render() {
    const artistList = this.state.artists.map((artist, index) => {
      return <div className='col-sm-12' key={artist}>{index + 1}: {artist}</div>
    });
    
    return(
      <div className = 'mt-5'> 
        <h3>Top artists for time period: {this.props.timeFrame} </h3>
        <div className='row'>
          {artistList}
        </div>
      </div>
    );
  }
}

export default TopArtists;

