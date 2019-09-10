import React from 'react';
import * as $ from 'jquery';
import Track from './Track.js'
import {Doughnut} from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

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
      trackList: [],
      artistPlays: new Map(),
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
        let artistPlays = new Map();

        for (let i = 0; i < data.items.length; i++) {
          let artists = {};

          for (let j = 0; j < data.items[i].track.artists.length; j++) {
            const artistName = data.items[i].track.artists[j].name;
            artists[artistName] = data.items[i].track.artists[j].external_urls.spotify;

            if (artistPlays.has(artistName)) {
              artistPlays.set(artistName,  artistPlays.get(artistName) + 1);
            }
            else {
              artistPlays.set(artistName, 1);
            }
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
          artistPlays: artistPlays,
        }));
      }
    });
  }

  render() {
    const dispTracks = [];

    for (let i = 0; i < this.state.trackList.length; i++) {
      const date = parseISOString(this.state.trackList[i].playedAt);
      const today = new Date();

      let dispDate = '';
      if (date.toDateString() === today.toDateString()) {
        dispDate = date.toLocaleTimeString();
      }
      else if ((today-date)/3600000 < 24) {
        dispDate = 'Yesterday - ' + date.toLocaleTimeString();
      }
      else {
        dispDate = date.toLocaleDateString();
      }
      dispTracks.push(
        <Track key={i} num={i + 1} track={this.state.trackList[i]} dispDate={dispDate}></Track>
      )
    }

    const pieChartData = {
      labels: [...this.state.artistPlays.keys()],
      datasets: [{
        data: [...this.state.artistPlays.values()],
      }],
    }

    const pieChartOptions = {
      legend: {
        display: false,
      },
      plugins: {
        colorschemes: {
            scheme: 'brewer.Paired12'
        }
      }
    }

    const lineGraphData = {

    }

    const lineGraphOptions = {

    }

    return(
      <div className = 'mt-5'>
        <h2 className="mb-5">Recently Played Tracks: </h2>
        <div className='row'>
          <div className='col-sm-6'>
            <div className='p-3 ml-3 mb-3 mr-3 track rounded'>
              <Doughnut data={pieChartData} options={pieChartOptions}/>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='p-3 ml-3 mb-3 mr-3 track rounded'>
              test
            </div>
          </div>

          <div className='pl-3 pr-3 row full-width ml-3 mr-3'>
            <div className='col-sm-3 center'>
              <h4>Song</h4>
            </div>
            <div className='col-sm-3 center'>
              <h4>Album</h4>
            </div>
            <div className='col-sm-2 center'>
              <h4>Artists</h4>
            </div>
            <div className='col-sm-4 center row'>
              <div className='col-sm-8 center'>
                <h4>Popularity</h4>
              </div>
              <div className='col-sm-4 center'>
                <h4>Played</h4>
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

export default RecentPlayed;
