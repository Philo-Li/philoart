import React from 'react';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
import Masonry from 'react-masonry-css';
import SearchPhotoCard from './SearchPhotoCard';
import useCreateAndLikePhoto from '../../hooks/useCreateAndLikePhoto';
import useAuthorizedUser from '../../hooks/useAuthorizedUser';
import useUnlikeAndDeletePhoto from '../../hooks/useUnlikeAndDeletePhoto';

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

const SearchPagePhotoListContainer = ({
  allPhotos, setAllPhotos, clickFetchMore, loading,
}) => {
  const { authorizedUser } = useAuthorizedUser();
  const [createAndLikePhoto] = useCreateAndLikePhoto();
  const [unlikeAndDeletePhoto] = useUnlikeAndDeletePhoto();
  const history = useHistory();

  const likeSinglePhoto = async (photo) => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      const temp = allPhotos
        .map((obj) => (obj.downloadPage === photo.downloadPage
          ? { ...obj, isLiked: !obj.isLiked } : obj));
      setAllPhotos(temp);
      if (photo.isLiked) {
        await unlikeAndDeletePhoto({ url: photo.downloadPage });
      } else {
        const variables = {
          width: photo.width,
          height: photo.height,
          color: photo.color,
          tiny: photo.tiny,
          small: photo.small,
          large: photo.large,
          downloadPage: photo.downloadPage,
          creditWeb: photo.creditWeb,
          creditId: photo.creditId,
          photographer: photo.photographer,
          description: photo.description || '',
          tags: photo.tags,
        };

        await createAndLikePhoto(variables);
      }
    }
  };

  return (
    <div className="p-3 daily-cover-container">
      <div className="">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {allPhotos.map((photo) => (
            <SearchPhotoCard
              key={photo.downloadPage}
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

export default SearchPagePhotoListContainer;
