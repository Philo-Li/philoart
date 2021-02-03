/* eslint-disable object-curly-newline */
/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { Modal, Button, Image, Card } from 'react-bootstrap';
import PhotoMoreDetailsModal from './PhotoMoreDetailsModal';
import '../index.css';

const PhotoDetailsModal = ({ photo, collectPhoto, likeSinglePhoto }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button className="button1" variant="info" onClick={() => setShow(true)}>
        Details
      </Button>

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
                    <Button variant="light" size="lg" onClick={() => window.open(photo.downloadPage)}>
                      <i className="bi bi-download" />
                    </Button>
                  </div>
                  <div className="button-0">
                    <Button variant="light" size="lg" onClick={() => collectPhoto(photo.id)}>
                      <i className="bi bi-plus-square" />
                    </Button>
                  </div>
                  <div className="button-0">
                    <Button variant="light" size="lg" onClick={() => likeSinglePhoto(photo)}>
                      <i className="bi bi-heart" />
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
                    <Card.Link href="#" className="col-item-0">{photo.creditWeb}</Card.Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PhotoDetailsModal;
