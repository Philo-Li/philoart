/* eslint-disable max-len */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import { Image } from 'react-bootstrap';
import '../index.css';
import HomePhotoList from './HomePhotoList';
import useCollectionPhotos from '../hooks/useCollectionPhotos';

// eslint-disable-next-line react/prefer-stateless-function
const CollectionDetails = ({ authorizedUser }) => {
  const history = useHistory();
  const { id } = useParams();
  const [allPhotos, setAllPhotos] = useState();
  const [collectionNow, setCollectionNow] = useState();

  const variables = {
    id,
    first: 30,
  };
  const { photosInCollection, fetchMore } = useCollectionPhotos(variables);

  console.log('photosInCollection', photosInCollection, id, collectionNow);
  console.log('history', history.location.pathname);

  useEffect(() => {
    if (photosInCollection) {
      const temp = photosInCollection && photosInCollection.edges
        ? photosInCollection.edges.map((edge) => edge.node.photo)
        : [];
      setCollectionNow(photosInCollection.edges[0].node.collection);
      if (!authorizedUser) {
        const updatedAllPhotos = temp.map((photo) => ({ ...photo, isLiked: false }));
        setAllPhotos(updatedAllPhotos);
      } else {
        const updatedAllPhotos = temp.map((photo) => {
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
          return updatedPhoto;
        });
        setAllPhotos(updatedAllPhotos);
      }
    }
  }, [photosInCollection]);

  const clickFetchMore = () => {
    fetchMore();
  };

  return (
    <div>
      <div>
        <div className="col-item-4">
          { collectionNow && <h1 className="header-bold">{collectionNow.title}</h1> }
        </div>
      </div>
      <HomePhotoList
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default CollectionDetails;
