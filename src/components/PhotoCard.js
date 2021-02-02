/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PhotoDetailsModal from './PhotoDetailsModal';
import '../index.css';

// eslint-disable-next-line react/prefer-stateless-function
const PhotoCard = ({ photo, collectPhoto, likeSinglePhoto }) => {
  if (!photo) return null;

  return (
    <div>
      <Card key={photo.id}>
        <Card.Img src={photo.small} alt="Card image" />
        <Card.ImgOverlay className="sm">
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
              <Button variant="light" onClick={() => likeSinglePhoto(photo)}>
                <i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
              </Button>
            </div>
            <div className="button-0">
              <PhotoDetailsModal photo={photo} />
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export default PhotoCard;
