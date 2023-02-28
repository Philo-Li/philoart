import React from 'react';

const PhotoInfo = ({ photo }) => (
  <div className="container-row-0">
    <div className="container-row-0">
      <div className="row-item-0">
        <div className="container-col-details">
          <div className="subtitle">
            Likes
          </div>
          <div>
            {photo.likeCount}
          </div>
        </div>
      </div>
      <div className="row-item-0">
        <div className="container-col-details">
          <div className="subtitle">
            Collections
          </div>
          <div>
            {photo.collectionCount}
          </div>
        </div>
      </div>
    </div>
    <div className="col-item-0">
      <div className="container-col-details">
        <div className="subtitle">
          Downloads
        </div>
        <div>
          {photo.downloadCount}
        </div>
      </div>
    </div>
  </div>
);

export default PhotoInfo;
