/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import UserCollectionsList from '../UserCollectionsList';
import useCreateCollectionAndCollectPhoto from '../../../hooks/useCreateCollectionAndCollectPhoto';
import useField from '../../../hooks/useField';
import useAuthorizedUser from '../../../hooks/useAuthorizedUser';

const SaveToCollectionsModal = ({ photo, collectSinglePhoto }) => {
  const [show, setShow] = useState(false);
  const title = useField('text');
  const { authorizedUser } = useAuthorizedUser();
  const history = useHistory();
  const [createCollectionAndCollectPhoto] = useCreateCollectionAndCollectPhoto();

  const openCollectModal = async () => {
    if (!authorizedUser) {
      history.push('/signin');
    } else {
      setShow(true);
    }
  };

  const createNewCollection = async () => {
    try {
      const variables = {
        title: title.value,
        description: '',
        public: true,
        photoId: photo.id,
      };
      // console.log('variables', variables);
      await createCollectionAndCollectPhoto(variables);
      // history.push('/home');
      // eslint-disable-next-line no-alert
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <>
      <button type="button" className="photo-card-btn-icon photo-card-btn3" onClick={() => openCollectModal()}>
        <i className="bi bi-plus-square" />
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
            Save to collections
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-col">
            <div className="container-row-3">
              <Form id="createCollectionform" onSubmit={() => createNewCollection()}>
                <div className="container-row-3">
                  <div className="row-item-3">
                    <Form.Label>Save to new collection:</Form.Label>
                  </div>
                  <div className="row-item-0">
                    <input {...title} placeholder="title" aria-label="title" />
                    <Button variant="primary" id="create-button" type="submit">Save</Button>
                  </div>
                </div>
              </Form>
            </div>
            <div className="col-item-0">
              <UserCollectionsList
                show={show}
                photo={photo}
                collectSinglePhoto={collectSinglePhoto}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SaveToCollectionsModal;
