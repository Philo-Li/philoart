import React from 'react';
import { useHistory } from 'react-router-dom';
import { CardColumns, Button } from 'react-bootstrap';
import '../index.css';
import useLikePhoto from '../hooks/useLikePhoto';
import useUnlikePhoto from '../hooks/useUnlikePhoto';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import PhotoCard from './PhotoCard';

const UserLikesListContainer = ({ allPhotos, setAllPhotos, clickFetchMore }) => {
  const { authorizedUser } = useAuthorizedUser();
  const [likePhoto] = useLikePhoto();
  const [unlikePhoto] = useUnlikePhoto();
  const history = useHistory();

  if (!allPhotos === undefined) return null;

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
      const updatedPhoto = { ...photo, isLiked: !photo.isLiked };
      // console.log('updatedPhoto', updatedPhoto);
      const temp = allPhotos.map((obj) => (obj.id === photo.id ? updatedPhoto : obj));
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

  return (
    <div className="p-3">
      <CardColumns className="sm my-2 my-lg-5">
        {allPhotos.map((photo) => (
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

export default UserLikesListContainer;
