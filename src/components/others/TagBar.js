import React from 'react';
import { Link } from 'react-router-dom';

const TagBar = ({ tagToShow }) => {
  let tags = ['nature', 'animals', 'people', 'travel', 'food', 'sea', 'texture', 'interiors', 'art'];
  if (tagToShow) tags = tagToShow;

  return (
    <div>
      <div className="scrollmenu">
        <div className="p-3 container-row-tag">
          {tags.map((tag) => (
            <div key={tag}>
              <Link to={`/pickysearch?q=${tag}`}>{tag}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagBar;
