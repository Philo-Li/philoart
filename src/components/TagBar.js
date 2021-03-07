/* eslint-disable max-len */
import React from 'react';
import { Button } from 'react-bootstrap';
import '../index.css';

const TagBar = ({
  setNewSearchValue,
}) => {
  const tags = ['wallpaper', 'nature', 'animals', 'people', 'travel', 'food', 'sea', 'texture', 'interiors', 'Art'];

  return (
    <div>
      <div className="scrollmenu">
        <div className="p-3 container-row-tag">
          {tags.map((tag) => (
            <div className="" key={tag}>
              <Button variant="outline-dark" size="sm" onClick={() => setNewSearchValue(tag)}>
                {tag}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagBar;
