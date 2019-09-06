import React from 'react';
import * as $ from 'jquery';
import Track from './Track.js'

const urlData = {
  endpoint: "https://api.spotify.com/v1/me/top/",
  type: "tracks",
  limit: "50",
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
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.props.token);
      },
      success: (data) => {
        let tracks = [];
        for (let i = 0; i < data.total; i++) {
          tracks.push(data.items[i].name);
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
        <Track key={i} num={i + 1} name={this.state.trackList[i]}></Track>
      )
    }
    return(
      <div> 
        <h5>Top tracks for time period: {this.props.timeFrame} </h5>
        {dispTracks}
      </div>
    );
  }
}

export default TopTracks