import React from 'react';
import { Button } from 'react-bootstrap';

const TagBar = () => {
  const tags = ['wallpaper', 'nature', 'animals', 'people', 'travel', 'food', 'sea', 'texture', 'interiors', 'Art'];

  return (
    <div>
      <div className="scrollmenu">
        <div className="p-3 container-row-tag">
          {tags.map((tag) => (
            <div className="" key={tag}>
              <Button variant="outline-dark" size="sm" href={`/search?q=${tag}`}>
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
