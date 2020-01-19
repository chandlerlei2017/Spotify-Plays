import React from 'react';
import * as $ from 'jquery';
import Track from './Track';
import { authContext } from './AuthContext';
import { Doughnut, Bar } from 'react-chartjs-2';
import axios from 'axios';

const urlData = {
  endpoint: 'https://api.spotify.com/v1/me/top/',
  type: 'tracks',
  limit: '50',
};

const popLabels = ['0-9', '10-19', '20-39', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90-100'];

class TopTracks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackList: [],
      artistPlays: new Map(),
      popularityArr: [],
    };
    this.tickMin = this.tickMin.bind(this);
  }
  static contextType = authContext;

  componentDidMount() {
    const timeRange = this.props.timeFrame;
    const tracksUrl = `${urlData.endpoint + urlData.type}?limit=${urlData.limit}&time_range=${timeRange}`;

    axios.get(tracksUrl).then(({ data }) => {
      const tracks = [];
      let artistPlays = new Map();
      let popularityArr = Array(10).fill(0);

      for (let i = 0; i < data.items.length; i++) {
        const artists = {};

        for (let j = 0; j < data.items[i].artists.length; j++) {
          const artistName = data.items[i].artists[j].name;
          artists[data.items[i].artists[j].name] = data.items[i].artists[j].external_urls.spotify;

          if (artistPlays.has(artistName)) {
            artistPlays.set(artistName, artistPlays.get(artistName) + 1);
          } else {
            artistPlays.set(artistName, 1);
          }
        }

        tracks.push({
          name: data.items[i].name,
          album: data.items[i].album.name,
          artists: artists,
          image: data.items[i].album.images[2].url,
          play: data.items[i].external_urls.spotify,
          popularity: data.items[i].popularity,
          albumLink: data.items[i].album.external_urls.spotify,
        });
        if (data.items[i].popularity === 100) {
          popularityArr[9] += 1;
        } else {
          popularityArr[Math.floor(data.items[i].popularity / 10)] += 1;
        }
      }

      this.setState(prevState => ({
        trackList: [...prevState.trackList, ...tracks],
        artistPlays: artistPlays,
        popularityArr: popularityArr,
      }));
    });
  }

  tickMin() {
    let index = 0;

    for (let i = 0; i < 10; i++) {
      if (this.state.popularityArr[i] === 0) {
        index++;
      } else {
        break;
      }
    }

    return popLabels[index];
  }

  render() {
    const dispTracks = [];

    for (let i = 0; i < this.state.trackList.length; i++) {
      dispTracks.push(<Track key={this.state.trackList[i].name} num={i + 1} track={this.state.trackList[i]}></Track>);
    }

    let style;
    let className = '';

    if (this.props.timeFrame === this.props.display) {
      style = {
        visibility: 'visible',
        height: '100%',
        opacity: '1',
      };
      className = 'display-transition';
    } else {
      style = {
        visibility: 'hidden',
        height: '0',
        opacity: '0',
      };
    }

    const pieChartData = {
      labels: [...this.state.artistPlays.keys()],
      datasets: [
        {
          data: [...this.state.artistPlays.values()],
        },
      ],
    };

    const pieChartOptions = {
      legend: {
        display: false,
      },
      plugins: {
        colorschemes: {
          scheme: 'tableau.RedGold21',
        },
      },
    };

    const barData = {
      labels: popLabels,
      datasets: [
        {
          label: 'Tracks',
          backgroundColor: 'rgba(255,99,132,0.4)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.6)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.popularityArr,
        },
      ],
    };

    const barOptions = {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Popularity',
              fontColor: '#b3b3b3',
            },
            ticks: {
              min: this.tickMin(),
              fontColor: '#b3b3b3',
            },
            gridLines: {
              borderDash: [8, 4],
              drawBorder: true,
              color: '#b3b3b3',
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Tracks',
              fontColor: '#b3b3b3',
            },
            ticks: {
              fontColor: '#b3b3b3',
            },
            gridLines: {
              borderDash: [8, 4],
              drawBorder: true,
              color: '#b3b3b3',
            },
          },
        ],
      },
    };

    return (
      <div className={className} style={style}>
        <div className="row">
          <div className="col-sm-6">
            <div className="p-3 mb-5 track rounded text-center transition-3d-hover">
              <h3 className="mb-5">Artists in Tracks</h3>
              <Doughnut data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="p-3 mb-5 track rounded text-center transition-3d-hover">
              <h3 className="mb-5">Number of Tracks by Popularity</h3>
              <Bar data={barData} options={barOptions}></Bar>
            </div>
          </div>
          <div className="pl-3 pr-3 row full-width ml-3 mr-3">
            <div className="col-sm-3 center">
              <h4>Song</h4>
            </div>
            <div className="col-sm-3 center">
              <h4>Album</h4>
            </div>
            <div className="col-sm-3 center">
              <h4>Artists</h4>
            </div>
            <div className="col-sm-3 center row">
              <div className="col-sm-12">
                <h4>Track Popularity</h4>
              </div>
            </div>
          </div>
          <hr className="track-divider ml-3 mr-3" />
          {dispTracks}
        </div>
      </div>
    );
  }
}

export default TopTracks;
