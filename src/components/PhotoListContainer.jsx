import React from 'react';
import { useHistory } from 'react-router-dom';
import { CardColumns } from 'react-bootstrap';
import '../index.css';
import useLikePhoto from '../hooks/useLikePhoto';
import useUserLikes from '../hooks/useUserLikes';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import PhotoCard from './PhotoCard';

// eslint-disable-next-line react/prefer-stateless-function
const PhotoListContainer = ({ allPhotos }) => {
  const { authorizedUser } = useAuthorizedUser();
  const [likePhoto] = useLikePhoto();
  const history = useHistory();
  const { likes } = useUserLikes();

  const userLikes = likes && likes.edges
    ? likes.edges.map((edge) => edge.node.photo)
    : [];

  if (!allPhotos === undefined) return null;

  const collectPhoto = async (id) => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      console.log('collect photo', id);
    }
  };

  const likeSinglePhoto = async (id) => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      console.log('like photo', id);
      await likePhoto({ photoId: id });
    }
  };

  const showHeart = (id) => {
    const findPhoto = userLikes.find((photo) => photo.id === id);
    console.log('filter likes', findPhoto);
    return findPhoto ? 'bi bi-heart-fill' : 'bi bi-heart';
  };

  return (
    <div className="p-3">
      <CardColumns className="sm my-2 my-lg-5">
        {allPhotos.map((photo) => (
          <PhotoCard
            photo={photo}
            collectPhoto={collectPhoto}
            likeSinglePhoto={likeSinglePhoto}
            showHeart={showHeart}
          />
        ))}
      </CardColumns>
    </div>
  );
};

export default PhotoListContainer;
