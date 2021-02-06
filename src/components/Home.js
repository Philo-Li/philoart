/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';
import '../index.css';
import usePhotos from '../hooks/usePhotos';
import useCollections from '../hooks/useCollections';
import HomePhotoList from './HomePhotoList';
import SearchBar from './SearchBar';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

const Home = ({ searchValue, newSearchValue, setNewSearchValue }) => {
  const [allPhotos, setAllPhotos] = useState();
  const [allCollections, setAllCollections] = useState();
  const { authorizedUser } = useAuthorizedUser();

  const variables = {
    searchKeyword: newSearchValue,
    first: 15,
  };

  const { photos, fetchMore } = usePhotos(variables);
  const { collections } = useCollections({
    userId: authorizedUser && authorizedUser.id,
    first: 30,
  });

  useEffect(() => {
    if (photos && allCollections) {
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
            ? photo.collections.edges.map((edge) => edge.node)
            : [];
          const collectionsToShow = allCollections.map((collection) => {
            const findCollected = photoInCollections.find((obj) => obj.id === collection.id);
            return findCollected ? { ...collection, isCollected: true } : { ...collection, isCollected: false };
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
    console.log('first photos', photos);
    console.log('updatedAllPhotos', allPhotos);
    console.log('first collections', allCollections);
  }, [photos, allCollections]);

  const clickFetchMore = () => {
    fetchMore();
  };

  useEffect(() => {
    if (authorizedUser && collections) {
      const temp = collections && collections.edges
        ? collections.edges.map((edge) => edge.node)
        : [];
      setAllCollections(temp);
    }
    console.log('first effect collections', allCollections);
  }, [collections]);

  return (
    <div>
      <div>
        <Jumbotron className="jumbotron">
          <h1 className="header">Select the best free stock photos for you.</h1>
          <p className="header">
            Free to use. Redirect to download.
          </p>
          <SearchBar searchValue={searchValue} setNewSearchValue={setNewSearchValue} />
        </Jumbotron>
      </div>
      <div className="p-3">
        <h1>hey</h1>
      </div>
      <HomePhotoList
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
        authorizedUser={authorizedUser}
      />
    </div>
  );
};

export default Home;
