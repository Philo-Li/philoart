import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import galleryIcon from '../../../img/galleryIcon.jpg';
import '../../../MDB-Free_4.19.2/css/mdb.css';

const INIT_COVER = galleryIcon;

const CategoryCard = ({ collection }) => {
  if (!collection) return null;
  const history = useHistory();

  const openCollection = (collectionId) => {
    history.push(`/collection/${collectionId}`);
  };

  return (
    <div className="p-3">
      <Card key={collection.id}>
        <div
          className="view zoom overlay"
          onClick={() => { openCollection(collection.id); }}
          onKeyPress={() => openCollection(collection.id)}
          role="button"
          tabIndex="0"
        >
          <img
            src={collection.cover || INIT_COVER}
            className="max-height-30"
            alt="collection cover"
          />
          <div className="mask flex-center rgba-blue-light white-text">
            <p>{collection.title}</p>
          </div>
        </div>
        <Card.Title>
          <div className="container-user-collection-list-title">
            <div className="user-collection-list-title">
              {collection.title}
              (
              {collection.photoCount}
              )
            </div>
          </div>
        </Card.Title>
      </Card>
    </div>
  );
};

export default CategoryCard;
