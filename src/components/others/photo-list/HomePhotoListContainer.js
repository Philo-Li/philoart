import React from 'react';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
import useLikePhoto from '../../../hooks/useLikePhoto';
import useAuthorizedUser from '../../../hooks/useAuthorizedUser';
import PhotoCard from '../photo-card/PhotoCard';
import useUnlikePhoto from '../../../hooks/useUnlikePhoto';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
`;

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 2,
};

const breakpointColumnsObj2 = {
  default: 3,
  800: 2,
  500: 1,
};

const HomePhotoListContainer = ({
  allPhotos, setAllPhotos, clickFetchMore, loading, column,
}) => {
  const { authorizedUser } = useAuthorizedUser();
  const [likePhoto] = useLikePhoto();
  const [unlikePhoto] = useUnlikePhoto();
  const history = useHistory();

  const likeSinglePhoto = async (photo) => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      const temp = allPhotos
        .map((obj) => (obj.id === photo.id ? { ...obj, isLiked: !obj.isLiked } : obj));
      setAllPhotos(temp);
      if (photo.isLiked) {
        await unlikePhoto({ photoId: photo.id });
      } else {
        await likePhoto({ photoId: photo.id });
      }
    }
  };

  return (
    <div className="p-3 daily-cover-container">
      <div className="">
        <Masonry
          breakpointCols={column === 'collection' ? breakpointColumnsObj2 : breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {allPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              authorizedUser={authorizedUser}
              likeSinglePhoto={likeSinglePhoto}
            />
          ))}
        </Masonry>
      </div>
      { loading && (<BeatLoader color="#9B9B9B" loading css={override} size={50} />) }
      <div className="row-item-2">
        <button className="more-photos-btn" type="button" onClick={clickFetchMore}>
          <i className="bi bi-three-dots" />
          More photos
        </button>
      </div>
    </div>
  );
};

export default HomePhotoListContainer;
