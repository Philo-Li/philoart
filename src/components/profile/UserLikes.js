import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUserLikes from '../../hooks/useUserLikes';
import HomePhotoList from '../others/photo-list/HomePhotoList';

const UserLikes = ({ authorizedUser }) => {
  const [allLikedPhotos, setAllLikedPhotos] = useState();
  const [loading, setLoading] = useState(false);
  let { username } = useParams();
  username = username.substr(1, username.length - 1);
  const { likes, fetchMore } = useUserLikes({ username, first: 15 });

  useEffect(() => {
    if (likes) {
      const temp = likes && likes.edges
        ? likes.edges.map((edge) => edge.node.photo)
        : [];
      if (!authorizedUser) {
        const updatedAllPhotos = temp.map((photo) => ({ ...photo, isLiked: false }));
        setAllLikedPhotos(updatedAllPhotos);
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
            if (collection.photoCount !== 0) newCover = collection.photos.edges[0].node.photo.small;
            else newCover = null;
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
        setAllLikedPhotos(updatedAllPhotos);
      }
      setLoading(false);
    }
  }, [likes, authorizedUser]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

  return (
    <div className="p-3">
      <HomePhotoList
        allPhotos={allLikedPhotos}
        setAllPhotos={setAllLikedPhotos}
        clickFetchMore={clickFetchMore}
        loading={loading}
      />
    </div>
  );
};

export default UserLikes;
