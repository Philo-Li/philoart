import React from 'react';
// import { Jumbotron } from 'react-bootstrap';

const License = () => {
  const allowed = ['All photos are free to use.', 'Commercial and non-commercial purposes.', 'Attribution is not required. Giving credit to the photographer is not necessary but always appreciated.', 'You can use, copy, edit, or share that photo. Be creative and edit them as you like.'];
  const notallowed = ['Identifiable people may not appear in a bad light or in a way that is offensive.', 'Don\'t sell unaltered copies of a photo or video, e.g. as a poster, print or on a physical product without modifying it first.', 'Don\'t imply endorsement of your product by people or brands on the imagery.', 'Never to advertise the photograph as your own work or portray yourself as the author of said work.'];
  return (
    <div>
      <div>
        {/* <Jumbotron className="licence">
          <h1 className="licence-header-bold-white">CC0 Licence</h1>
          <h3 className="licence-subheader">
            All photos can be downloaded and used for free.
          </h3>
        </Jumbotron> */}
      </div>
      <div className="container-col-licence">
        <div className="col-item-3">
          <h1 className="licence-header-bold">What is allowed?</h1>
        </div>
        <a href="/license/zh" className="col-item-3">中文</a>
        <a href="https://creativecommons.org/publicdomain/zero/1.0/" className="col-item-3">CC0 Licence</a>
        {allowed.map((msg) => (
          <div className="col-item-1" key={msg}>
            <div className="licence-msg-container">
              <div>
                <i className="bi bi-check2 licence-icon-check" />
              </div>
              <div>
                <h5 className="licence-msg">{msg}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container-col-licence">
        <div className="col-item-3">
          <h1 className="licence-header-bold">What is not allowed?</h1>
        </div>
        {notallowed.map((msg) => (
          <div className="col-item-1" key={msg}>
            <div className="licence-msg-container">
              <div>
                <i className="bi bi-x licence-icon-x" />
              </div>
              <div>
                <h5 className="licence-msg">{msg}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container-col-login">
        <div className="licence-msg">
          <h5>
            You can read the original website
            {'\''}
            s licenses for more purpose.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default License;
