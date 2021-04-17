import React from 'react';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
import useLikePhoto from '../../hooks/useLikePhoto';
import useAuthorizedUser from '../../hooks/useAuthorizedUser';
import PhotoCard from '../others/photo-card/NanoPhotoCard1';
import useUnlikePhoto from '../../hooks/useUnlikePhoto';
import useUncollectPhoto from '../../hooks/useUncollectPhoto';
import useCollectPhoto from '../../hooks/useCollectPhoto';

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

const HomePhotoListContainer = ({
  allPhotos, setAllPhotos, clickFetchMore, loading,
}) => {
  const { authorizedUser } = useAuthorizedUser();
  const [likePhoto] = useLikePhoto();
  const [unlikePhoto] = useUnlikePhoto();
  const [collectPhoto] = useCollectPhoto();
  const [uncollectPhoto] = useUncollectPhoto();
  const history = useHistory();

  const likeSinglePhoto = async (photo) => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      const temp = allPhotos
        .map((obj) => (obj.id === photo.id ? { ...obj, isLiked: !obj.isLiked } : obj));
      setAllPhotos(temp);
      if (photo.isLiked) {
        // console.log('unlike photo', photo.id);
        await unlikePhoto({ photoId: photo.id });
      } else {
        // console.log('like photo', photo.id);
        await likePhoto({ photoId: photo.id });
      }
    }
  };

  const collectSinglePhoto = async (photo, collection) => {
    const changeCover = (collection.isCollected === false);
    const updatedCollection = {
      ...collection,
      isCollected: !collection.isCollected,
      cover: changeCover ? photo.small : collection.cover,
    };
    const updatedAllPhotos = allPhotos.map((obj) => {
      const updatedCollections = obj.allCollectionsToShow
        .map((obj2) => (obj2.id === collection.id ? updatedCollection : obj2));

      const updatedPhoto = { ...obj, allCollectionsToShow: updatedCollections };
      return updatedPhoto;
    });
    setAllPhotos(updatedAllPhotos);

    if (collection.isCollected) {
      // console.log('uncollect photo', photo.id, collection.id);
      await uncollectPhoto({ photoId: photo.id, collectionId: collection.id });
    } else {
      await collectPhoto({ photoId: photo.id, collectionId: collection.id });
      // console.log('collect photo', photo.id, collection.id);
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
            <PhotoCard
              key={photo.id}
              photo={photo}
              authorizedUser={authorizedUser}
              likeSinglePhoto={likeSinglePhoto}
              collectSinglePhoto={collectSinglePhoto}
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
