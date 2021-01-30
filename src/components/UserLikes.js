/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, CardColumns, Button } from 'react-bootstrap';
import '../index.css';

import useUserLikes from '../hooks/useUserLikes';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

// eslint-disable-next-line react/prefer-stateless-function
const UserLikes = () => {
  const { authorizedUser } = useAuthorizedUser();
  const { likes } = useUserLikes();

  if (!likes) return null;

  const allPhotos = likes.edges
    ? likes.edges.map((edge) => edge.node.photo)
    : [];

  console.log('like', likes);
  console.log('authorizedUser', authorizedUser);

  return (
    <div className="p-3">
      <>
      </>
      <CardColumns className="sm my-2 my-lg-5">
        {allPhotos.map((photo) => (
          <Card key={photo.id}>
            <Card.Img src={photo.small} alt="Card image" />
            <Card.ImgOverlay className="sm">
              <div className="wrapper">
                <div id={photo.id} className="button-0">
                  <Button variant="light" onClick={() => window.open(photo.downloadPage)}>
                    <i className="bi bi-download" />
                  </Button>
                </div>
                <div className="button-0">
                  <Button variant="light">
                    <i className="bi bi-plus-square" />
                  </Button>
                </div>
                <div className="button-0">
                  <Button variant="light">
                    <i className="bi bi-heart" />
                  </Button>
                </div>
              </div>
            </Card.ImgOverlay>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default UserLikes;
