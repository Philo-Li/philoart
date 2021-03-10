/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import galleryIcon from '../img/galleryIcon.jpg';
import '../MDB-Free_4.19.2/css/mdb.css';
import '../index.css';

const cover = galleryIcon;

const UserCollectionsList = ({ photo, collectSinglePhoto }) => {
  if (!photo.allCollectionsToShow) return null;

  return (
    <div className="p-3">
      <>
      </>
      <CardColumns className="sm my-2 my-lg-5">
        {photo.allCollectionsToShow.map((collection) => (
          <Card key={collection.id}>
            <div
              className="view zoom overlay"
              onClick={() => { collectSinglePhoto(photo, collection); }}
              onKeyPress={() => collectSinglePhoto(photo, collection)}
              role="button"
              tabIndex="0"
            >
              <img
                src={collection.cover != null ? collection.cover : cover}
                className="max-height"
                alt="smaple"
              />
              <div className="mask flex-center rgba-blue-light white-text">
                <i size="lg" className="bi bi-check-square" />
              </div>
            </div>
            <Card.Title>
              <div className="flex-center">
                {collection.title}
                <div className="green-icon">
                  <i className={collection.isCollected ? 'bi bi-check-square-fill' : 'bi bi-check-square'} />
                </div>
              </div>
            </Card.Title>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default UserCollectionsList;
