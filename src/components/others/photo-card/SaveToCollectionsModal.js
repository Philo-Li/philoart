/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Alert } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import UserCollectionsList from '../UserCollectionsList';
import useCreateCollectionAndCollectPhoto from '../../../hooks/useCreateCollectionAndCollectPhoto';
import useCollections from '../../../hooks/useUserCollectionsPlus';
import useUncollectPhoto from '../../../hooks/useUncollectPhoto';
import useCollectPhoto from '../../../hooks/useCollectPhoto';
import TextInput from '../TextInput';

const validationSchema = Yup.object().shape({
  title: Yup
    .string()
    .required('Title is required'),
});

const initialValues = {
  title: '',
};

export const CreateAndSaveForm = ({ loading }) => (
  <Form className="container-create-collection-row">
    <div className="create-collection-row-item">
      <TextInput
        name="title"
        type="text"
        placeholder="Create new and save"
      />
    </div>

    <div className="create-collection-row-item">
      {!loading && (
        <button type="submit" className="create-collection-btn" id="create-button">
          Save
        </button>
      )}
      {loading && (
        <button type="submit" className="create-collection-btn" id="create-loading-button" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </button>
      )}
    </div>
  </Form>
);

const SaveToCollectionsModal = ({
  photo, showCollectModal, setShowCollectModal,
}) => {
  const [createCollectionAndCollectPhoto, newCollection] = useCreateCollectionAndCollectPhoto();
  const [collectPhoto] = useCollectPhoto();
  const [uncollectPhoto] = useUncollectPhoto();
  const [errorInfo, setErrorInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const [allCollections, setAllCollections] = useState();
  const { username } = localStorage;

  const { collections } = useCollections({
    username,
    first: 30,
  });

  useEffect(() => {
    if (collections) {
      const temp = collections && collections.edges
        ? collections.edges.map((edge) => edge.node)
        : [];
      const updatedAllCollections = temp
        .map((obj) => {
          let findCollected = false;
          // eslint-disable-next-line no-unused-vars
          const photosInCollection = obj.photos && obj.photos.edges
            ? obj.photos.edges.map((edge) => {
              if (edge.node.photo.id === photo.id) findCollected = true;
              return edge.node;
            })
            : [];

          return { ...obj, isCollected: findCollected, coverToShow: obj.cover };
        });
      setAllCollections(updatedAllCollections);
      setLoading(false);
    }
    if (allCollections && newCollection) {
      const updatedCollection = { ...newCollection, isCollected: true, coverToShow: newCollection.cover };
      setAllCollections([updatedCollection, ...allCollections]);
    }
  }, [collections, newCollection]);

  const onSubmit = async (value) => {
    const { title } = value;
    setLoading(true);
    try {
      const variables = {
        title,
        description: '',
        public: true,
        photoId: photo.id,
      };
      await createCollectionAndCollectPhoto(variables);
    } catch (e) {
      setErrorInfo(e.message);
      setTimeout(() => { setErrorInfo(''); }, 3000);
    }
    setLoading(false);
  };

  const collectSinglePhoto = async (collection) => {
    const uncollect = collection.isCollected;
    const updatedCollection = {
      ...collection,
      isCollected: !collection.isCollected,
      coverToShow: uncollect ? collection.cover : photo.small,
    };
    const updatedAllCollections = allCollections
      .map((obj) => (obj.id === collection.id ? updatedCollection : obj));

    setAllCollections(updatedAllCollections);

    if (uncollect) {
      // console.log('uncollect photo', photo.id, collection.id);
      await uncollectPhoto({ photoId: photo.id, collectionId: collection.id });
    } else {
      await collectPhoto({ photoId: photo.id, collectionId: collection.id });
      // console.log('collect photo', photo.id, collection.id);
    }
  };

  return (
    <>
      <Modal
        show={showCollectModal}
        onHide={() => setShowCollectModal(false)}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Save to collections
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-col">
            {errorInfo && (
              <Alert variant="danger">
                {errorInfo}
              </Alert>
            )}
            <div className="container-row-3">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ handleSubmit }) => <CreateAndSaveForm onSubmit={handleSubmit} loading={loading} />}
              </Formik>
            </div>
            <div className="col-item-0">
              <UserCollectionsList
                allCollections={allCollections}
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
