/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Image, Card } from 'react-bootstrap';
import '../index.css';
import useLikePhoto from '../hooks/useLikePhoto';
import useUnlikePhoto from '../hooks/useUnlikePhoto';
import useUncollectPhoto from '../hooks/useUncollectPhoto';
import useCollectPhoto from '../hooks/useCollectPhoto';
import SaveToCollectionsModal2 from './SaveToCollectionsModal2';

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
    const updatedCollections = photo.allCollectionsToShow.map((obj) => (obj.id === collection.id ? updatedCollection : obj));
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

  return (
    <div className="p-3">
      <div className="container-profile">
        <div className="profile-item">
          <Image src={photoToShow.small} magin={10} fluid />
        </div>
        <div className="profile-item">
          <div className="container-col">
            <div className="container-col">
              <div className="container-row-1">
                <div className="row-item-0">
                  <div className="container-col-details">
                    <div>
                      <Button variant="light" onClick={() => likeSinglePhoto(photoToShow)}>
                        {!photoToShow.isLiked && (<i className={photoToShow.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />)}
                        {photoToShow.isLiked && (
                          <div className="red-icon">
                            <i className={photoToShow.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="row-item-0">
                  <div className="container-col-details">
                    <div>
                      <SaveToCollectionsModal2
                        photo={photoToShow}
                        allCollections={photoToShow.collections}
                        collectSinglePhoto={collectSinglePhoto}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-row-5">
                <Button variant="success" size="lg" block onClick={() => window.open(photoToShow.downloadPage)}>
                  <i className="bi bi-download icon-download" />
                  Download
                </Button>
              </div>
              <Card>
                <Card.Body>
                  <div className="container-row-1">
                    <div className="row-item-0">
                      <div className="container-col-details">
                        <div className="subtitle">
                          Likes
                        </div>
                        <div>
                          {photo.likeCount}
                        </div>
                      </div>
                    </div>
                    <div className="row-item-0">
                      <div className="container-col-details">
                        <div className="subtitle">
                          Downloads
                        </div>
                        <div>
                          {photo.downloadCount}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-row-1">
                    <div className="container-col-details">
                      <div className="col-item-0">
                        <div className="container-col-details">
                          <div className="subtitle">
                            Width
                          </div>
                          <div>
                            {photo.width}
                          </div>
                        </div>
                      </div>
                      <div className="col-item-0">
                        <div className="container-col-details">
                          <div className="subtitle">
                            Height
                          </div>
                          <div>
                            {photo.height}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container-col-details">
                      <div className="col-item-0">
                        <div className="container-col-details">
                          <div className="subtitle">
                            Photographer
                          </div>
                          <div>
                            {photo.photographer}
                          </div>
                        </div>
                      </div>
                      <div className="col-item-0">
                        <div className="container-col-details">
                          <div className="subtitle">
                            Website
                          </div>
                          <div>
                            <Card.Link href="#" className="col-item-0">{photo.creditWeb}</Card.Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container-col-details">
                      <div className="col-item-0">
                        <div className="container-col-details">
                          <div className="subtitle">
                            Width
                          </div>
                          <div>
                            {photo.width}
                          </div>
                        </div>
                      </div>
                      <div className="col-item-0">
                        <div className="container-col-details">
                          <div className="subtitle">
                            Height
                          </div>
                          <div>
                            {photo.height}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailContainer;
