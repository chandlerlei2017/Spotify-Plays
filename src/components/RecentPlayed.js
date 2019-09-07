import React from 'react';
import * as $ from 'jquery';
import Track from './Track.js'

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
          let artists = {};

          for (let j = 0; j < data.items[i].track.artists.length; j++) {
            artists[data.items[i].track.artists[j].name] = data.items[i].track.artists[j].external_urls.spotify;
          }

          tracks.push({
            name: data.items[i].track.name,
            album: data.items[i].track.album.name,
            artists: artists,
            image: data.items[i].track.album.images[2].url,
            play: data.items[i].track.external_urls.spotify,
            albumLink: data.items[i].track.album.external_urls.spotify,
            popularity: data.items[i].track.popularity,
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
      let dispDate;
      if (date.toDateString() === today.toDateString()) {
        dispDate = date.toLocaleTimeString();
      }
      else {
        dispDate = date.toLocaleDateString();
      }
      dispTracks.push(
        <React.Fragment key={i}>
          <Track num={i + 1} track={this.state.trackList[i]}></Track>
          <div className='col-sm-3'>{dispDate}</div>
          <div className='col-sm-12'><hr className="track-divider"/></div>
        </React.Fragment>
      )
    }

    return(
      <div className = 'mt-5'>
        <h2 className="mb-5">Recently Played Tracks: </h2>
        <div className='row'>
          {dispTracks}
        </div>
      </div>
    );
  }
}

export default RecentPlayed;
