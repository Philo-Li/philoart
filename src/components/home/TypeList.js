import React, { useState, useEffect } from 'react';
import usePhotos from '../../hooks/usePhotos';
import HomePhotoList from '../others/photo-list/HomePhotoList';

const TypeList = ({ type }) => {
  const [allPhotos, setAllPhotos] = useState();
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId');

  const variables = {
    checkUserLike: userId,
    checkUserCollect: userId,
    first: 20,
    searchKeyword: type,
  };

  const { photos, fetchMore, hasNextPage } = usePhotos(variables);

  useEffect(async () => {
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
    <div>
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

export default TypeList;
