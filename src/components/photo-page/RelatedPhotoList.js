import React from 'react';
import RelatedPhotoListContainer from './RelatedPhotoListContainer';

const HomePhotoList = ({
  allPhotos, setAllPhotos, clickFetchMore,
}) => {
  if (allPhotos === undefined) return null;

  return (
    <div>
      <RelatedPhotoListContainer
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default HomePhotoList;
