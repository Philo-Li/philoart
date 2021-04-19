import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';
import usePhotos from '../../hooks/usePhotos';
import HomePhotoList from '../others/photo-list/HomePhotoList';
import SearchBar from '../others/search-bar/SearchBar';
import TagBar from '../others/TagBar';

const Home = ({
  authorizedUser,
}) => {
  const [allPhotos, setAllPhotos] = useState();
  const [loading, setLoading] = useState(false);

  const { photos, fetchMore } = usePhotos({ first: 30, username: 'picky' });

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

          const findUserLike = photoLikes && photoLikes
            .find((like) => like.user.id === authorizedUser.id);

          const updatedPhoto = {
            ...photo,
            isLiked: findUserLike != null,
          };
          return updatedPhoto;
        });
        setAllPhotos(updatedAllPhotos);
      }
      setLoading(false);
    }
  }, [photos, authorizedUser]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

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
        loading={loading}
      />
    </div>
  );
};

export default Home;
