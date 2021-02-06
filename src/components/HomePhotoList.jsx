/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React from 'react';
import '../index.css';
import HomePhotoListContainer from './HomePhotoListContainer';

const HomePhotoList = ({ allPhotos, setAllPhotos, clickFetchMore }) => {
  if (allPhotos === undefined) return null;

  return (
    <div className="p-3">
      <HomePhotoListContainer
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default HomePhotoList;
