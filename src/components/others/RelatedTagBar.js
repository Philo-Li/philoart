import React from 'react';
import TagBar from './TagBar';

const RelatedTagBar = ({ allPhotos }) => {
  if (allPhotos === undefined) return null;

  if (allPhotos.length === 0) {
    return (
      <div className="p-3 flex-center">
        <h3>No result</h3>
      </div>
    );
  }

  const photo = allPhotos[0];
  const tags1 = photo.labels;

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

export default RelatedTagBar;
