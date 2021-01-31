/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React from 'react';
import { Form, FormControl, Jumbotron, Button } from 'react-bootstrap';

// eslint-disable-next-line arrow-body-style
const DailyCover = () => {
  return (
    <div>
      <Jumbotron className="jumbotron">
        <h1 className="header">Select the best free stock photos for you.</h1>
        <p className="header">
          Free to use. Redirect to download.
        </p>
        <div className="container-row-0">
          <Form>
            <FormControl type="text" placeholder="Search for free photos" />
          </Form>
          <Button variant="light" onClick={() => window.open()}>
            <i className="bi bi-search" />
          </Button>
        </div>
      </Jumbotron>
    </div>
  );
};

export default DailyCover;
