/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import '../index.css';

import useUserLikes from '../hooks/useUserLikes';
import UserLikesListContainer from './UserLikesListContainer';

// eslint-disable-next-line react/prefer-stateless-function
const UserLikes = () => {
  const { likes, fetchMore } = useUserLikes({ first: 15 });
  const [allPhotos, setAllPhotos] = useState();

  useEffect(() => {
    if (likes) {
      const temp = likes.edges
        ? likes.edges.map((edge) => edge.node.photo)
        : [];

      const updatedAllPhotos = temp.map((photo) => ({ ...photo, isLiked: true }));
      console.log('updatedAllPhotos', updatedAllPhotos);

      setAllPhotos(updatedAllPhotos);
    }
  }, [likes]);

  console.log('user likes list', likes);

  const clickFetchMore = () => {
    fetchMore();
  };

  if (!allPhotos) return null;

  return (
    <div className="p-3">
      <UserLikesListContainer
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default UserLikes;
