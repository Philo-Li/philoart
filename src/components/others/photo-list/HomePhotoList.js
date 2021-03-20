import React from 'react';
import HomePhotoListContainer from './HomePhotoListContainer';

const HomePhotoList = ({
  allPhotos, setAllPhotos, clickFetchMore,
}) => {
  if (allPhotos === undefined) return null;

  return (
    <div>
      <HomePhotoListContainer
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default HomePhotoList;
