import React from 'react';
import { Button } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import NanoPhotoCard from '../others/photo-card/NanoPhotoCard';

const breakpointColumnsObj = {
  default: 5,
  800: 2,
  500: 1,
};

const RelatedPhotoListContainer = ({ allPhotos, clickFetchMore }) => (
  <div className="p-3 daily-cover-container">
    <div className="">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {allPhotos.map((photo) => (
          <NanoPhotoCard
            key={photo.id}
            photo={photo}
          />
        ))}
      </Masonry>
    </div>
    <div className="row-item-2">
      <Button variant="outline-secondary" onClick={clickFetchMore}>
        <i className="bi bi-three-dots" />
        More photos
      </Button>
    </div>
  </div>
);

export default RelatedPhotoListContainer;
