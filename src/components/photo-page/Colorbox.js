import React from 'react';

const Colorbox = ({ color }) => (
  <div>
    <div className="scrollmenu">
      <div className="">
        <div className="color-box" style={{ backgroundColor: color }} />
      </div>
    </div>
  </div>
);

export default Colorbox;
