import React from 'react';
import TagBar from './TagBar';

const PhotoRelatedTagBar = ({ photo }) => {
  if (photo === undefined) return null;

  const tags1 = photo.tags;

  let tags = tags1.split(',');

  if (tags.length > 10) {
    tags = tags.slice(0, 10);
  }

  return (
    <div>
      <h5 className="p-3 container-row-tag">Related tags</h5>
      <TagBar tagToShow={tags} />
    </div>
  );
};

export default PhotoRelatedTagBar;
