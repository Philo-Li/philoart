import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePhoto from '../../hooks/usePhoto';
import PhotoRelatedTagBar from '../others/PhotoRelatedTagBar';
import PhotoDetailsContainer from './PhotoDetailsContainer';
import RelatedPhotos from './RelatedPhotos';

const PhotoDetails = () => {
  const [photoToShow, setPhotoToShow] = useState();
  const { id } = useParams();
  const userId = localStorage.getItem('userId');

  const { photo } = usePhoto({
    id,
    checkUserLike: userId,
  });

  useEffect(() => {
    if (photo) {
      setPhotoToShow(photo);
    }
  }, [photo]);

  return (
    <div>
      <PhotoDetailsContainer
        photoToShow={photoToShow}
        setPhotoToShow={setPhotoToShow}
      />
      <PhotoRelatedTagBar photo={photoToShow} />
      <RelatedPhotos photoToShow={photoToShow} />
    </div>
  );
};

export default PhotoDetails;
