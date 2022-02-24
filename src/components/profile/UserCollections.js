import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import '../../index.css';
import useCollections from '../../hooks/useCollections';
import CollectionCard from './user-collections/CollectionCard';
import LoadMore from '../others/button/LoadMore';

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

const UserCollections = () => {
  const [loading, setLoading] = useState(false);
  const [allCollections, setAllCollections] = useState();
  const authUsername = localStorage.getItem('philoart-username');

  let { username } = useParams();
  username = username.substr(1, username.length - 1);
  const { collections, fetchMore, hasNextPage } = useCollections({
    username,
    first: 30,
  });

  useEffect(() => {
    if (collections) {
      const temp = collections && collections.edges
        ? collections.edges.map((edge) => edge.node)
        : [];

      setAllCollections(temp);
      setLoading(false);
    }
  }, [collections]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

  if (allCollections === undefined) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
      </div>
    );
  }

  return (
    <div className="p-3 photo-list-container">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {allCollections.map((collection) => (
          <CollectionCard
            key={collection.id}
            showEditButton={username === authUsername}
            collection={collection}
            allCollections={allCollections}
            setAllCollections={setAllCollections}
          />
        ))}
      </Masonry>
      <LoadMore
        title="More collections"
        hasNextPage={hasNextPage}
        loading={loading}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default UserCollections;
