import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import HomePhotoList from '../others/photo-list/HomePhotoList';
import useCollectionPhotos from '../../hooks/useCollectionPhotos';
import useDeleteCollection from '../../hooks/useDeleteCollection';

const CollectionDetails = ({ authorizedUser }) => {
  const history = useHistory();
  const { id } = useParams();
  const [allPhotos, setAllPhotos] = useState();
  const [collectionNow, setCollectionNow] = useState();
  const [deleteCollection] = useDeleteCollection();

  const variables = {
    id,
    first: 30,
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

          const photoInCollections = photo.collections && photo.collections.edges
            ? photo.collections.edges.map((edge) => edge.node.collection)
            : [];

          const userCollections = authorizedUser.collectionCount !== 0
            ? authorizedUser.collections.edges.map((edge) => edge.node)
            : [];

          const collectionsToShow = userCollections && userCollections.map((collection) => {
            const findCollected = photoInCollections.find((obj) => obj.id === collection.id);
            let newCover;

            if (collection.photoCount !== 0) {
              newCover = collection.photos.edges[0].node.photo.small;
            } else {
              newCover = null;
            }

            return findCollected != null
              ? { ...collection, isCollected: true, cover: newCover }
              : { ...collection, isCollected: false, cover: newCover };
          });

          const updatedPhoto = {
            ...photo,
            isLiked: findUserLike != null,
            allCollectionsToShow: collectionsToShow,
          };

          return updatedPhoto;
        });
        setAllPhotos(updatedAllPhotos);
      }
    }
  }, [photosInCollection]);

  const clickFetchMore = () => {
    fetchMore();
  };

  const deleteSingleCollection = async (collectionId) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('delete this collection?')) {
      await deleteCollection({ id: collectionId });
      // history.push(`/user/${authorizedUser.id}/collections`);
      history.goBack();
    }
  };

  return (
    <div>
      <div>
        <div className="col-item-4">
          { collectionNow && <h1 className="header-bold">{collectionNow.title}</h1> }
        </div>
      </div>
      <div className="container-collection-title">
        <div className="item-1-collection-title">
          { authorizedUser && collectionNow && (authorizedUser.id === collectionNow.user.id) && (
            <Button variant="apparent" size="sm" onClick={() => deleteSingleCollection(collectionNow.id)}>
              <i className="bi bi-trash-fill icon-delete" />
            </Button>
          ) }
        </div>
      </div>
      <HomePhotoList
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
      />
    </div>
  );
};

export default CollectionDetails;
