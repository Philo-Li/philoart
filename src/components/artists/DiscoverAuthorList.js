import React from 'react';
import { Card } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import Masonry from 'react-masonry-css';
import LoadMore from '../others/button/LoadMore';
import ProfileDetailCard from './ProfileDetailCard';

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

const DiscoverAuthorList = ({
  allUsers, clickFetchMore, loading, hasNextPage,
}) => {
  if (!allUsers) {
    return (
      <div className="col-item-3">
        <h3>No result</h3>
      </div>
    );
  }

  const initProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  return (
    <div className="p-3 discover-author-list">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {allUsers.map((user) => (
          <Card key={nanoid()}>
            <a href={`/${user.username}`}>
              <div className="container-profile">
                <ProfileDetailCard
                  userNow={user}
                  profileImage={user.profileImage || initProfileImage}
                />
              </div>
            </a>
          </Card>
        ))}
      </Masonry>
      <LoadMore
        hasNextPage={hasNextPage}
        loading={loading}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default DiscoverAuthorList;
