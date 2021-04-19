import React from 'react';
import { Card } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import galleryIcon from '../../img/galleryIcon.jpg';
import '../../MDB-Free_4.19.2/css/mdb.css';

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};
const INIT_COVER = galleryIcon;

const UserCollectionsList = ({ allCollections, collectSinglePhoto }) => {
  if (!allCollections) return (<p>Loading</p>);

  return (
    <div className="p-3 scrollmenu">
      <>
      </>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {allCollections.map((collection) => (
          <Card key={collection.id}>
            <div
              className="view zoom overlay"
              onClick={() => { collectSinglePhoto(collection); }}
              onKeyPress={() => collectSinglePhoto(collection)}
              role="button"
              tabIndex="0"
            >
              <img
                src={collection.coverToShow || INIT_COVER}
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
      </Masonry>
    </div>
  );
};

export default UserCollectionsList;
