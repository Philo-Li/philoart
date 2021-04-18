import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useDownloadPhoto from '../../../hooks/useDownloadPhoto';
import '../../../MDB-Free_4.19.2/css/mdb.css';

const NanoPhotoCard = ({ photo }) => {
  if (!photo) return null;
  const [downloadPhoto] = useDownloadPhoto();
  const location = useLocation();

  const downloadSinglePhoto = async () => {
    window.open(photo.downloadPage);
    await downloadPhoto({ id: photo.id });
  };

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
              onClick={() => downloadSinglePhoto()}
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
