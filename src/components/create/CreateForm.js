import React from 'react';
// eslint-disable-next-line no-unused-vars
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';
import TextInput from '../others/TextInput';
import Previews from '../upload/uploadComponent';
// import { Dropzone } from "dropzone";

const urlEndpoint = 'https://ik.imagekit.io/6h6oyg1zvzr/';

const onError = () => {

};

const onSuccess = () => {

};

const onChange = () => {
  console.log('submit');
};

const CreateForm = ({ loading }) => (
  <Form>
    <IKContext urlEndpoint={urlEndpoint}>
      <IKUpload>
        {/* <input type="file">1</input> */}
        {/* <input type="submit" value="Submit" /> */}
      </IKUpload>
      <IKUpload
        onError={onError}
        onSuccess={onSuccess}
      />

      <IKUpload
        fileName="file-name.jpg"
        tags={['sample-tag1', 'sample-tag2']}
        customCoordinates="10,10,10,10"
        isPrivateFile={false}
        useUniqueFileName
        responseFields={['tags']}
        folder="/sample-folder"
        onChange={onChange}
        onError={onError}
        onSuccess={onSuccess}
      />
    </IKContext>
    <Previews />
    <div className="container-row-signup">
      {/* <IKImage
        urlEndpoint={urlEndpoint}
        path="default-image.jpg"
        width="400"
      /> */}
      <div className="col-item-1">
        <TextInput
          label="title"
          name="title"
          type="text"
          placeholder=""
        />
      </div>
    </div>
    <div className="container-row-signup">
      <div className="col-item-1">
        <TextInput
          label="type"
          name="type"
          type="text"
          placeholder=""
        />
      </div>
    </div>
    <div className="container-row-signup">
      <div className="col-item-1">
        <TextInput
          label="artworkWidth"
          name="artworkWidth"
          type="text"
          placeholder=""
        />
      </div>
      <div className="col-item-1">
        <TextInput
          label="artworkHeight"
          name="artworkHeight"
          type="text"
          placeholder=""
        />
      </div>
    </div>

    <div className="container-row-signup">
      <div className="col-item-1">
        <TextInput
          label="artist"
          name="artist"
          type="text"
          placeholder=""
        />
      </div>
      <div className="col-item-1">
        <TextInput
          label="license"
          name="license"
          type="text"
          placeholder=""
        />
      </div>
      <div className="col-item-1">
        <TextInput
          label="status"
          name="status"
          type="text"
          placeholder=""
        />
      </div>
    </div>

    <div className="container-row-signup">
      <div className="col-item-1">
        <TextInput
          label="medium"
          name="medium"
          type="text"
          placeholder=""
        />
      </div>
      <div className="col-item-1">
        <TextInput
          label="srcYoutube"
          name="srcYoutube"
          type="text"
          placeholder=""
        />
      </div>
    </div>

    <div className="col-item-1">
      <TextInput
        label="srcLarge"
        name="srcLarge"
        type="text"
        placeholder=""
      />
    </div>

    <div className="col-item-1">
      <TextInput
        label="description"
        name="description"
        type="text"
        placeholder=""
      />
    </div>

    <div className="col-item-1">
      {!loading && (
        <Button variant="primary" id="create-button" type="submit">
          Create
        </Button>
      )}
      {loading && (
        <Button variant="primary" id="create-button-loading" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </Button>
      )}
    </div>
  </Form>
);

export default CreateForm;
