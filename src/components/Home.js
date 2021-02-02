/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';
import '../index.css';
import usePhotos from '../hooks/usePhotos';
import HomePhotoList from './HomePhotoList';
import SearchBar from './SearchBar';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

// eslint-disable-next-line react/prefer-stateless-function
const Home = ({ searchValue, newSearchValue, setNewSearchValue }) => {
  const [allPhotos, setAllPhotos] = useState();
  const { authorizedUser } = useAuthorizedUser();

  const variables = {
    searchKeyword: newSearchValue,
    first: 15,
  };

  const { photos, fetchMore } = usePhotos(variables);

  useEffect(() => {
    if (photos) {
      const temp = photos && photos.edges
        ? photos.edges.map((edge) => edge.node)
        : [];

      const updatedAllPhotos = temp.map((photo) => {
        const photoLikes = photo.likes && photo.likes.edges
          ? photo.likes.edges.map((edge) => edge.node)
          : [];

        const findUser = photoLikes.find((like) => like.user.id === authorizedUser.id);
        return findUser ? { ...photo, isLiked: true } : { ...photo, isLiked: false };
      });
      console.log('updatedAllPhotos', updatedAllPhotos);

      setAllPhotos(updatedAllPhotos);
    }
  }, [photos]);

  const clickFetchMore = () => {
    fetchMore();
    console.log('now photos', photos);
    console.log('now all photos', allPhotos);
  };

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
      />
    </div>
  );
};

export default Home;
