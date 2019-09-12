import React from 'react';

function ButtonGroup(props) {
  const selected = props.selected;

  return(
    <div className="btn-group full-width transition-3d-hover" role="group" aria-label="Term Selector">
      <button type="button" id='short_term' onClick={props.onClick} className={`btn btn-secondary button-term pt-2 pb-2 ${selected === 'short_term' ? 'button-term-selected' : ''}`}>Short</button>
      <button type="button" id='medium_term' onClick={props.onClick} className={`btn btn-secondary button-term pt-2 pb-2 ${selected === 'medium_term' ? 'button-term-selected' : ''}`}>Medium</button>
      <button type="button" id='long_term' onClick={props.onClick} className={`btn btn-secondary button-term pt-2 pb-2 ${selected === 'long_term' ? 'button-term-selected' : ''}`}>Long</button>
    </div>
  );
}

export default ButtonGroup;