import React from 'react';

class Track extends React.Component {
  render() {
    const artistList = [];

    for (let artist of Object.keys(this.props.track.artists)) {
      artistList.push(
        <React.Fragment key={artist}>
          <a href={this.props.track.artists[artist]} target='_blank' className='s-link' rel='noopener noreferrer'>{artist}</a>
        </React.Fragment>
      );
      artistList.push(
        <React.Fragment key={artist+'-1'}>{', '}</React.Fragment>
      )
    }
    artistList.splice(-1,1);

    return(
      <React.Fragment>
        <div className='col-sm-3'>
          <a href={this.props.track.play} target='_blank' className='s-link' rel='noopener noreferrer'>{this.props.num + ': ' + this.props.track.name}</a>
        </div>
        <div className='col-sm-3 row'>
          <div className='col-sm-2'>
            <img src={this.props.track.image} alt={this.props.track.album + 'name'} className='track-image rounded'></img>
            {' '}
          </div>
          <div className='col-sm-10'>
            <a href={this.props.track.albumLink} target='_blank' className='s-link' rel='noopener noreferrer'>{this.props.track.album}</a>
          </div>
        </div>
        <div className='col-sm-3'>{artistList}</div>
      </React.Fragment>
    );
  }
}

export default Track;
