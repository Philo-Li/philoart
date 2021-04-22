import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';
import usePhotos from '../../hooks/usePhotos';
import HomePhotoList from '../others/photo-list/HomePhotoList';
import SearchBar from '../others/search-bar/SearchBar';
import BroadSearchTagBar from '../others/BroadSearchTagBar';
import config from '../../config';

const Home = ({
  authorizedUser,
}) => {
  const [allPhotos, setAllPhotos] = useState();
  const [loading, setLoading] = useState(false);

  const variables = {
    username: config.pickyAdmin,
    checkUserLike: !authorizedUser ? config.visitorID : authorizedUser.id,
    first: 20,
  };

  const { photos, fetchMore, hasNextPage } = usePhotos(variables);

  useEffect(() => {
    if (photos) {
      const temp = photos && photos.edges
        ? photos.edges.map((edge) => edge.node)
        : [];

      setAllPhotos(temp);
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
          <h1 className="header">Discover the best free stock photos.</h1>
          <p className="subheader">
            Free to use. Redirect to download.
          </p>
          <SearchBar />
        </Jumbotron>
      </div>
      <BroadSearchTagBar />
      <HomePhotoList
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
        loading={loading}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default Home;
