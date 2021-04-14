import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import Masonry from 'react-masonry-css';
import config from '../../config';

import useCollections from '../../hooks/useCollections';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

const cover = 'https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-gallery-vector-icon-png-image_470660.jpg';
// eslint-disable-next-line react/prefer-stateless-function
const Discover = () => {
  const history = useHistory();
  const { collections } = useCollections({
    username: config.pickyAdmin,
    first: 30,
  });

  // if (!collections) return null;
  if (collections === undefined) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
      </div>
    );
  }

  const allCollections = collections.edges
    ? collections.edges.map((edge) => edge.node)
    : [];

  const openCollection = (collection) => {
    history.push(`/collection/${collection.id}`);
  };

  const getCover = (collection) => (collection.photoCount === 0
    ? cover
    : collection.photos.edges[0].node.photo.small);

  return (
    <div className="p-3">
      <>
      </>
      <div className="p-3 container-profile">
        <div className="profile-item">
          <h1>Discover</h1>
        </div>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {allCollections.map((collection) => (
          <Card key={collection.id}>
            <div
              className="view zoom overlay"
              onClick={() => { openCollection(collection); }}
              onKeyPress={() => openCollection(collection)}
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
              <p className="row-item-0">
                {collection.title}
                (
                {collection.photoCount}
                )
              </p>
            </Card.Title>
          </Card>
        ))}
      </Masonry>
    </div>
  );
};

export default Discover;
