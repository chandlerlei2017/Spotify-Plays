import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireAlt } from '@fortawesome/free-solid-svg-icons'

function Artist (props) {
  return (
    <div className='row track p-3 ml-3 mb-3 mr-3 rounded transition-3d-hover'>
      <div className='col-sm-6 center text-left'>
        <a href={props.artist.artistLink} target='_blank' rel='noopener noreferrer' className='s-link row'>
          <span className='center'>{props.num}:</span>
          <img src={props.artist.imageLink} alt={props.artist.name + 'name'} className='track-image rounded ml-3 mr-3'></img>
          <span className='center'>{props.artist.name}</span>
        </a>
      </div>
      <div className='col-sm-6 center'>
        <div className="progress">
          <div className="progress-bar progress-bar-striped bg-orange progress-bar-animated" style={{width: `${props.artist.popularity}%`}} role="progressbar" aria-valuenow={props.artist.popularity} aria-valuemin="0" aria-valuemax="100">
            <strong>{props.artist.popularity}</strong>
          </div>
          <div>
            <FontAwesomeIcon className='fire center' icon={faFireAlt} size='2x' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
