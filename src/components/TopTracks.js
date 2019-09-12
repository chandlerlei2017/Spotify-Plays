import React from 'react';
import * as $ from 'jquery';
import Track from './Track.js'
import {authContext} from './AuthContext.js'

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
  static contextType = authContext;

  componentDidMount() {
    const timeRange = this.props.timeFrame;
    const tracksUrl = `${urlData.endpoint + urlData.type}?limit=${urlData.limit}&time_range=${timeRange}`;

    $.ajax({
      url: tracksUrl,
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.context);
      },
      success: (data) => {
        const tracks = [];
        for (let i = 0; i < data.items.length; i++) {
          const artists = {};

          for (let j = 0; j < data.items[i].artists.length; j++) {
            artists[data.items[i].artists[j].name] = data.items[i].artists[j].external_urls.spotify;
          }

          tracks.push({
            name: data.items[i].name,
            album: data.items[i].album.name,
            artists: artists,
            image: data.items[i].album.images[2].url,
            play: data.items[i].external_urls.spotify,
            popularity: data.items[i].popularity,
            albumLink: data.items[i].album.external_urls.spotify
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
        <Track key={ this.state.trackList[i].name } num={i + 1} track={ this.state.trackList[i] }></Track>
      )
    }
    const display = this.props.timeFrame === this.props.display ? 'block' : 'none';

    return(
      <div className = 'mt-5 display-transition' style={{display: display}}>
        <div className='row'>
          <div className='pl-3 pr-3 row full-width ml-3 mr-3'>
            <div className='col-sm-3 center'>
              <h4>Song</h4>
            </div>
            <div className='col-sm-3 center'>
              <h4>Album</h4>
            </div>
            <div className='col-sm-3 center'>
              <h4>Artists</h4>
            </div>
            <div className='col-sm-3 center row'>
              <div className='col-sm-12'>
                <h4>Popularity</h4>
              </div>
            </div>
          </div>
          <hr className='track-divider ml-3 mr-3'/>
          {dispTracks}
        </div>
      </div>
    );
  }
}

export default TopTracks;
