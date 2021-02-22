/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import { Modal, Button, Card, Form } from 'react-bootstrap';
import UserCollectionsList from './UserCollectionsList';
import useCreateCollection from '../hooks/useCreateCollection';
import useField from '../hooks/useField';
import '../MDB-Free_4.19.2/css/mdb.css';
import '../index.css';

const SaveToCollectionsModal = ({ photo, collectSinglePhoto }) => {
  const [show, setShow] = useState(false);
  const title = useField('title');
  const [createCollection] = useCreateCollection();

  const createNewCollection = async () => {
    // const variables = {
    //   title: title.value,
    //   description: '',
    //   public: true,
    // };
    // console.log('variables', variables);

    // await createCollection(variables);
    try {
      const variables = {
        title: title.value,
        description: '',
        public: true,
      };
      console.log('variables', variables);

      await createCollection(variables);
      // eslint-disable-next-line no-alert
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <>
      <Button size="sm" className="button1" variant="light" onClick={() => setShow(true)}>
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
                collectSinglePhoto={collectSinglePhoto}
              />
            </div>
            <div className="profile-item">
              <div className="button-1">
                <div id={photo.id}>
                  <div>
                    <button className="view zoom overlay" onClick={() => console.log('create')} type="button">
                      <img
                        src={photo.small}
                        className="card-img-100"
                        alt="createCollection"
                      />
                      <div className="mask flex-center rgba-blue-light white-text">
                        <i size="lg" className="bi bi-check-square" />
                      </div>
                    </button>
                    <Card.Title>
                      <div className="flex-center">
                        Create new Collection
                      </div>
                      <Form id="signinform" onSubmit={() => createNewCollection()}>
                        <div>
                          <Form.Label>title:</Form.Label>
                          <Form.Control {...title} />
                        </div>
                      </Form>
                    </Card.Title>
                    <Form id="signinform" onSubmit={() => createNewCollection()}>
                      <div>
                        <Form.Label>title:</Form.Label>
                        <Form.Control {...title} />
                      </div>
                      <Button variant="primary" id="create-button" type="submit">登录</Button>
                    </Form>
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

export default SaveToCollectionsModal;
