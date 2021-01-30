/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import '../index.css';

import useCollections from '../hooks/useCollections';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

// eslint-disable-next-line react/prefer-stateless-function
const UserLikes = () => {
  const { authorizedUser } = useAuthorizedUser();
  const { collections } = useCollections();

  if (!collections) return null;

  const allCollections = collections.edges
    ? collections.edges.map((edge) => edge.node)
    : [];

  console.log('collections', allCollections);
  console.log('authorizedUser', authorizedUser);

  return (
    <div className="p-3">
      <>
      </>
      <CardColumns className="sm my-2 my-lg-5">
        {allCollections.map((collection) => (
          <Card key={collection.id}>
            <Card.Title>{collection.title}</Card.Title>
            <Card.Img src={collection.cover} alt="Card image" />
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default UserLikes;
