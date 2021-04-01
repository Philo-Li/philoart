import React from 'react';
import Masonry from 'react-masonry-css';
import SearchPhotoCard from './SearchPhotoCard';

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

const SearchPagePhotoList = ({ allPhotos, clickFetchMore }) => (
  <div className="p-3 daily-cover-container">
    <div className="">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {allPhotos.map((photo) => (
          <SearchPhotoCard
            key={photo.id}
            photo={photo}
          />
        ))}
      </Masonry>
    </div>
    <div className="row-item-2">
      <button className="more-photos-btn" type="button" onClick={clickFetchMore}>
        <i className="bi bi-three-dots" />
        More photos
      </button>
    </div>
  </div>
);

export default SearchPagePhotoList;
