import React from 'react';
import * as $ from 'jquery';
import Track from './Track.js'
import {Doughnut, Scatter} from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

const urlData = {
  endpoint: 'https://api.spotify.com/v1/me/player/recently-played',
  limit: '50',
};

function getTimePoint(dateMax, dateMin, date){
  // const mins = (parseISOString(dateMax) - parseISOString(dateMin))/60000;
  return 6*(parseISOString(date) - parseISOString(dateMin))/(dateMax - parseISOString(dateMin));
}

class RecentPlayed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackList: [],
      artistPlays: new Map(),
      scatterData: [],
    }
  }
  componentDidMount() {
    const playedUrl = `${urlData.endpoint}?limit=${urlData.limit}`
    const today = new Date();

    $.ajax({
      url: playedUrl,
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.props.token);
      },
      success: (data) => {
        const tracks = [];
        let artistPlays = new Map();
        let scatterData = [];

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
            console.log(getTimePoint(today, data.items[data.items.length - 1].played_at, data.items[i].played_at));
            scatterData.push(
              {
                x: getTimePoint(today, data.items[data.items.length - 1].played_at, data.items[i].played_at),
                y: 1,
              }
            )
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
          scatterData : scatterData,
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

    const scatterData = {
      labels: ['Scatter'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 4,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.scatterData
        }
      ]
    }

    const scatterOptions = {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
            ticks: {
                min: 1,
                max: 6,
                stepSize: 1,
                fontColor: '#b3b3b3',
                callback: (value, index, values) => {
                  if (value === 6) {
                    return 'Now';
                  }
                  return value;
                }
            },
            gridLines: {
              borderDash: [8, 4],
              drawBorder: false,
              color: "#b3b3b3",
            },
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 2,
            stepSize: 1,
            fontColor: '#b3b3b3',
            callback: (value) => {
              if (value === 1) {
                return '';
              }
            }
          },
          gridLines: {
            borderDash: [8, 4],
            drawBorder: false,
            color: "#b3b3b3",
          },
        }]
      }
    }

    return(
      <div className = 'mt-5'>
        <h2 className="mb-5">Recently Played Tracks: </h2>
        <div className='row'>
          <div className='col-sm-8 offset-sm-2'>
            <div className='p-3 mb-3 track rounded text-center'>
              <h3 className='mb-5'>Artists in Recent Tracks</h3>
              <Doughnut data={pieChartData} options={pieChartOptions}/>
            </div>
          </div>
          <div className='col-sm-8 offset-sm-2'>
            <div className='p-3 mb-3 track rounded text-center'>
              <h3 className='mb-5'>Recent Tracks Time Distribution</h3>
              <Scatter data={scatterData} options={scatterOptions}/>
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
