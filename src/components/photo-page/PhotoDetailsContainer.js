import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Card } from 'react-bootstrap';
import YouTube from 'react-youtube-embed';
import useLikePhoto from '../../hooks/useLikePhoto';
import useUnlikePhoto from '../../hooks/useUnlikePhoto';
import useDownloadPhoto from '../../hooks/useDownloadPhoto';
import SaveToCollectionsModal from '../others/photo-card/SaveToCollectionsModal';
import PhotoMoreDetailsModal from '../others/photo-card/PhotoMoreDetailsModal';

const PhotoDetailContainer = ({ photoToShow, setPhotoToShow }) => {
  const [likePhoto] = useLikePhoto();
  const [unlikePhoto] = useUnlikePhoto();
  const [downloadPhoto] = useDownloadPhoto();
  const [showCollectModal, setShowCollectModal] = useState(false);
  const history = useHistory();
  const userId = localStorage.getItem('philoart-userId');

  if (!photoToShow) return null;

  const bgColor = photoToShow.color || '#84B0B3';

  const mystyle = {
    backgroundColor: bgColor,
  };

  const Placeholder = () => (
    <div style={mystyle}>
      <a href={`/photo/${photoToShow.id}`}>
        <img
          src={photoToShow.srcTiny}
          className="lazyload-img"
          width="100%"
          alt="gird item"
        />
      </a>
    </div>
  );

  const likeSinglePhoto = async () => {
    if (!userId) {
      history.push('/signin');
    } else {
      const temp = { ...photoToShow, isLiked: !photoToShow.isLiked };
      setPhotoToShow(temp);
      if (photoToShow.isLiked) {
        await unlikePhoto({ photoId: photoToShow.id });
      } else {
        await likePhoto({ photoId: photoToShow.id });
      }
    }
  };

  const openCollectModal = async () => {
    if (!userId) {
      history.push('/signin');
    } else {
      setShowCollectModal(true);
    }
  };

  const photo = photoToShow;

  const photoCredit = `Photographer: ${photo.artist}`;

  const downloadSinglePhoto = async () => {
    window.open(photo.srcLarge);
    await downloadPhoto({ id: photo.id });
  };

  return (
    <div className="p-3">
      <div className="photodetails-photo-item">
        <LazyLoad height={300} offset={[-100, 0]} debounce={500} once placeholder={<Placeholder />}>
          <Card>
            <img
              src={photoToShow.srcSmall}
              className="max-height-500"
              alt="collection cover"
            />
            {/* <MapInteractionCSS>
              <img src={photoToShow.small} className="max-height-500" alt="gird item" />
            </MapInteractionCSS> */}
          </Card>
        </LazyLoad>
      </div>
      <div className="container-row-photodetail-btn">
        <div className="">
          <button
            type="button"
            className="photodetails-card-btn-like container-row-0 photodetails-card-btn-item"
            onClick={() => likeSinglePhoto(photo)}
          >
            <div className="">
              {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />)}
              {photo.isLiked && (
                <div className="red-icon">
                  <i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                </div>
              )}
            </div>
          </button>
        </div>
        <div>
          <button type="button" className="photodetails-card-btn-collect photodetails-card-btn-item" onClick={() => openCollectModal()}>
            <i className="bi bi-plus-square" />
          </button>
          <SaveToCollectionsModal
            photo={photo}
            showCollectModal={showCollectModal}
            setShowCollectModal={setShowCollectModal}
          />
        </div>
        <div className="photodetails-card-btn-item">
          <button type="button" className="photodetails-card-btn-download" onClick={() => downloadSinglePhoto()}>
            <i className="bi bi-download" />
          </button>
        </div>
      </div>
      <div className="container-row-0">
        <h5>{photoCredit}</h5>
      </div>
      <div className="col-item-collection-description">
        <p className="">
          From
          {' '}
          <a href={photo.id} target="_"> Philo Art </a>
        </p>
      </div>
      <div className="container-row-0">
        <PhotoMoreDetailsModal photo={photo} />
      </div>
      <div className="container-row-0">
        <div className="color-box" style={mystyle} />
      </div>
      <div className="photodetails-photo-item">
        {photo.srcYoutube && (<YouTube id={photo.srcYoutube} />) }
      </div>
    </div>
  );
};

export default PhotoDetailContainer;
