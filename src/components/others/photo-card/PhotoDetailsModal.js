import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Modal, Button, Image,
} from 'react-bootstrap';
import SaveToCollectionsModal from './SaveToCollectionsModal';
import PhotoMoreDetailsModal from './PhotoMoreDetailsModal';
import PhotoRelatedTagBar from '../PhotoRelatedTagBar';
import RelatedPhotos from '../../photo-page/RelatedPhotos';

const PhotoDetailsModal = ({
  photo, collectSinglePhoto, likeSinglePhoto, authorizedUser,
}) => {
  const [show, setShow] = useState(false);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const history = useHistory();

  const openCollectModal = async () => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      setShowCollectModal(true);
    }
  };

  return (
    <>
      <button type="button" className="photo-card-btn-icon photo-card-btn4" onClick={() => setShow(true)}>
        <i className="bi bi-search" />
      </button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Photo by
            {' '}
            {photo.photographer}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-profile">
            <div className="profile-item">
              <Image src={photo.small} magin={10} fluid />
            </div>
            <div className="profile-item">
              <div className="container-col">
                <div className="container-col">
                  <div id={photo.id}>
                    <Button variant="light" onClick={() => window.open(photo.downloadPage)}>
                      <i className="bi bi-download" />
                    </Button>
                  </div>
                  <div className="button-0">
                    <Button className="button1" variant="light" onClick={() => openCollectModal()}>
                      <i className="bi bi-plus-square " />
                    </Button>
                    <SaveToCollectionsModal
                      photo={photo}
                      collectSinglePhoto={collectSinglePhoto}
                      showCollectModal={showCollectModal}
                      setShowCollectModal={setShowCollectModal}
                    />
                  </div>
                  <div className="button-0">
                    <Button variant="light" onClick={() => likeSinglePhoto(photo)}>
                      {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />)}
                      {photo.isLiked && (
                        <div className="red-icon">
                          <i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                        </div>
                      )}
                    </Button>
                  </div>
                  <div className="button-0">
                    <PhotoMoreDetailsModal photo={photo} />
                  </div>
                  <div className="container-row-2">
                    Photo by
                    {' '}
                    {photo.photographer}
                  </div>
                  <div>
                    from
                    {' '}
                    <a href={photo.creditId} target="_">{photo.creditWeb}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PhotoRelatedTagBar photo={photo} />
          <RelatedPhotos photoToShow={photo} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PhotoDetailsModal;
