/* eslint-disable no-unused-vars */
import React from 'react';
import LazyLoad from 'react-lazyload';
import SaveToCollectionsModal from '../others/photo-card/SaveToCollectionsModal';
import useCreatePhoto from '../../hooks/useCreatePhoto';
import '../../MDB-Free_4.19.2/css/mdb.css';

const SearchPhotoCard = ({
  photo, likeSinglePhoto, collectSinglePhoto,
}) => {
  if (!photo) return null;
  const [createPhoto] = useCreatePhoto();

  const bgColor = photo.color || '#84B0B3';
  const username = localStorage.getItem('philoart-username');

  const mystyle = {
    backgroundColor: bgColor,
  };

  const Placeholder = () => (
    <div style={mystyle}>
      <img
        src={photo.tiny}
        className="lazyload-img"
        width="100%"
        alt="gird item"
      />
    </div>
  );

  const createNewPhoto = async () => {
    try {
      const variables = {
        width: photo.width,
        height: photo.height,
        color: photo.color,
        tiny: photo.tiny,
        small: photo.small,
        large: photo.large,
        downloadPage: photo.downloadPage,
        creditWeb: photo.creditWeb,
        creditId: photo.creditId,
        photographer: photo.photographer || photo.creditWeb,
        description: photo.description,
        tags: photo.tags,
        labels: photo.tags,
      };

      await createPhoto(variables);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <div className="grid-item">
      <LazyLoad height={200} offset={-50} debounce={500} placeholder={<Placeholder />}>
        <div className="photo-card photo-card-webicon overlay">
          <a href={photo.downloadPage} target="_">
            <img
              src={photo.small}
              width="100%"
              alt="search results"
            />
          </a>
          <div>
            <div id={photo.downloadPage} className="text-white">
              <button
                type="button"
                className="photo-card-btn-icon photo-card-btn1"
                onClick={() => window.open(photo.downloadPage)}
              >
                <i className="bi bi-download" />
              </button>
            </div>
            {/* <div id={photo.id} className="text-white">
              <SaveToCollectionsModal
                photo={photo}
                collectSinglePhoto={collectSinglePhoto}
              />
            </div> */}
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
            <div id={photo.downloadPage} className="text-white">
              <button
                type="button"
                className="photo-card-btn-icon photo-card-btn-web text-1rem"
                onClick={() => window.open(photo.creditId)}
              >
                <p>{photo.creditWeb}</p>
              </button>
            </div>
            { username === 'philo' && (
              <div className="text-white">
                <button
                  type="button"
                  className="photo-card-btn-icon photo-card-btn5"
                  onClick={() => createNewPhoto(photo)}
                >
                  <i className="bi bi-plus-square" />
                </button>
              </div>
            )}
          </div>
        </div>
      </LazyLoad>
    </div>
  );
};

export default SearchPhotoCard;
