import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { css } from '@emotion/react';
import BeatLoader from 'react-spinners/BeatLoader';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useHistory, useParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import '../../index.css';
import useCollections from '../../hooks/useCollections';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const breakpointColumnsObj = {
  default: 3,
  800: 2,
  500: 1,
};

const INIT_COVER = 'https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-gallery-vector-icon-png-image_470660.jpg';

const UserCollections = () => {
  const [loading, setLoading] = useState(false);
  const [allCollections, setAllCollections] = useState();

  const history = useHistory();
  let { username } = useParams();
  username = username.substr(1, username.length - 1);
  const { collections, fetchMore } = useCollections({
    username,
    first: 30,
  });

  useEffect(() => {
    if (collections) {
      const temp = collections && collections.edges
        ? collections.edges.map((edge) => edge.node)
        : [];

      const updatedAllCollections = temp.map((collection) => {
        let coverToShow;
        if (collection.photoCount === 0) {
          coverToShow = INIT_COVER;
        } else {
          coverToShow = collection.photos.edges[0].node.photo.small;
        }
        const updatedCollection = {
          coverToShow,
          ...collection,
        };
        return updatedCollection;
      });
      setAllCollections(updatedAllCollections);
      setLoading(false);
    }
  }, [collections]);

  const openCollection = (collectionId) => {
    history.push(`/collection/${collectionId}`);
  };

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

  if (allCollections === undefined) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
      </div>
    );
  }

  return (
    <div className="p-3">
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
              onClick={() => { openCollection(collection.id); }}
              onKeyPress={() => openCollection(collection.id)}
              role="button"
              tabIndex="0"
            >
              <img
                src={collection.coverToShow}
                className="max-height-100"
                alt="smaple"
              />
              <div className="mask flex-center rgba-blue-light white-text">
                <i size="lg" className="bi bi-search" />
              </div>
            </div>
            <Card.Title>
              <div className="container-collection-title">
                <div className="item-0-collection-title">
                  <p className="row-item-0">
                    {collection.title}
                    (
                    {collection.photoCount}
                    )
                  </p>
                </div>
              </div>
            </Card.Title>
          </Card>
        ))}
      </Masonry>
      { loading && (<BeatLoader color="#9B9B9B" loading css={override} size={50} />) }
      <div className="row-item-2">
        <button className="more-photos-btn" type="button" onClick={clickFetchMore}>
          <i className="bi bi-three-dots" />
          More collections
        </button>
      </div>
    </div>
  );
};

export default UserCollections;
