import React from 'react';
import '../index.css';
import PhotoListContainer from './PhotoListContainer';

// eslint-disable-next-line react/prefer-stateless-function
const HomePhotoList = ({ photos }) => {
  if (photos === undefined) return null;

  const allPhotos = photos.edges
    ? photos.edges.map((edge) => edge.node)
    : [];

  console.log('all photo list', allPhotos);

  return (
    <div className="p-3">
      <PhotoListContainer allPhotos={allPhotos} />
    </div>
  );
};

export default HomePhotoList;
