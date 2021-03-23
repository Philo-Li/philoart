import React from 'react';
import { Button } from 'react-bootstrap';

const PhotoRelatedTagBar = ({ photo }) => {
  if (photo === undefined) return null;

  const tags1 = photo.labels;

  let tags = tags1.split(',');

  if (tags.length > 10) {
    tags = tags.splice(0, 10);
  }

  return (
    <div>
      <div className="scrollmenu">
        <h5 className="p-3 container-row-tag">Related tags</h5>
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

export default PhotoRelatedTagBar;
