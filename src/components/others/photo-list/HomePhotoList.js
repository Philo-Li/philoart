import React from 'react';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import HomePhotoListContainer from './HomePhotoListContainer';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const HomePhotoList = ({
  allPhotos, setAllPhotos, clickFetchMore, loading, column,
}) => {
  // if (allPhotos === undefined) return null;
  if (allPhotos === undefined) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
      </div>
    );
  }

  return (
    <div>
      <HomePhotoListContainer
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
        loading={loading}
        column={column}
      />
    </div>
  );
};

export default HomePhotoList;
