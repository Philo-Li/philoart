import React from 'react';

import { Button, Spinner } from 'react-bootstrap';
import { Form } from 'formik';
import PicturesWall from '../upload/uploadPhoto';

import TextInput from '../others/TextInput';
// title, year, description, tags, photoWidth, photoHeight, artworkWidth,
//       artworkHeight, srcTiny, srcSmall, srcLarge, srcYoutube, color, artist,
//       license, type, medium, status,
const CreateForm = ({ loading }) => (
  <Form>
    <div className="container-row-signup">
      <div className="col-item-1">
        <TextInput
          label="title"
          name="title"
          type="text"
          placeholder=""
        />
      </div>
      <div className="col-item-1">
        <TextInput
          label="titleZh"
          name="titleZh"
          type="text"
          placeholder=""
        />
      </div>
      <div className="col-item-1">
        <TextInput
          label="year"
          name="year"
          type="integer"
          placeholder=""
        />
      </div>
    </div>
    <div className="container-row-signup">
      <div className="col-item-1">
        <TextInput
          label="photoWidth"
          name="photoWidth"
          type="text"
          placeholder=""
        />
      </div>
      <div className="col-item-1">
        <TextInput
          label="photoHeight"
          name="photoHeight"
          type="text"
          placeholder=""
        />
      </div>
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
      <div className="col-item-1">
        <TextInput
          label="color"
          name="color"
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

    <PicturesWall />

    <div className="col-item-1">
      <TextInput
        label="srcTiny"
        name="srcTiny"
        type="text"
        placeholder=""
      />
    </div>

    <div className="col-item-1">
      <TextInput
        label="srcSmall"
        name="srcSmall"
        type="text"
        placeholder=""
      />
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
      <TextInput
        label="tags"
        name="tags"
        type="text"
        placeholder=""
      />
    </div>

    <div className="col-item-1">
      {!loading && (
        <Button variant="primary" id="create-button" type="submit" block>
          Create
        </Button>
      )}
      {loading && (
        <Button variant="primary" id="create-button-loading" disabled block>
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
