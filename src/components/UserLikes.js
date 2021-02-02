/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import '../index.css';

import useUserLikes from '../hooks/useUserLikes';
import UserLikesListContainer from './UserLikesListContainer';

// eslint-disable-next-line react/prefer-stateless-function
const UserLikes = () => {
  const { likes } = useUserLikes();

  if (!likes) return null;

  const allPhotos = likes.edges
    ? likes.edges.map((edge) => edge.node.photo)
    : [];

  console.log('user likes list', likes);

  return (
    <div className="p-3">
      <UserLikesListContainer allPhotos={allPhotos} />
    </div>
  );
};

export default UserLikes;
