/* eslint-disable max-len */
import React from 'react';
import { Jumbotron, Card } from 'react-bootstrap';
import '../index.css';

const License = () => {
  const allowed = ['All photos are free to use.', 'Commercial and non-commercial purposes.', 'Attribution is not required. Giving credit to the photographer is not necessary but always appreciated.', 'You can use, copy, edit, or share that photo. Be creative and edit them as you like.'];
  const notallowed = ['Identifiable people may not appear in a bad light or in a way that is offensive.', 'Don\'t sell unaltered copies of a photo or video, e.g. as a poster, print or on a physical product without modifying it first.', 'Don\'t imply endorsement of your product by people or brands on the imagery.', 'Never to advertise the photograph as your own work or portray yourself as the author of said work.'];
  return (
    <div>
      <div>
        <Jumbotron className="licence">
          <h1 className="header-bold-white">CC0 Licence</h1>
          <h3 className="header">
            All photos can be downloaded and used for free.
          </h3>
        </Jumbotron>
      </div>
      <div className="container-col-login">
        <div className="col-item-3">
          <h1 className="header-bold">What is allowed?</h1>
        </div>
        <Card.Link href="/license/zh" className="col-item-3">中文</Card.Link>
        <Card.Link href="https://creativecommons.org/publicdomain/zero/1.0/" className="col-item-3">CC0 Licence</Card.Link>
        {allowed.map((msg) => (
          <div className="col-item-1" key={msg}>
            <div className="container-row-4">
              <div className="row-item-5">
                <i className="bi bi-check2 icon-check" />
              </div>
              <div className="row-item-5">
                <h5>{msg}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container-col-login">
        <div className="col-item-3">
          <h1 className="header-bold">What is not allowed?</h1>
        </div>
        {notallowed.map((msg) => (
          <div className="col-item-1" key={msg}>
            <div className="container-row-4">
              <div className="row-item-5">
                <i className="bi bi-x icon-x" />
              </div>
              <div className="row-item-5">
                <h5>{msg}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container-col-login">
        <div className="col-item-3">
          <h1>
            You can read the original website
            {'\''}
            s licenses for more purpose.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default License;
