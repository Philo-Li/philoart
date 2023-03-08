import React from 'react';
// import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import CollectionCard from '../profile/user-collections/CollectionCard';
// import galleryIcon from '../../img/galleryIcon.jpg';

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

// const INIT_COVER = galleryIcon;

const DiscoverCollectionList = ({ allCollections, category }) => {
  const collectionsToShow = allCollections
    .filter((collection) => collection.description === category);

  const history = useHistory();
  if (!collectionsToShow) {
    return (
      <div className="col-item-3">
        <h3>No result</h3>
      </div>
    );
  }

  // eslint-disable-next-line no-unused-vars
  const openCollection = (collection) => {
    history.push(`/collection/${collection.id}`);
  };

  return (
    <div className="p-3">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {/* {collectionsToShow.map((collection) => (
          <Card key={collection.id}>
            <div
              className="view zoom overlay"
              onClick={() => { openCollection(collection); }}
              onKeyPress={() => openCollection(collection)}
              role="button"
              tabIndex="0"
            >
              <img
                src={collection.cover || INIT_COVER}
                className="max-height-100"
                alt="smaple"
              />
              <div className="mask flex-center rgba-blue-light white-text">
                <i size="lg" className="bi bi-search" />
              </div>
            </div>
            <Card.Title>
              <p className="row-item-0">
                {collection.title}
                (
                {collection.photoCount}
                )
              </p>
            </Card.Title>
          </Card>
        ))} */}
        {collectionsToShow.map((collection) => (
          <CollectionCard
            key={collection.id}
            showEditButton={false}
            collection={collection}
          />
        ))}
      </Masonry>
    </div>
  );
};

export default DiscoverCollectionList;
