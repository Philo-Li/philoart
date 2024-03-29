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

      setAllCollections(temp);
    }
  }, [collections]);

  if (allCollections === undefined) {
    return (
      <div className="discover">
        <div className="p-3 container-profile">
          <div className="profile-item">
            <p className="header">Discover</p>
          </div>
        </div>
        <div className="col-item-3">
          <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 discover">
      <div className="p-3 container-profile">
        <div className="profile-item">
          <p className="header">Discover</p>
        </div>
      </div>
      <div className="p-3">
        <div className="container-profile profile-item subheader">
          <p>Nature</p>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="Nature" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item subheader">
          <p>Human</p>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="Human" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item subheader">
          <p>Mood</p>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="Mood" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item subheader">
          <p>Delicious food</p>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="Food" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item subheader">
          <p>Animals</p>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="Animals" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item subheader">
          <p>Light and shadow</p>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="Light And Shadow" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item subheader">
          <p>On the Road</p>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="Street Photography" />
      </div>
      <div className="p-3">
        <div className="container-profile profile-item subheader">
          <p>Other</p>
        </div>
        <DiscoverCollectionList allCollections={allCollections} category="" />
      </div>
    </div>
  );
};

export default Discover;
