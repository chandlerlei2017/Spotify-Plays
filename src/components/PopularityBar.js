import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireAlt } from '@fortawesome/free-solid-svg-icons'

function PopularityBar(props) {
  return (
    <div className="progress">
      <div className="progress-bar progress-bar-striped bg-orange progress-bar-animated" style={{width: `${props.popularity}%`}} role="progressbar" aria-valuenow={props.popularity} aria-valuemin="0" aria-valuemax="100">
        <strong>{props.popularity}</strong>
      </div>
      <div>
        <FontAwesomeIcon className='fire center' icon={faFireAlt} size='2x' />
      </div>
    </div>
  );
}

export default PopularityBar;