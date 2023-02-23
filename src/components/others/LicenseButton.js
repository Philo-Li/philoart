import React, { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const options = ['CC BY', 'CC BY-SA', 'CC BY-NC', 'CC BY-NC-SA', 'CC-BY-ND', 'CC BY-NC-ND'];

// eslint-disable-next-line no-unused-vars
const LicenseButton = ({ setLicense }) => {
  const [selected, setSelected] = useState('CC BY');

  useEffect(() => {
    // setLicense(options[selectedIndex]);
    // setLicense(1);
  }, [selected]);

  const handleToggle = (option) => {
    setSelected(option);
    setLicense(option);
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

export default LicenseButton;
