/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardColumns, Button } from 'react-bootstrap';
import '../index.css';
import PhotoDetailsModal from './PhotoDetailsModal';
import usePhotos from '../hooks/usePhotos';
import useLikePhoto from '../hooks/useLikePhoto';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

// eslint-disable-next-line react/prefer-stateless-function
const Home = () => {
  const { photos } = usePhotos();
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const { authorizedUser } = useAuthorizedUser();
  const [likePhoto] = useLikePhoto();
  const history = useHistory();

  if (!photos) return null;

  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };

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

  const allPhotos = photos.edges
    ? photos.edges.map((edge) => edge.node)
    : [];

  console.log('photos', allPhotos);

  // const photoPage = (url) => {
  //   console.log('open photopage', url);
  // };

  return (
    <div className="p-3">
      <>
        <h1>hey</h1>
      </>
      <CardColumns className="sm my-2 my-lg-5">
        {allPhotos.map((photo) => (
          <Card key={photo.id}>
            <Card.Img src={photo.small} alt="Card image" />
            <Card.ImgOverlay className="sm" ref={target} onEntered={showDropdown} onExit={hideDropdown}>
              <div className="wrapper">
                <div id={photo.id} className="button-0">
                  <Button variant="light" onClick={() => window.open(photo.downloadPage)}>
                    <i className="bi bi-download" />
                  </Button>
                </div>
                <div className="button-0">
                  <Button variant="light" onClick={() => collectPhoto(photo.id)}>
                    <i className="bi bi-plus-square" />
                  </Button>
                </div>
                <div className="button-0">
                  <Button variant="light" onClick={() => likeSinglePhoto(photo.id)}>
                    <i className="bi bi-heart" />
                  </Button>
                </div>
                <div className="button-0">
                  <PhotoDetailsModal photo={photo} />
                </div>
              </div>
            </Card.ImgOverlay>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default Home;
