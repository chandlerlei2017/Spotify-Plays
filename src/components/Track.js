import React from 'react';

class Track extends React.Component {
  render() {
    return(
      <React.Fragment>
        <div className='col-sm-4'>{this.props.num}: {this.props.name}</div>
        <div className='col-sm-4'>{this.props.album}</div>
        <div className='col-sm-4'>{this.props.artists.join(', ')}</div>
      </React.Fragment>
    );
  }
}

export default Track;
