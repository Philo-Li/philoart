/* eslint-disable max-len */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../index.css';
// import useAuthorizedUser from '../hooks/useAuthorizedUser';
import usePhoto from '../hooks/usePhoto';
import PhotoDetailsContainer from './PhotoDetailsContainer';

// eslint-disable-next-line react/prefer-stateless-function
const PhotoDetails = ({ authorizedUser }) => {
  const [photoToShow, setPhotoToShow] = useState();
  // const { authorizedUser } = useAuthorizedUser();
  const { id } = useParams();
  const { photo } = usePhoto({ id });
  const history = useHistory();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (photo) {
      if (!authorizedUser) {
        const updatedPhoto = { ...photo, isLiked: false };
        setPhotoToShow(updatedPhoto);
      } else {
        const photoLikes = photo.likes && photo.likes.edges
          ? photo.likes.edges.map((edge) => edge.node)
          : [];

        const findUserLike = photoLikes && photoLikes.find((like) => like.user.id === authorizedUser.id);
        const photoInCollections = photo.collections && photo.collections.edges
          ? photo.collections.edges.map((edge) => edge.node.collection)
          : [];
        const userCollections = authorizedUser.collectionCount !== 0
          ? authorizedUser.collections.edges.map((edge) => edge.node)
          : [];
        const collectionsToShow = userCollections && userCollections.map((collection) => {
          const findCollected = photoInCollections.find((obj) => obj.id === collection.id);
          let newCover;
          if (collection.photoCount !== 0) newCover = collection.photos.edges[0].node.photo.small;
          else newCover = null;
          return findCollected != null ? { ...collection, isCollected: true, cover: newCover } : { ...collection, isCollected: false, cover: newCover };
        });
        const updatedPhoto = {
          ...photo,
          isLiked: findUserLike != null,
          allCollectionsToShow: collectionsToShow,
        };
        setPhotoToShow(updatedPhoto);
      }
    }
  }, [photo]);

  console.log('authorizedUser', authorizedUser);
  console.log('photo', photoToShow);
  console.log('history', history.location.pathname, id);

  return (
    <div className="p-3">
      <PhotoDetailsContainer
        photoToShow={photoToShow}
        setPhotoToShow={setPhotoToShow}
        authorizedUser={authorizedUser}
      />
    </div>
  );
};

export default PhotoDetails;
