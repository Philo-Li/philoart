import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePhoto from '../../hooks/usePhoto';
import PhotoRelatedTagBar from '../others/PhotoRelatedTagBar';
import PhotoDetailsContainer from './PhotoDetailsContainer';
import RelatedPhotos from './RelatedPhotos';

const PhotoDetails = ({ authorizedUser }) => {
  const [photoToShow, setPhotoToShow] = useState();
  const { id } = useParams();
  const { photo } = usePhoto({
    id,
    checkUserLike: !authorizedUser ? 'lq3d6VSwSwDlv3mqJr7RE' : authorizedUser.id,
  });

  useEffect(() => {
    if (photo) {
      setPhotoToShow(photo);
    }
  }, [photo, authorizedUser]);

  return (
    <div>
      <PhotoDetailsContainer
        photoToShow={photoToShow}
        setPhotoToShow={setPhotoToShow}
        authorizedUser={authorizedUser}
      />
      <PhotoRelatedTagBar photo={photoToShow} />
      <RelatedPhotos authorizedUser={authorizedUser} photoToShow={photoToShow} />
    </div>
  );
};

export default PhotoDetails;
