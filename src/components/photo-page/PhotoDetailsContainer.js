import React from 'react';
import { useHistory } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import useLikePhoto from '../../hooks/useLikePhoto';
import useUnlikePhoto from '../../hooks/useUnlikePhoto';
import useUncollectPhoto from '../../hooks/useUncollectPhoto';
import useCollectPhoto from '../../hooks/useCollectPhoto';
import SaveToCollectionsModal2 from './SaveToCollectionsModal2';
import PhotoMoreDetailsModal from '../others/photo-card/PhotoMoreDetailsModal';

const PhotoDetailContainer = ({ photoToShow, setPhotoToShow, authorizedUser }) => {
  const [likePhoto] = useLikePhoto();
  const [unlikePhoto] = useUnlikePhoto();
  const [collectPhoto] = useCollectPhoto();
  const [uncollectPhoto] = useUncollectPhoto();
  const history = useHistory();

  if (!photoToShow) return null;

  const likeSinglePhoto = async () => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      const temp = { ...photoToShow, isLiked: !photoToShow.isLiked };
      setPhotoToShow(temp);
      if (photoToShow.isLiked) {
        const photoLikes = photoToShow.likes && photoToShow.likes.edges
          ? photoToShow.likes.edges.map((edge) => edge.node)
          : [];

        const likedId = photoLikes.find((like) => like.user.id === authorizedUser.id);
        await unlikePhoto({ id: likedId.id });
      } else {
        await likePhoto({ photoId: photoToShow.id });
      }
    }
  };

  const collectSinglePhoto = async (photo, collection) => {
    const updatedCollection = { ...collection, isCollected: !collection.isCollected };
    const updatedCollections = photo.allCollectionsToShow
      .map((obj) => (obj.id === collection.id ? updatedCollection : obj));
    const updatedPhoto = { ...photo, allCollectionsToShow: updatedCollections };
    setPhotoToShow(updatedPhoto);
    if (collection.isCollected) {
      const photoCollections = photo.collections && photo.collections.edges
        ? photo.collections.edges.map((edge) => edge.node)
        : [];

      const collectedPhoto = photoCollections.find((collected) => collected.photo.id === photo.id);
      // console.log('uncollect photo', photo.id, collection.id, collectedPhoto);
      await uncollectPhoto({ id: collectedPhoto.id });
    } else {
      await collectPhoto({ photoId: photo.id, collectionId: collection.id });
      // console.log('collect photo', photo.id, collection.id);
    }
  };

  const photo = photoToShow;

  const photoCredit = `Photo by ${photo.photographer}`;

  return (
    <div className="p-3">
      <div className="container-row-photodetail-btn">
        <div className="">
          <button
            type="button"
            className="photodetails-card-btn-like container-row-0 photodetails-card-btn-item"
            onClick={() => likeSinglePhoto(photo)}
          >
            <div className="margin-right">
              {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />)}
              {photo.isLiked && (
                <div className="red-icon">
                  <i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                </div>
              )}
            </div>
            {photo.likeCount}
            {photo.likeCount <= 1 ? 'like' : 'likes'}
          </button>
        </div>
        <div>
          <SaveToCollectionsModal2
            photo={photoToShow}
            allCollections={photoToShow.collections}
            collectSinglePhoto={collectSinglePhoto}
          />
        </div>
        <div className="photodetails-card-btn-item">
          <button type="button" className="photodetails-card-btn-download" onClick={() => window.open(photoToShow.downloadPage)}>
            <i className="bi bi-download margin-right" />
            Download
          </button>
        </div>
      </div>
      <div className="profile-item">
        <Image src={photoToShow.small} magin={10} height={500} fluid />
      </div>
      <div className="container-row-0">
        <h5>{photoCredit}</h5>
      </div>
      <div className="container-row-0">
        <div className="container-col-details margin-1rem">
          <div className="subtitle">
            Website
          </div>
          <div>
            <a href="https://www.pexels.com" target="_">{photo.creditWeb}</a>
          </div>
        </div>
        <div className="container-col-details margin-1rem">
          <div className="subtitle">
            Downloads
          </div>
          <div>
            {photo.downloadCount}
          </div>
        </div>
        <PhotoMoreDetailsModal photo={photo} />
      </div>
    </div>
  );
};

export default PhotoDetailContainer;
