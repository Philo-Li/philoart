/* eslint-disable object-curly-newline */
import React from 'react';
import '../index.css';
import HomePhotoListContainer from './HomePhotoListContainer';

// eslint-disable-next-line react/prefer-stateless-function
const HomePhotoList = ({ allPhotos, setAllPhotos, clickFetchMore }) => {
  if (allPhotos === undefined) return null;

  // const allPhotos = photos.edges
  //   ? photos.edges.map((edge) => edge.node)
  //   : [];

  console.log('all photo list', allPhotos);

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
