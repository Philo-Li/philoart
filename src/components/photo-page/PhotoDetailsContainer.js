import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Card } from 'react-bootstrap';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import YouTube from 'react-youtube-embed';
import useLikePhoto from '../../hooks/useLikePhoto';
import useUnlikePhoto from '../../hooks/useUnlikePhoto';
import useDownloadPhoto from '../../hooks/useDownloadPhoto';
import DropdownButton from '../others/button/edit-photo-btn/DropdownButton';
import SaveToCollectionsModal from '../others/photo-card/SaveToCollectionsModal';
import DeletePhotoModal from './DeletePhotoModal';
import Colorbox from './Colorbox';
import PhotoInfo from './PhotoInfo';

const PhotoDetailContainer = ({ photoToShow, setPhotoToShow }) => {
  const [likePhoto] = useLikePhoto();
  const [unlikePhoto] = useUnlikePhoto();
  const [downloadPhoto] = useDownloadPhoto();
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showEditModal, setShowEditModal] = useState(false);
  const history = useHistory();
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  if (!photoToShow) return null;

  const bgColor = photoToShow.color || '#84B0B3';

  const mystyle = {
    backgroundColor: bgColor,
  };
  // console.log(photoToShow.allColors);
  const allColors = photoToShow.allColors && photoToShow.allColors.split(',');
  // console.log(allColors);

  const Placeholder = () => (
    <div style={mystyle}>
      <a href={`/photo/${photoToShow.id}`}>
        <img
          src={photoToShow.srcTiny}
          className="lazyload-img"
          width="100%"
          alt="gird item"
        />
      </a>
    </div>
  );

  const likeSinglePhoto = async () => {
    if (!userId) {
      history.push('/signin');
    } else {
      const temp = { ...photoToShow, isLiked: !photoToShow.isLiked };
      setPhotoToShow(temp);
      if (photoToShow.isLiked) {
        await unlikePhoto({ photoId: photoToShow.id });
      } else {
        await likePhoto({ photoId: photoToShow.id });
      }
    }
  };

  const openCollectModal = async () => {
    if (!userId) {
      history.push('/signin');
    } else {
      setShowCollectModal(true);
    }
  };

  const photo = photoToShow;

  const downloadSinglePhoto = async () => {
    window.open(photo.srcOriginal);
    await downloadPhoto({ id: photo.id });
  };

  const publishedDate = format(new Date(photo.createdAt), 'PP');
  // console.log('photo', photo, publishedDate, photo.createdAt);
  const initProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const { profileImage } = photo.user;

  return (
    <div className="p-3">
      <div className="container-collection-title">
        <div className="collection-dropbtn">
          {photo.user.username === username && (
            <DropdownButton
              setShowEditModal={setShowEditModal}
              setShowDeleteModal={setShowDeleteModal}
            />
          )}
        </div>
      </div>
      <DeletePhotoModal
        photo={photo}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <div className="photodetails-photo-item">
        <LazyLoad height={300} offset={[-100, 0]} debounce={500} once placeholder={<Placeholder />}>
          <Card>
            <img
              src={photoToShow.srcLarge}
              className="max-height-500"
              alt="collection cover"
            />
          </Card>
        </LazyLoad>
      </div>
      <div className="container-row-0">
        {allColors && allColors.map((c) => (
          <div key={nanoid()}>
            <Colorbox color={c} />
          </div>
        ))}
      </div>
      <div className="container-details-title-btn">
        <div className="container-row-0">
          <div className="container-photo-title">
            <Card>
              <Card.Title>
                <h1 className="photo-title">
                  {photo.title}
                </h1>
              </Card.Title>
              <Card.Body>
                <p className="photo-description">
                  {photo.description || 'No description'}
                </p>
              </Card.Body>
              <Card.Footer>
                {`Status: ${photo.status}`}
              </Card.Footer>
              <Card.Footer>
                {`License: ${photo.license}`}
              </Card.Footer>
            </Card>
          </div>
        </div>
        <div>
          <div className="container-row-0 container-row-primary">
            <a href={`/${photo.user.username}`}>
              <div className="">
                <img src={profileImage || initProfileImage} alt="user avatar" className="photo-details-author photo-details-author-avatar" />
              </div>
            </a>
            <a href={`/${photo.user.username}`}>
              <div className="photo-details-author-name">{`${photo.user.firstName} ${photo.user.lastName || ''}`}</div>
            </a>
            <div className="photo-detials-date">{publishedDate}</div>
          </div>
          <div className="container-row-photodetail-btn">
            <div className="">
              <button
                type="button"
                className="photodetails-card-btn-like container-row-0 photodetails-card-btn-item"
                onClick={() => likeSinglePhoto(photo)}
              >
                <div className="">
                  {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />)}
                  {photo.isLiked && (
                    <div className="red-icon">
                      <i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                    </div>
                  )}
                </div>
              </button>
            </div>
            <div>
              <button type="button" className="photodetails-card-btn-collect photodetails-card-btn-item" onClick={() => openCollectModal()}>
                <i className="bi bi-plus-square" />
              </button>
              <SaveToCollectionsModal
                photo={photo}
                showCollectModal={showCollectModal}
                setShowCollectModal={setShowCollectModal}
              />
            </div>
            <div className="photodetails-card-btn-item">
              {photo.allowDownload && (
                <button type="button" className="photodetails-card-btn-download" onClick={() => downloadSinglePhoto()}>
                  <i className="bi bi-download" />
                </button>
              )}
              {!photo.allowDownload && (
                <button type="button" className="photodetails-card-btn-download-disabled" disabled>
                  <i className="bi bi-download" />
                </button>
              )}
            </div>
          </div>
          <PhotoInfo photo={photo} />
        </div>
      </div>
      <div className="photodetails-photo-item">
        {photo.srcYoutube && (<YouTube id={photo.srcYoutube} />) }
      </div>
    </div>
  );
};

export default PhotoDetailContainer;
