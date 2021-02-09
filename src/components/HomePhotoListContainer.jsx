/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CardColumns, Button } from 'react-bootstrap';
import '../index.css';
import useLikePhoto from '../hooks/useLikePhoto';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import PhotoCard from './PhotoCard';
import useUnlikePhoto from '../hooks/useUnlikePhoto';
import useUncollectPhoto from '../hooks/useUncollectPhoto';
import useCollectPhoto from '../hooks/useCollectPhoto';

const HomePhotoListContainer = ({ allPhotos, setAllPhotos, clickFetchMore }) => {
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
      const temp = allPhotos.map((obj) => (obj.id === photo.id ? { ...obj, isLiked: !obj.isLiked } : obj));
      setAllPhotos(temp);
      if (photo.isLiked) {
        const photoLikes = photo.likes && photo.likes.edges
          ? photo.likes.edges.map((edge) => edge.node)
          : [];

        const likedId = photoLikes.find((like) => like.user.id === authorizedUser.id);
        console.log('unlike photo', photo.id);
        await unlikePhoto({ id: likedId.id });
      } else {
        console.log('like photo', photo.id);
        await likePhoto({ photoId: photo.id });
      }
    }
  };

  const collectSinglePhoto = async (photo, collection) => {
    const updatedCollection = { ...collection, isCollected: !collection.isCollected };
    const updatedCollections = photo.allCollectionsToShow.map((obj) => (obj.id === collection.id ? updatedCollection : obj));
    const updatedPhoto = { ...photo, allCollectionsToShow: updatedCollections };
    const updatedAllPhotos = allPhotos.map((obj) => (obj.id === photo.id ? updatedPhoto : obj));
    setAllPhotos(updatedAllPhotos);
    if (collection.isCollected) {
      const photoCollections = photo.collections && photo.collections.edges
        ? photo.collections.edges.map((edge) => edge.node)
        : [];

      const collectedPhoto = photoCollections.find((collected) => collected.photo.id === photo.id);
      console.log('uncollect photo', photo.id, collection.id, collectedPhoto);
      await uncollectPhoto({ id: collectedPhoto.id });
    } else {
      await collectPhoto({ photoId: photo.id, collectionId: collection.id });
      console.log('collect photo', photo.id, collection.id);
    }
  };

  return (
    <div className="p-3">
      <CardColumns key="homePhotoList" className="sm my-2 my-lg-5">
        {allPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            likeSinglePhoto={likeSinglePhoto}
            collectSinglePhoto={collectSinglePhoto}
          />
        ))}
      </CardColumns>
      <div className="row-item-2">
        <Button variant="outline-secondary" onClick={clickFetchMore}>
          <i className="bi bi-three-dots" />
          More photos
        </Button>
      </div>
    </div>
  );
};

export default HomePhotoListContainer;
