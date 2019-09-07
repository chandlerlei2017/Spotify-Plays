import React from 'react';

class Track extends React.Component {
  render() {
    return(
      <React.Fragment>
        <div className='col-sm-3'>
          <a href={this.props.track.play} target='_blank' className='s-link' rel='noopener noreferrer'>{this.props.num + ': ' + this.props.track.name}</a>
        </div>
        <div className='col-sm-3'>
          <img src={this.props.track.image} alt={this.props.track.album + 'name'} className='track-image rounded'></img>
          {' '}
          {this.props.track.album}
        </div>
        <div className='col-sm-3'>{this.props.track.artists.join(', ')}</div>
      </React.Fragment>
    );
  }
}

export default Track;
