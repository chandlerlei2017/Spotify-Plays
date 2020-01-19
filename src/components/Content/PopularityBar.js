import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';

function PopularityBar({ popularity }) {
  return (
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
  );
}

export default PopularityBar;
