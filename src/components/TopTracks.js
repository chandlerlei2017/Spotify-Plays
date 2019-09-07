import React from 'react';
import * as $ from 'jquery';
import Track from './Track.js'

const urlData = {
  endpoint: 'https://api.spotify.com/v1/me/top/',
  type: 'tracks',
  limit: '50',
};

class TopTracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackList: [],
    }
  }
  componentDidMount() {
    const timeRange = this.props.timeFrame;
    const tracksUrl = `${urlData.endpoint + urlData.type}?limit=${urlData.limit}&time_range=${timeRange}`;

    $.ajax({
      url: tracksUrl,
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.props.token);
      },
      success: (data) => {
        const tracks = [];
        for (let i = 0; i < data.items.length; i++) {
          const artists = [];

          for (let j = 0; j < data.items[i].artists.length; j++) {
            artists.push(data.items[i].artists[j].name);
          }

          tracks.push({
            name: data.items[i].name,
            album: data.items[i].album.name,
            artists: artists
          });
        }

        this.setState(prevState => ({
          trackList: [...prevState.trackList, ...tracks],
        }));
      }
    });
  }

  render() {
    const dispTracks = [];

    for (let i = 0; i < this.state.trackList.length; i++) {
      dispTracks.push(
        <React.Fragment>
          <Track key={i} num={i + 1} name={ this.state.trackList[i].name } artists={ this.state.trackList[i].artists } album={ this.state.trackList[i].album }></Track>
          <div className='col-sm-12'><hr className="track-divider"/></div>
        </React.Fragment>
      )
    }
    return(
      <div className = 'mt-5'>
        <h2 className="mb-5">Top tracks for time period: {this.props.timeFrame} </h2>
        <div className='row'>
          {dispTracks}
        </div>
      </div>
    );
  }
}

export default TopTracks;
