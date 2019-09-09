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
      <div className='row track rounded p-3 ml-3 mb-3 mr-3 transition-3d-hover'>
        <div className='col-sm-3 center'>
          <a href={this.props.track.play} target='_blank' className='s-link' rel='noopener noreferrer'>{this.props.num + ': ' + this.props.track.name}</a>
        </div>
        <div className='col-sm-3 center'>
          <a href={this.props.track.albumLink} target='_blank' rel='noopener noreferrer' className='s-link row'>
            <div className='col-sm-2 center'>
              <img src={this.props.track.image} alt={this.props.track.album + 'name'} className='track-image rounded'></img>
              {' '}
            </div>
            <div className='col-sm-10 center'>
              <span>{this.props.track.album}</span>
            </div>
          </a>
        </div>
        <div className='col-sm-3 center'>{artistList}</div>
        <div className='col-sm-3 center row'>
          <div className='col-sm-6 center'>
            {this.props.track.popularity}
          </div>
          <div className='col-sm-6 center'>
            {this.props.dispDate ? this.props.dispDate : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default Track;
