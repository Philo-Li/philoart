import React, { useState, useEffect } from 'react';
import usePhotos from '../../hooks/usePhotos';
import RelatedPhotoList from './RelatedPhotoList';

const RelatedPhotos = ({
  authorizedUser, photoToShow,
}) => {
  const [allPhotos, setAllPhotos] = useState();
  const [loading, setLoading] = useState(false);

  const tags1 = photoToShow && photoToShow.labels;

  const tags = tags1 && tags1.split(',');

  const { photos, fetchMore } = usePhotos({ searchKeyword: tags && tags[0], first: 10 });

  useEffect(() => {
    if (photos) {
      const temp = photos && photos.edges
        ? photos.edges.map((edge) => edge.node)
        : [];
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
            return findCollected != null
              ? { ...collection, isCollected: true }
              : { ...collection, isCollected: false };
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
      setLoading(false);
    }
  }, [photos, authorizedUser]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

  // console.log('picky: photos', photos);
  // console.log('picky: updatedAllPhotos', allPhotos);
  // console.log('picky: authorizedUser', authorizedUser);

  return (
    <div>
      <div className="p-3 container-profile">
        <div className="profile-item">
          <h1>Similar photos</h1>
        </div>
      </div>
      <RelatedPhotoList
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
        loading={loading}
      />
    </div>
  );
};

export default RelatedPhotos;
