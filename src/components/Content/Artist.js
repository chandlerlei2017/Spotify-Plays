import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';

function Artist({ num, artist: { name, artistLink, imageLink, popularity } }) {
  return (
    <div className="row track p-3 ml-3 mb-3 mr-3 rounded transition-3d-hover">
      <div className="col-sm-6 center text-left">
        <a href={artistLink} target="_blank" rel="noopener noreferrer" className="s-link row">
          <span className="center">{num}:</span>
          <img src={imageLink} alt={name + 'name'} className="track-image rounded ml-3 mr-3"></img>
          <span className="center">{name}</span>
        </a>
      </div>
      <div className="col-sm-6 center">
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped bg-orange progress-bar-animated"
            style={{ width: `${popularity}%` }}
            role="progressbar"
            aria-valuenow={popularity}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <strong>{popularity}</strong>
          </div>
          <div>
            <FontAwesomeIcon className="fire center" icon={faFireAlt} size="2x" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
