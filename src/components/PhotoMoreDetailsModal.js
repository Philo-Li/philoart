/* eslint-disable object-curly-newline */
/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const PhotoMoreDetailsModal = ({ photo }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button className="button1" variant="info" onClick={() => setShow(true)}>
        Info
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    {photo.creditWeb}
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PhotoMoreDetailsModal;
