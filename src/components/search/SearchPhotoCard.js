/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import SaveToCollectionsModal from '../others/photo-card/SaveToCollectionsModal';
import useCreatePhoto from '../../hooks/useCreatePhoto';
import '../../MDB-Free_4.19.2/css/mdb.css';

const SearchPhotoCard = ({
  photo, authorizedUser, likeSinglePhoto, collectSinglePhoto,
}) => {
  if (!photo) return null;
  const [createPhoto] = useCreatePhoto();

  const Placeholder = () => (
    <div className="photo-card placeholder">
      <img
        src={photo.tiny}
        width="100%"
        alt="lazy load search results"
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
        photographer: photo.photographer,
        description: photo.description,
        tags: photo.tags,
      };
      // console.log('photonow', photo, 'variables', variables);

      await createPhoto(variables);
      // eslint-disable-next-line no-alert
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <div className="grid-item">
      <div className="photo-card photo-card-webicon overlay">
        <Link
          key={photo.downloadPage}
          to={{
            pathname: `${photo.downloadPage}`,
          }}
          target="_blank"
        >
          <LazyLoad height={200} offset={[-200, 0]} debounce={500} placeholder={<Placeholder />}>
            <img
              src={photo.small}
              width="100%"
              alt="search results"
            />
          </LazyLoad>
        </Link>
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
          { authorizedUser && authorizedUser.username === 'picky' && (
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
    </div>
  );
};

export default SearchPhotoCard;
