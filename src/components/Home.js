/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useState, useRef } from 'react';
import { Card, CardColumns, Button } from 'react-bootstrap';
import '../index.css';

import usePhotos from '../hooks/usePhotos';

// eslint-disable-next-line react/prefer-stateless-function
const Home = () => {
  const { photos } = usePhotos();
  const [show, setShow] = useState(false);
  const target = useRef(null);

  if (!photos) return null;

  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };

  const allPhotos = photos.edges
    ? photos.edges.map((edge) => edge.node)
    : [];

  console.log('photos', allPhotos);

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
                  <Button variant="light">
                    <i className="bi bi-plus-square" />
                  </Button>
                </div>
                <div className="button-0">
                  <Button variant="light">
                    <i className="bi bi-heart" />
                  </Button>
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
