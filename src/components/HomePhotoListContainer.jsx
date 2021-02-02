/* eslint-disable object-curly-newline */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CardColumns, Button } from 'react-bootstrap';
import '../index.css';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import PhotoCard from './PhotoCard';

// eslint-disable-next-line react/prefer-stateless-function
const HomePhotoListContainer = ({ allPhotos, setAllPhotos, clickFetchMore }) => {
  const { authorizedUser } = useAuthorizedUser();
  const history = useHistory();

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
      console.log('like photo', photo.id);
      console.log('updatedPhoto', updatedPhoto);
      const temp = allPhotos.map((obj) => (obj.id === photo.id ? updatedPhoto : obj));
      setAllPhotos(temp);
      // await likePhoto({ photoId: photo.id });
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

export default HomePhotoListContainer;
