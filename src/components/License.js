/* eslint-disable max-len */
import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import '../index.css';

const License = () => {
  const allowed = ['All photos are free to use.', 'Commercial and non-commercial purposes', 'Attribution is not required. Giving credit to the photographer is not necessary but always appreciated.', 'You can modify the photos. Be creative and edit them as you like.'];
  const notallowed = ['Identifiable people may not appear in a bad light or in a way that is offensive.', 'Don\'t sell unaltered copies of a photo or video, e.g. as a poster, print or on a physical product without modifying it first.', 'Don\'t imply endorsement of your product by people or brands on the imagery.', 'Don\'t redistribute or sell the photos and videos on other stock photo or wallpaper platforms.'];
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
          <h1>
            The original website
            {'\''}
            s licenses are almost the same and like this:
          </h1>
        </div>
      </div>
      <div className="container-col-login">
        <div className="col-item-3">
          <h1 className="header-bold">What is allowed?</h1>
        </div>
        {allowed.map((msg) => (
          <div className="col-item-1">
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
          <div className="col-item-1">
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
