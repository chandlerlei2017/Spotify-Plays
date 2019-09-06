import React from 'react';

class Track extends React.Component {
  render() {
    return(
      <p>{this.props.num}: {this.props.name}</p>
    );
  }
}

export default Track;
