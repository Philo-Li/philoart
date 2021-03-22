import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../MDB-Free_4.19.2/css/mdb.css';

const NanoPhotoCard = ({ photo }) => {
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
        </div>
      </div>
    </div>
  );
};

export default NanoPhotoCard;
