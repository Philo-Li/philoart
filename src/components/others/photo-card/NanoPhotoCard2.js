import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SaveToCollectionsModal from './SaveToCollectionsModal';
import '../../../MDB-Free_4.19.2/css/mdb.css';

const NanoPhotoCard2 = ({
  photo, likeSinglePhoto, collectSinglePhoto,
}) => {
  if (!photo) return null;
  const location = useLocation();

  return (
    <div className="grid-item">
      <div className="photo-card overlay">
        <Link
          key={photo.id}
          to={{
            pathname: `/photo/${photo.id}`,
            // This is the trick! This link sets
            // the `background` in location state.
            state: { background: location },
          }}
        >
          <img
            src={photo.small}
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
        </div>
      </div>
    </div>
  );
};

export default NanoPhotoCard2;
