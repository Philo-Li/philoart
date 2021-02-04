/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React from 'react';
import '../index.css';
import HomePhotoListContainer from './HomePhotoListContainer';

// eslint-disable-next-line react/prefer-stateless-function
const HomePhotoList = ({ allPhotos, setAllPhotos, clickFetchMore, allCollections, setAllCollections }) => {
  if (allPhotos === undefined) return null;

  console.log('all photo list', allPhotos);
  console.log('all collection list', allCollections);

  return (
    <div className="p-3">
      <HomePhotoListContainer
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
        allCollections={allCollections}
        setAllCollections={setAllCollections}
      />
    </div>
  );
};

export default HomePhotoList;
