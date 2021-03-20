import React from 'react';
import HomePhotoListContainer from './HomePhotoListContainer';

const HomePhotoList = ({
  allPhotos, authorizedUser, setAllPhotos, clickFetchMore,
}) => {
  if (allPhotos === undefined) return null;

  if (authorizedUser && allPhotos[0].allCollectionsToShow === undefined) return null;

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
