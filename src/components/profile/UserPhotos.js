import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePhotos from '../../hooks/usePhotos';
import HomePhotoList from '../others/photo-list/HomePhotoList';

const UserPhotos = () => {
  const [allPhotos, setAllPhotos] = useState();
  const [loading, setLoading] = useState(false);
  const { username } = useParams();
  const userId = localStorage.getItem('userId');

  const variables = {
    username,
    checkUserLike: userId,
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
  }, [photos]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

  return (
    <div className="p-3">
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

export default UserPhotos;
