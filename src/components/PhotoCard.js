/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button } from 'react-bootstrap';
import PhotoDetailsModal from './PhotoDetailsModal';
import SaveToCollectionsModal from './SaveToCollectionsModal';
import '../index.css';
import '../MDB-Free_4.19.2/css/mdb.css';

const PhotoCard = ({ photo, likeSinglePhoto, collectSinglePhoto }) => {
  if (!photo) return null;

  return (
    <div className="grid-item">
      <div
        className="bg-image view overlay"
      >
        <img
          src={photo.small}
          width="100%"
          alt="smaple"
        />
        <div className="mask flex-start white-text hover-overlay">
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
        </div>
      </div>
      {/* <Card key={photo.id}>
        <div
          className="bg-image view overlay"
        >
          <img
            src={photo.small}
            width="100%"
            alt="smaple"
          />
          <div className="mask flex-start white-text hover-overlay">
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
          </div>
        </div>
      </Card> */}
    </div>
  );
};

export default PhotoCard;
