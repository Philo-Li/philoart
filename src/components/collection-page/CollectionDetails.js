/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import CollectionDropdownButton from '../others/button/edit-collection-btn/CollectionDropdownButton';
import HomePhotoList from '../others/photo-list/HomePhotoList';
import useCollection from '../../hooks/useCollection';
import EditCollectionModal from './edit-collection/EditCollectionModal';
import DeleteCollectionModal from './DeleteCollectionModal';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const CollectionDetails = () => {
  const { id } = useParams();
  const [allPhotos, setAllPhotos] = useState();
  const [collectionNow, setCollectionNow] = useState();
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  const variables = {
    id,
    checkUserLike: userId,
    first: 20,
  };

  const { collection, fetchMore, hasNextPage } = useCollection(variables);

  useEffect(() => {
    if (collection) {
      const temp = collection.photoCount > 0
        ? collection.photos.edges.map((edge) => edge.node.photo)
        : [];
      setCollectionNow(collection);

      setAllPhotos(temp);
      setLoading(false);
    }
  }, [collection]);

  const clickFetchMore = () => {
    if (collectionNow.photoCount > allPhotos.length) {
      fetchMore();
      setLoading(true);
    }
  };

  if (!collectionNow) {
    return (
      <div className="col-item-3">
        <PacmanLoader color="#9B9B9B" loading css={override} size={50} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="container-col-collection-details">
          <div className="col-item-collection-title">
            <h1 className="header-bold">
              {collectionNow.title}
            </h1>
          </div>
          <div className="col-item-collection-description">
            <p className="">
              Collected by
              {' '}
              {collectionNow.user.username}
            </p>
          </div>
          <div className="col-item-collection-description">
            <p className="">
              {collectionNow.photoCount}
              {' '}
              photos
            </p>
          </div>
        </div>
      </div>
      <div className="container-collection-title">
        <div className="collection-dropbtn">
          {username && collectionNow.user.username === username && (
            <CollectionDropdownButton
              setShowEditCollectionModal={setShowEditCollectionModal}
              setShowDeleteModal={setShowDeleteModal}
            />
          )}
        </div>
      </div>
      <EditCollectionModal
        collectionNow={collectionNow}
        setCollectionNow={setCollectionNow}
        showEditCollectionModal={showEditCollectionModal}
        setShowEditCollectionModal={setShowEditCollectionModal}
      />
      <DeleteCollectionModal
        collectionNow={collectionNow}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <HomePhotoList
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
        loading={loading}
        column="collection"
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default CollectionDetails;
