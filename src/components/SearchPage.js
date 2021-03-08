/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';
import usePhotos from '../hooks/usePhotos';
import HomePhotoList from './HomePhotoList';
import TagBar from './TagBar';

const SearchPage = ({ authorizedUser }) => {
  const [allPhotos, setAllPhotos] = useState();
  const { id } = useParams();

  const variables = {
    searchKeyword: id,
    first: 30,
  };

  const { photos, fetchMore } = usePhotos(variables);

  useEffect(() => {
    if (photos) {
      const temp = photos && photos.edges
        ? photos.edges.map((edge) => edge.node)
        : [];
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
  }, [photos]);

  const clickFetchMore = () => {
    fetchMore();
  };

  console.log('picky: photos', photos);
  console.log('picky: updatedAllPhotos', allPhotos);
  console.log('picky: authorizedUser', authorizedUser);
  // const tags = ['wallpaper', 'nature', 'animals', 'people', 'travel', 'food', 'sea', 'texture', 'interiors', 'Art'];

  return (
    <div>
      <div className="p-3 container-profile">
        <div className="profile-item">
          <h1>Search:</h1>
        </div>
        <div className="profile-item">
          <h1>{id}</h1>
        </div>
      </div>
      <TagBar />
      <HomePhotoList
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default SearchPage;
