import React from 'react';

class Track extends React.Component {
  render() {
    return(
      <React.Fragment>
        <div className='col-sm-3'>
          {this.props.num}:
          {' '}
          {this.props.track.name}
        </div>
        <img src={this.props.track.image} alt={this.props.track.album + 'name'} className='track-image float-right rounded'></img>
        <div className='col-sm-3'>{this.props.track.album}</div>
        <div className='col-sm-3'>{this.props.track.artists.join(', ')}</div>
      </React.Fragment>
    );
  }
}

export default Track;
