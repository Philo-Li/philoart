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

  const allColors = photoToShow.allColors.split(',');

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
    window.open(photo.srcLarge);
    await downloadPhoto({ id: photo.id });
  };

  const publishedDate = format(new Date(photo.createdAt), 'PP');
  // console.log('photo', photo, publishedDate, photo.createdAt);
  const initProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const { profileImage } = photo.user;

  return (
    <div className="p-3">
      <div className="photodetails-photo-item">
        <LazyLoad height={300} offset={[-100, 0]} debounce={500} once placeholder={<Placeholder />}>
          <Card>
            <img
              src={photoToShow.srcSmall}
              className="max-height-500"
              alt="collection cover"
            />
            {/* <MapInteractionCSS>
              <img src={photoToShow.small} className="max-height-500" alt="gird item" />
            </MapInteractionCSS> */}
          </Card>
        </LazyLoad>
      </div>
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
      <div className="container-row-0">
        {allColors && allColors.map((c) => (
          <div key={nanoid()}>
            <Colorbox color={c} />
          </div>
        ))}
        <div className="color-box" style={{ backgroundColor: bgColor }} />
      </div>
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
          <button type="button" className="photodetails-card-btn-download" onClick={() => downloadSinglePhoto()}>
            <i className="bi bi-download" />
          </button>
        </div>
      </div>
      <div className="container-row-0">
        <div className="container-row-0">
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
                Collections
              </div>
              <div>
                {photo.collectionCount}
              </div>
            </div>
          </div>
        </div>
        <div className="col-item-0">
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
      <div className="container-row-0">
        <div className="container-photo-title">
          <h1 className="photo-title">
            Title:
            {photo.title}
          </h1>
          <p className="photo-description">
            Description:
            {photo.description}
          </p>
        </div>
      </div>
      <div className="photodetails-photo-item">
        {photo.srcYoutube && (<YouTube id={photo.srcYoutube} />) }
      </div>
    </div>
  );
};

export default PhotoDetailContainer;
