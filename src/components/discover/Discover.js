import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import DiscoverCollectionList from './DiscoverCollectionList';
import config from '../../config';

import useDiscoverCollections from '../../hooks/useDiscoverCollections';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const INIT_COVER = 'https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-gallery-vector-icon-png-image_470660.jpg';
// const CATEGORY = ['mood', 'animals', 'light', 'nature', 'human', 'road', 'food'];

const Discover = () => {
  const [allCollections, setAllCollections] = useState();
  const { collections } = useDiscoverCollections({
    username: config.pickyAdmin,
    first: 30,
  });

  useEffect(() => {
    if (collections) {
      const temp = collections && collections.edges
        ? collections.edges.map((edge) => edge.node)
        : [];

      const updatedAllCollections = temp.map((collection) => {
        const coverToShow = collection.cover ? collection.cover : INIT_COVER;
        const updatedCollection = {
          coverToShow,
          ...collection,
        };
        return updatedCollection;
      });
      setAllCollections(updatedAllCollections);
    }
  }, [collections]);

  if (allCollections === undefined) {
    return (
      <div>
        <div className="p-3 container-profile">
          <div className="profile-item">
            <h1>Discover</h1>
          </div>
        </div>
        <div className="col-item-3">
          <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
        </div>
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
      <div className="p-3">
        <div className="container-profile profile-item">
          <h1>Nature</h1>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="nature" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item">
          <h1>Human</h1>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="human" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item">
          <h1>Mood</h1>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="mood" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item">
          <h1>Delicious food</h1>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="food" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item">
          <h1>Animals</h1>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="animals" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item">
          <h1>Light and shadow</h1>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="light" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item">
          <h1>On the Road</h1>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="road" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item">
          <h1>Other</h1>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="" />
      </div>
    </div>
  );
};

export default Discover;
