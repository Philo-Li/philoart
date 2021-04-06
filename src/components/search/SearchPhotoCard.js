import React from 'react';
import { Link } from 'react-router-dom';
import SaveToCollectionsModal from '../others/photo-card/SaveToCollectionsModal';
import '../../MDB-Free_4.19.2/css/mdb.css';

const SearchPhotoCard = ({ photo, likeSinglePhoto, collectSinglePhoto }) => {
  if (!photo) return null;

  const urls = { pexels: 'https://www.pexels.com/', unsplash: 'https://unsplash.com/' };

  return (
    <div className="grid-item">
      <div className="photo-card photo-card-webicon overlay">
        <Link
          key={photo.id}
          to={{
            pathname: `${photo.url}`,
          }}
          target="_blank"
        >
          <img
            src={photo.src.large}
            width="100%"
            alt="sample"
          />
        </Link>
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
            <SaveToCollectionsModal
              photo={photo}
              collectSinglePhoto={collectSinglePhoto}
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
          <div id={photo.id} className="text-white">
            <button
              type="button"
              className="photo-card-btn-icon photo-card-btn4"
              onClick={() => window.open(urls[photo.creditWeb])}
            >
              <p>{photo.creditWeb}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPhotoCard;
