import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const options = ['Picky only', 'All'];

export default function DropdownButton({ setSearchRange }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleToggle = () => {
    setSelectedIndex(selectedIndex === 0 ? 1 : 0);
    setSearchRange(options[selectedIndex]);
  };

  return (
    <div>
      <div className="dropdown">
        <button className="dropbtn" type="button">
          {options[selectedIndex]}
          <ArrowDropDownIcon />
        </button>
        <div className="dropdown-content">
          <button className="content-dropbtn" type="button" onClick={handleToggle}>
            {options[selectedIndex === 0 ? 1 : 0]}
          </button>
        </div>
      </div>
    </div>
  );
}
