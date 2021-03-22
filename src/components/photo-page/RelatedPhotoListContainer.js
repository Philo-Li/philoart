import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import useLikePhoto from '../../hooks/useLikePhoto';
import useAuthorizedUser from '../../hooks/useAuthorizedUser';
import PhotoCard from '../others/photo-card/PhotoCard';
import useUnlikePhoto from '../../hooks/useUnlikePhoto';
import useUncollectPhoto from '../../hooks/useUncollectPhoto';
import useCollectPhoto from '../../hooks/useCollectPhoto';

const breakpointColumnsObj = {
  default: 5,
  800: 2,
  500: 1,
};

const RelatedPhotoListContainer = ({ allPhotos, setAllPhotos, clickFetchMore }) => {
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
              likeSinglePhoto={likeSinglePhoto}
              collectSinglePhoto={collectSinglePhoto}
            />
          ))}
        </Masonry>
      </div>
      <div className="row-item-2">
        <Button variant="outline-secondary" onClick={clickFetchMore}>
          <i className="bi bi-three-dots" />
          More photos
        </Button>
      </div>
    </div>
  );
};

export default RelatedPhotoListContainer;
