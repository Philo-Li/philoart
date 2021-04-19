import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import CollectionDropdownButton from '../others/CollectionDropdownButton';
import HomePhotoList from '../others/photo-list/HomePhotoList';
import useCollectionPhotos from '../../hooks/useCollectionPhotos';
import EditCollectionModal from './EditCollection/EditCollectionModal';
import DeleteCollectionModal from './DeleteCollectionModal';

const override = css`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 3rem;
  margin-bottom: 6rem;
`;

const CollectionDetails = ({ authorizedUser }) => {
  const { id } = useParams();
  const [allPhotos, setAllPhotos] = useState();
  const [collectionNow, setCollectionNow] = useState();
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const variables = {
    id,
    first: 20,
  };
  const { photosInCollection, fetchMore } = useCollectionPhotos(variables);

  useEffect(() => {
    if (photosInCollection) {
      const temp = photosInCollection && photosInCollection.edges
        ? photosInCollection.edges.map((edge) => edge.node.photo)
        : [];

      setCollectionNow(photosInCollection.edges[0].node.collection);

      if (!authorizedUser) {
        const updatedAllPhotos = temp.map((photo) => ({ ...photo, isLiked: false }));
        setAllPhotos(updatedAllPhotos);
      } else {
        const updatedAllPhotos = temp.map((photo) => {
          const photoLikes = photo.likes && photo.likes.edges
            ? photo.likes.edges.map((edge) => edge.node)
            : [];

          const findUserLike = photoLikes && photoLikes
            .find((like) => like.user.id === authorizedUser.id);

          const updatedPhoto = {
            ...photo,
            isLiked: findUserLike != null,
          };

          return updatedPhoto;
        });
        setAllPhotos(updatedAllPhotos);
      }
      setLoading(false);
    }
  }, [photosInCollection]);

  const clickFetchMore = () => {
    if (collectionNow.photoCount > allPhotos.length) {
      fetchMore();
      setLoading(true);
    }
  };

  if (collectionNow === undefined) {
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
          {collectionNow.user.username === authorizedUser.username && (
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
      />
    </div>
  );
};

export default CollectionDetails;
