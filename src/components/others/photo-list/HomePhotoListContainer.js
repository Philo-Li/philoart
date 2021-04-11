import React from 'react';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
import useLikePhoto from '../../../hooks/useLikePhoto';
import useAuthorizedUser from '../../../hooks/useAuthorizedUser';
import PhotoCard from '../photo-card/PhotoCard';
import useUnlikePhoto from '../../../hooks/useUnlikePhoto';
import useUncollectPhoto from '../../../hooks/useUncollectPhoto';
import useCollectPhoto from '../../../hooks/useCollectPhoto';

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
        const photoLikes = photo.likes && photo.likes.edges
          ? photo.likes.edges.map((edge) => edge.node)
          : [];

        const likedId = photoLikes.find((like) => like.user.id === authorizedUser.id);
        // console.log('unlike photo', photo.id);
        await unlikePhoto({ id: likedId.id });
      } else {
        // console.log('like photo', photo.id);
        await likePhoto({ photoId: photo.id });
      }
    }
  };

  const collectSinglePhoto = async (photo, collection) => {
    const updatedCollection = { ...collection, isCollected: !collection.isCollected };

    const updatedCollections = photo.allCollectionsToShow
      .map((obj) => (obj.id === collection.id ? updatedCollection : obj));

    const updatedPhoto = { ...photo, allCollectionsToShow: updatedCollections };
    const updatedAllPhotos = allPhotos.map((obj) => (obj.id === photo.id ? updatedPhoto : obj));
    setAllPhotos(updatedAllPhotos);

    if (collection.isCollected) {
      const photoCollections = photo.collections && photo.collections.edges
        ? photo.collections.edges.map((edge) => edge.node)
        : [];

      const collectedPhoto = photoCollections.find((collected) => collected.photo.id === photo.id);
      // console.log('uncollect photo', photo.id, collection.id, collectedPhoto);
      await uncollectPhoto({ id: collectedPhoto.id });
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
