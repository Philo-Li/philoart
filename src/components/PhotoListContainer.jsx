import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CardColumns, Button } from 'react-bootstrap';
import '../index.css';
import useLikePhoto from '../hooks/useLikePhoto';
import useUserLikes from '../hooks/useUserLikes';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import PhotoCard from './PhotoCard';

// eslint-disable-next-line react/prefer-stateless-function
const PhotoListContainer = ({ allPhotos, fetchMore }) => {
  const { authorizedUser } = useAuthorizedUser();
  const [likePhoto] = useLikePhoto();
  const history = useHistory();
  const { likes } = useUserLikes();
  const [updatedPhotos, setUpdatedPhotos] = useState(allPhotos);

  if (!allPhotos === undefined) return null;

  useEffect(() => {
    const userLikes = likes && likes.edges
      ? likes.edges.map((edge) => edge.node.photo)
      : [];
    const updatedAllPhotos = allPhotos.map((photo) => {
      const findPhoto = userLikes.find((likedPhoto) => likedPhoto.id === photo.id);
      return findPhoto ? { ...photo, isLiked: true } : { ...photo, isLiked: false };
    });
    console.log('updatedAllPhotos', updatedAllPhotos);
    console.log('user likes', likes);

    setUpdatedPhotos(updatedAllPhotos);
  }, [likes]);

  const collectPhoto = async (id) => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      console.log('collect photo', id);
    }
  };

  const likeSinglePhoto = async (photo) => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      console.log('like photo', photo.id);
      const updatedPhoto = { ...photo, isLiked: !photo.isLiked };
      console.log('updatedPhoto', updatedPhoto);
      const temp = updatedPhotos.map((obj) => (obj.id === photo.id ? updatedPhoto : obj));
      setUpdatedPhotos(temp);
      await likePhoto({ photoId: photo.id });
    }
  };

  const clickFetchMore = () => {
    fetchMore();
    console.log('now all photos', allPhotos);
  };

  return (
    <div className="p-3">
      <CardColumns className="sm my-2 my-lg-5">
        {updatedPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            collectPhoto={collectPhoto}
            likeSinglePhoto={likeSinglePhoto}
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

export default PhotoListContainer;
