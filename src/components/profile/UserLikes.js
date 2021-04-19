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

          const updatedPhoto = {
            ...photo,
            isLiked: findUserLike != null,
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
