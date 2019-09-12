import React from 'react';

function Header(props) {
  return (
    <div className={props.margin === false ? '' : 'mt-5 mb-5'}>
      <h2 className={props.color} id={props.id}>{props.title}</h2>
      <span className='text-grey'>{props.children}</span>
    </div>
  );
}

export default Header;
