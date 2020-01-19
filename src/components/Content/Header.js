import React from 'react';

function Header({ margin, color, id, title, children }) {
  return (
    <div className={margin === false ? '' : 'mt-5 mb-5'}>
      <h2 className={color} id={id}>
        {title}
      </h2>
      <span className="text-grey">{children}</span>
      <hr className="track-divider" />
    </div>
  );
}

export default Header;
