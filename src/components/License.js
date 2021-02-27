/* eslint-disable max-len */
import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import '../index.css';

const License = () => {
  console.log('hey');
  return (
    <div>
      <div>
        <Jumbotron className="licence">
          <h1 className="header">Legal Simplicity</h1>
          <h3 className="header">
            All photos can be downloaded and used for free.
          </h3>
        </Jumbotron>
      </div>
      <div className="p-3">
        <h1>hey</h1>
      </div>
      <div className="container-profile">
        <div className="profile-item">
          <h1>Login</h1>
        </div>
        <div className="profile-item">
          <h1>Login</h1>
        </div>
      </div>
    </div>
  );
};

export default License;
