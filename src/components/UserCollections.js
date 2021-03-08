/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import '../index.css';
import useCollections from '../hooks/useCollections';

const cover = 'https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-gallery-vector-icon-png-image_470660.jpg';

const UserCollections = () => {
  const history = useHistory();
  const { userId } = useParams();
  const { collections } = useCollections({
    userId,
    first: 30,
  });

  useEffect(() => {
    if (collections) {
      const temp = collections.edges
        ? collections.edges.map((edge) => edge.node.photo)
        : [];
      console.log(temp, collections);
    }
  }, [collections]);

  const allCollections = collections && collections.edges
    ? collections.edges.map((edge) => edge.node)
    : [];

  const openCollection = (collectionId) => {
    history.push(`/collection/${collectionId}`);
  };

  const getCover = (collection) => (collection.photoCount === 0
    ? cover
    : collection.photos.edges[0].node.photo.small);

  return (
    <div className="p-3">
      <>
      </>
      <CardColumns className="sm my-2 my-lg-5">
        {allCollections.map((collection) => (
          <Card key={collection.id}>
            <div
              className="view zoom overlay"
              onClick={() => { openCollection(collection.id); }}
              onKeyPress={() => openCollection(collection.id)}
              role="button"
              tabIndex="0"
            >
              <img
                src={getCover(collection)}
                className="max-height-100"
                alt="smaple"
              />
              <div className="mask flex-center rgba-blue-light white-text">
                <i size="lg" className="bi bi-search" />
              </div>
            </div>
            <Card.Title>
              <div className="container-collection-title">
                <div className="item-0-collection-title">
                  <p className="row-item-0">
                    {collection.title}
                    (
                    {collection.photoCount}
                    )
                  </p>
                </div>
              </div>
            </Card.Title>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default UserCollections;
