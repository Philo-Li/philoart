import React from 'react';
import LazyLoad from 'react-lazyload';
import SaveToCollectionsModal from './SaveToCollectionsModal';
import '../../../MDB-Free_4.19.2/css/mdb.css';

const NanoPhotoCard2 = ({
  photo, likeSinglePhoto, collectSinglePhoto, authorizedUser,
}) => {
  if (!photo) return null;

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

  return (
    <div className="grid-item">
      <LazyLoad height={200} offset={[-100, 0]} debounce={500} placeholder={<Placeholder />}>
        <div className="photo-card overlay">
          <a href={`/photo/${photo.id}`}>
            <img
              src={photo.small}
              width="100%"
              alt="sample"
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
              <SaveToCollectionsModal
                photo={photo}
                collectSinglePhoto={collectSinglePhoto}
                authorizedUser={authorizedUser}
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
      </LazyLoad>
    </div>
  );
};

export default NanoPhotoCard2;
