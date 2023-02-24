import React, { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const options = ['None', 'Selling', 'Sold', 'Unavailable'];

// eslint-disable-next-line no-unused-vars
const StatusButton = ({ setStatus }) => {
  const [selected, setSelected] = useState('None');

  useEffect(() => {
    // setLicense(options[selectedIndex]);
    // setLicense(1);
  }, [selected]);

  const handleToggle = (option) => {
    setSelected(option);
    setStatus(option);
  };

  return (
    <div className="license-btn">
      <div className="dropdown">
        <button className="dropbtn container-row-searchbar" type="button">
          {selected}
          <ArrowDropDownIcon />
        </button>
        <div className="dropdown-content">
          {options.map((option) => (
            <button key={option} className="content-dropbtn" type="button" onClick={() => handleToggle(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusButton;
