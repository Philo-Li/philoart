import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import '../MDB-Free_4.19.2/css/mdb.css';

const SearchPhotoCard = ({ photo }) => {
  if (!photo) return null;

  return (
    <div className="grid-item">
      <div className="photo-card overlay">
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
              className="search-photo-card-btn-icon photo-card-btn1"
              onClick={() => window.open(photo.url)}
            >
              <div className="containter-search-photo-card">
                <div className="search-photo-card-btn-item1">
                  <p>pexels</p>
                </div>
                <div className="search-photo-card-btn-item2">
                  <i className="bi bi-box-arrow-up-right" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPhotoCard;
