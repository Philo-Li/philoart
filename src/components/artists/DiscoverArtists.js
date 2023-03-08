import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import useUsers from '../../hooks/useUsers';
import DiscoverAuthorList from './DiscoverAuthorList';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const DiscoverArtists = () => {
  const [allUsers, setAllUsers] = useState();
  const [loading, setLoading] = useState(false);
  const { users, fetchMore, hasNextPage } = useUsers({
    first: 30,
  });

  useEffect(() => {
    if (users) {
      const temp = users && users.edges
        ? users.edges.map((edge) => edge.node)
        : [];

      setAllUsers(temp);
      setLoading(false);
    }
  }, [users]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

  if (allUsers === undefined) {
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
          <p className="header">Discover Artists</p>
        </div>
      </div>
      <div className="p-3">
        <DiscoverAuthorList
          allUsers={allUsers}
          clickFetchMore={clickFetchMore}
          loading={loading}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
};

export default DiscoverArtists;
