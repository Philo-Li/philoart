/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PhotoDetailsModal from './PhotoDetailsModal';
import SaveToCollectionsModal from './SaveToCollectionsModal';
import '../index.css';

// eslint-disable-next-line react/prefer-stateless-function
const PhotoCard = ({ photo, likeSinglePhoto, collectSinglePhoto }) => {
  if (!photo) return null;

  return (
    <div className="">
      <Card key={photo.id}>
        <Card.Img src={photo.small} alt="Card image" />
        <Card.ImgOverlay className="sm">
          <div className="wrapper">
            <div id={photo.id} className="wrapper text-white">
              <Button variant="apparent" size="sm" onClick={() => window.open(photo.downloadPage)}>
                <i className="bi bi-download" />
              </Button>
            </div>
            <div id={photo.id} className="button-0  text-white">
              <SaveToCollectionsModal
                photo={photo}
                collectSinglePhoto={collectSinglePhoto}
              />
            </div>
            <div className="button-0 text-white">
              <Button variant="apparent" size="sm" onClick={() => likeSinglePhoto(photo)}>
                {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />)}
                {photo.isLiked && (
                  <div className="red-icon">
                    <i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                  </div>
                )}
              </Button>
            </div>
            <div className="button-0">
              <PhotoDetailsModal
                photo={photo}
                collectSinglePhoto={collectSinglePhoto}
                likeSinglePhoto={likeSinglePhoto}
              />
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export default PhotoCard;
