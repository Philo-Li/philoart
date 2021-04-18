import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePhoto from '../../hooks/usePhoto';
import PhotoRelatedTagBar from '../others/PhotoRelatedTagBar';
import PhotoDetailsContainer from './PhotoDetailsContainer';
import RelatedPhotos from './RelatedPhotos';

const PhotoDetails = ({ authorizedUser }) => {
  const [photoToShow, setPhotoToShow] = useState();
  const { id } = useParams();
  const { photo } = usePhoto({ id });

  useEffect(() => {
    if (photo) {
      if (!authorizedUser) {
        const updatedPhoto = { ...photo, isLiked: false };
        setPhotoToShow(updatedPhoto);
      } else {
        const photoLikes = photo.likes && photo.likes.edges
          ? photo.likes.edges.map((edge) => edge.node)
          : [];

        const findUserLike = photoLikes && photoLikes
          .find((like) => like.user.id === authorizedUser.id);

        const photoInCollections = photo.collections && photo.collections.edges
          ? photo.collections.edges.map((edge) => edge.node.collection)
          : [];

        const userCollections = authorizedUser.collectionCount !== 0
          ? authorizedUser.collections.edges.map((edge) => edge.node)
          : [];

        const collectionsToShow = userCollections && userCollections.map((collection) => {
          const findCollected = photoInCollections.find((obj) => obj.id === collection.id);
          return findCollected != null
            ? { ...collection, isCollected: true }
            : { ...collection, isCollected: false };
        });
        const updatedPhoto = {
          ...photo,
          isLiked: findUserLike != null,
          allCollectionsToShow: collectionsToShow,
        };
        setPhotoToShow(updatedPhoto);
      }
    }
  }, [photo, authorizedUser]);

  // console.log('authorizedUser', authorizedUser);
  // console.log('photo', photoToShow);

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
