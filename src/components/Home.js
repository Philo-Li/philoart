/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';
import '../index.css';
import usePhotos from '../hooks/usePhotos';
import HomePhotoList from './HomePhotoList';
import SearchBar from './SearchBar';
import TagBar from './TagBar';

const Home = ({
  authorizedUser,
}) => {
  const [allPhotos, setAllPhotos] = useState();

  const { photos, fetchMore } = usePhotos({ first: 30 });

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
  }, [photos, authorizedUser]);

  const clickFetchMore = () => {
    fetchMore();
  };

  // console.log('picky: photos', photos);
  // console.log('picky: updatedAllPhotos', allPhotos);
  // console.log('picky: authorizedUser', authorizedUser);

  return (
    <div>
      <div>
        <Jumbotron className="jumbotron">
          <h1 className="header-home">Discover the best free stock photos.</h1>
          <p className="header">
            Free to use. Redirect to download.
          </p>
          <SearchBar />
        </Jumbotron>
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

export default Home;
