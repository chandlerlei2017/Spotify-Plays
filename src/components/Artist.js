import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireAlt } from '@fortawesome/free-solid-svg-icons'

class Artist extends React.Component {
  render() {
    return (
      <div className='row track p-3 ml-3 mb-3 mr-3 rounded transition-3d-hover'>
        <div className='col-sm-6 center text-left'>
          <a href={this.props.artist.artistLink} target='_blank' rel='noopener noreferrer' className='s-link row'>
            <span className='center'>{this.props.num}:</span>
            <img src={this.props.artist.imageLink} alt={this.props.artist.name + 'name'} className='track-image rounded ml-3 mr-3'></img>
            <span className='center'>{this.props.artist.name}</span>
          </a>
        </div>
        <div className='col-sm-6 center'>
          <div className="progress">
            <div className="progress-bar progress-bar-striped bg-danger progress-bar-animated" style={{width: `${this.props.artist.popularity}%`}} role="progressbar" aria-valuenow={this.props.artist.popularity} aria-valuemin="0" aria-valuemax="100">
              <strong>{this.props.artist.popularity}</strong>
            </div>
            <div>
              <FontAwesomeIcon className='fire center' icon={faFireAlt} size='2x' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Artist;