import React, { useEffect, useState } from 'react';
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

const INIT_COVER = 'https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-gallery-vector-icon-png-image_470660.jpg';
// eslint-disable-next-line react/prefer-stateless-function
const Discover = () => {
  const history = useHistory();
  const [allCollections, setAllCollections] = useState();
  const { collections } = useCollections({
    username: config.pickyAdmin,
    first: 30,
  });

  useEffect(() => {
    if (collections) {
      const temp = collections && collections.edges
        ? collections.edges.map((edge) => edge.node)
        : [];

      const reorder = {
        mood: [],
        animals: [],
        light: [],
        nature: [],
        people: [],
      };
      const updatedAllCollections = temp.map((collection) => {
        let coverToShow;
        if (collection.photoCount === 0) {
          coverToShow = INIT_COVER;
        } else {
          coverToShow = collection.photos.edges[0].node.photo.small;
        }
        const updatedCollection = {
          coverToShow,
          ...collection,
        };
        if (collection.description === 'mood') reorder.mood.push(collection);
        if (collection.description === 'animals') reorder.animals.push(collection);
        if (collection.description === 'light') reorder.light.push(collection);
        if (collection.description === 'nature') reorder.nature.push(collection);
        if (collection.description === 'people') reorder.people.push(collection);
        return updatedCollection;
      });
      setAllCollections(updatedAllCollections);
    }
  }, [collections]);

  const openCollection = (collection) => {
    history.push(`/collection/${collection.id}`);
  };

  if (allCollections === undefined) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
      </div>
    );
  }

  return (
    <div className="p-3">
      <>
      </>
      <div className="p-3 container-profile">
        <div className="profile-item">
          <h1>Discover</h1>
        </div>
      </div>
      <div className="p-3 container-profile">
        <div className="profile-item">
          <h1>Mood</h1>
        </div>
      </div>
      <div className="p-3 container-profile">
        <div className="profile-item">
          <h1>Animals</h1>
        </div>
      </div>
      <div className="p-3 container-profile">
        <div className="profile-item">
          <h1>Light and shadow</h1>
        </div>
      </div>
      <div className="p-3 container-profile">
        <div className="profile-item">
          <h1>Nature</h1>
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
                src={collection.coverToShow}
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
