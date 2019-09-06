import React from 'react';
import * as $ from 'jquery';
import Track from './Track.js'
import { tsConditionalType } from '@babel/types';

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

const urlData = {
  endpoint: 'https://api.spotify.com/v1/me/player/recently-played',
  limit: '50',
};

class RecentPlayed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackList: []
    } 
  }
  componentDidMount() {
    const playedUrl = `${urlData.endpoint}?limit=${urlData.limit}`

    $.ajax({
      url: playedUrl,
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.props.token);
      },
      success: (data) => {
        const tracks = [];
        for (let i = 0; i < data.items.length; i++) {
          const artists = [];

          for (let j = 0; j < data.items[i].track.artists.length; j++) {
            artists.push(data.items[i].track.artists[j].name);
          }

          tracks.push({
            name: data.items[i].track.name,
            album: data.items[i].track.album.name,
            artists: artists,
            playedAt: data.items[i].played_at,
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
      const date = parseISOString(this.state.trackList[i].playedAt);
      const today = new Date();
      console.log(date);
      let dispDate;
      if (date.toDateString() === today.toDateString()) {
        dispDate = date.toLocaleTimeString();
      }
      else {
        dispDate = date.toLocaleDateString();
      }
      dispTracks.push(
        <React.Fragment key={i}>
          <Track num={i + 1} name={ this.state.trackList[i].name } artists={ this.state.trackList[i].artists } album={ this.state.trackList[i].album }></Track>
          <div className='col-sm-2'>{dispDate}</div>
        </React.Fragment>
      )
    }

    return(
      <div className = 'mt-5'> 
        <h3>Recently Played Tracks: </h3>
        <div className='row'>
          {dispTracks}
        </div>
      </div>
    );
  }
}

export default RecentPlayed;
