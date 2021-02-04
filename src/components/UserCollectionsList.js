/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, CardColumns, Button } from 'react-bootstrap';
import '../index.css';

const cover = 'https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-gallery-vector-icon-png-image_470660.jpg';
// eslint-disable-next-line react/prefer-stateless-function
const UserCollectionsList = ({ photo, allCollections, collectSinglePhoto }) => {
  if (!allCollections) return null;

  return (
    <div className="p-3">
      <>
      </>
      <CardColumns className="sm my-2 my-lg-5">
        {allCollections.map((collection) => (
          <Card key={collection.id}>
            <Button variant="light" size="lg" onClick={() => collectSinglePhoto(photo, collection)}>
              <Card.Img src={collection.cover ? collection.cover : cover} />
            </Button>
            <Card.Title>
              <div className="row-item-3">
                {collection.title}
                <div className="green-icon">
                  <i className={collection.isCollected ? 'bi bi-check-square-fill' : 'bi bi-check-square'} />
                </div>
              </div>
            </Card.Title>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default UserCollectionsList;
