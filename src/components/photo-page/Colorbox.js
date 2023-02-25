import React from 'react';

const Colorbox = ({ color }) => (
  <div>
    <div className="scrollmenu">
      <div className="">
        <div className="colorbox" style={{ backgroundColor: color }}>
          <div className="colorbox-colorname">
            {color}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Colorbox;
