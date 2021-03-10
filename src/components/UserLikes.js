/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import '../index.css';
import useUserLikes from '../hooks/useUserLikes';
import UserLikesListContainer from './UserLikesListContainer';

const UserLikes = ({ authorizedUser }) => {
  const [allLikedPhotos, setAllLikedPhotos] = useState();

  const { likes, fetchMore } = useUserLikes({ userId: authorizedUser && authorizedUser.id, first: 15 });

  useEffect(() => {
    if (likes) {
      const temp = likes.edges
        ? likes.edges.map((edge) => edge.node.photo)
        : [];

      const updatedAllPhotos = temp.map((photo) => ({ ...photo, isLiked: true }));

      setAllLikedPhotos(updatedAllPhotos);
    }
  }, [likes]);

  const clickFetchMore = () => {
    fetchMore();
  };

  if (!allLikedPhotos) return null;

  return (
    <div className="p-3">
      <UserLikesListContainer
        allPhotos={allLikedPhotos}
        setAllPhotos={setAllLikedPhotos}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default UserLikes;
