import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUserLikes from '../../hooks/useUserLikes';
import HomePhotoList from '../others/photo-list/HomePhotoList';

const UserLikes = () => {
  const [allPhotos, setAllPhotos] = useState();
  const [loading, setLoading] = useState(false);
  const { username } = useParams();
  const userId = localStorage.getItem('userId');

  const variables = {
    username,
    checkUserLike: userId,
    first: 15,
  };

  const { likes, fetchMore, hasNextPage } = useUserLikes(variables);

  useEffect(() => {
    if (likes) {
      const temp = likes && likes.edges
        ? likes.edges.map((edge) => edge.node.photo)
        : [];

      setAllPhotos(temp);
      setLoading(false);
    }
  }, [likes]);

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

export default UserLikes;
