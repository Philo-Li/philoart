/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Modal, Button, OverlayTrigger, Tooltip, Card, Accordion } from 'react-bootstrap';
import '../MDB-Free_4.19.2/css/mdb.css';
import UserCollectionsList from './UserCollectionsList';
import '../index.css';

const SaveToCollectionsModal = ({ photo, collectSinglePhoto }) => {
  const [show, setShow] = useState(false);
  const [collectionsToShow, setCollectionsToShow] = useState();

  const handleShowModal = () => {
    setShow(true);
    const updatedAllCollections = photo.allCollectionsToShow.map((collection) => {
      const collectedPhotos = collection.photos && collection.photos.edges
        ? collection.photos.edges.map((edge) => edge.node)
        : [];

      const find = collectedPhotos.find((obj) => obj.photo.id === photo.id);
      return find ? { ...collection, isCollected: true } : { ...collection, isCollected: false };
    });
    setCollectionsToShow(updatedAllCollections);
    console.log('updatedAllCollections', updatedAllCollections);
  };

  const createNewCollection = () => {
    console.log('create new collection');
  };

  return (
    <>
      <Button size="sm" className="button1" variant="light" onClick={() => handleShowModal()}>
        <i className="bi bi-plus-square" />
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
            Save to collections
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-profile">
            <div className="profile-item">
              <UserCollectionsList
                show={show}
                photo={photo}
                collectionsToShow={collectionsToShow}
                collectSinglePhoto={collectSinglePhoto}
              />
            </div>
            <div className="profile-item">
              <div className="button-1">
                <div id={photo.id}>
                  <OverlayTrigger overlay={<Tooltip id="tooltip-create-collection">Create collection</Tooltip>}>
                    <span className="d-inline-block">
                      <Accordion>
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => createNewCollection()}>
                              <i className="bi bi-plus-circle" />
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="0">
                            <div>
                              <div className="view zoom overlay">
                                <img src={photo.small} className="card-img-100" alt="smaple" />
                                <div className="mask flex-center rgba-blue-light white-text">
                                  <i size="lg" className="bi bi-check-square" />
                                </div>
                              </div>
                              <Card.Title>
                                <div className="flex-center">
                                  title
                                </div>
                              </Card.Title>
                            </div>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </span>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SaveToCollectionsModal;
