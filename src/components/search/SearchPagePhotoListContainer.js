import React from 'react';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import LoadMore from '../others/button/LoadMore';
import SearchPhotoCard from './SearchPhotoCard';
import useCreateAndLikePhoto from '../../hooks/useCreateAndLikePhoto';
import useUnlikeAndDeletePhoto from '../../hooks/useUnlikeAndDeletePhoto';

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 2,
};

const SearchPagePhotoListContainer = ({
  allPhotos, setAllPhotos, clickFetchMore, loading,
}) => {
  const [createAndLikePhoto] = useCreateAndLikePhoto();
  const [unlikeAndDeletePhoto] = useUnlikeAndDeletePhoto();
  const history = useHistory();
  const token = localStorage.getItem('token');

  const likeSinglePhoto = async (photo) => {
    if (!token) {
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
    <div className="p-3 photo-list-container">
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
              likeSinglePhoto={likeSinglePhoto}
            />
          ))}
        </Masonry>
      </div>
      <LoadMore
        hasNextPage
        loading={loading}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default SearchPagePhotoListContainer;
