import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import SaveToCollectionsModal from './SaveToCollectionsModal';
import useDeletePhoto from '../../../hooks/useDeletePhoto';
import '../../../MDB-Free_4.19.2/css/mdb.css';

const PhotoCard = ({
  photo, authorizedUser, likeSinglePhoto, collectSinglePhoto,
}) => {
  if (!photo) return null;
  const [deletePhoto] = useDeletePhoto();
  const history = useHistory();
  const [showCollectModal, setShowCollectModal] = useState(false);

  const bgColor = photo.color || '#84B0B3';

  const mystyle = {
    backgroundColor: bgColor,
  };

  const Placeholder = () => (
    <div style={mystyle}>
      <a href={`/photo/${photo.id}`}>
        <img
          src={photo.tiny}
          className="lazyload-img"
          width="100%"
          alt="gird item"
        />
      </a>
    </div>
  );

  const deleteSinglePhoto = async () => {
    await deletePhoto({ id: photo.id });
  };

  const openCollectModal = async () => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      setShowCollectModal(true);
    }
  };

  return (
    <div className="grid-item">
      <LazyLoad height={300} offset={[-100, 0]} debounce={500} once placeholder={<Placeholder />}>
        <div className="photo-card overlay">
          <a href={`/photo/${photo.id}`}>
            <img
              src={photo.small}
              width="100%"
              alt="gird item"
            />
          </a>
          <div>
            <div id={photo.id} className="text-white">
              <button
                type="button"
                className="photo-card-btn-icon photo-card-btn1"
                onClick={() => window.open(photo.downloadPage)}
              >
                <i className="bi bi-download" />
              </button>
            </div>
            <div id={photo.id} className="text-white">
              <button type="button" className="photo-card-btn-icon photo-card-btn3" onClick={() => openCollectModal()}>
                <i className="bi bi-plus-square" />
              </button>
              <SaveToCollectionsModal
                photo={photo}
                collectSinglePhoto={collectSinglePhoto}
                showCollectModal={showCollectModal}
                setShowCollectModal={setShowCollectModal}
              />
            </div>
            <div className="text-white">
              <button
                type="button"
                className="photo-card-btn-icon photo-card-btn2"
                onClick={() => likeSinglePhoto(photo)}
              >
                {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />)}
                {photo.isLiked && (
                  <div className="red-icon">
                    <i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                  </div>
                )}
              </button>
            </div>
            { authorizedUser && authorizedUser.username === 'picky' && (
              <div className="text-white">
                <button
                  type="button"
                  className="photo-card-btn-icon photo-card-btn5"
                  onClick={() => deleteSinglePhoto(photo)}
                >
                  <i className="bi bi-trash-fill" />
                </button>
              </div>
            )}
          </div>
        </div>
      </LazyLoad>
    </div>
  );
};

export default PhotoCard;
