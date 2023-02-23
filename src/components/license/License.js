import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

// const options = ['CC BY', 'CC BY-SA', 'CC BY-NC', 'CC BY-NC-SA', 'CC-BY-ND', 'CC BY-NC-ND'];

const License = () => {
  const [key, setKey] = useState('CC BY');
  const licneses = [
    {
      name: 'CC BY',
      description: 'This license allows reusers to distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator. The license allows for commercial use.',
      allowed: ['BY  – Credit must be given to the creator'],
      notallowed: [],
    },
    {
      name: 'CC BY-SA',
      description: 'This license allows reusers to distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator. The license allows for commercial use. If you remix, adapt, or build upon the material, you must license the modified material under identical terms.',
      allowed: [
        'BY  – Credit must be given to the creator',
      ],
      notallowed: [
        'SA  – Adaptations must be shared under the same terms',
      ],
    },
    {
      name: 'CC BY-NC',
      description: 'This license allows reusers to distribute, remix, adapt, and build upon the material in any medium or format for noncommercial purposes only, and only so long as attribution is given to the creator. ',
      allowed: [
        'BY  – Credit must be given to the creator',
      ],
      notallowed: [
        'NC  – Only noncommercial uses of the work are permitted',
      ],
    },
    {
      name: 'CC BY-NC-SA',
      description: 'This license allows reusers to distribute, remix, adapt, and build upon the material in any medium or format for noncommercial purposes only, and only so long as attribution is given to the creator. If you remix, adapt, or build upon the material, you must license the modified material under identical terms. ',
      allowed: [
        'BY  – Credit must be given to the creator',
      ],
      notallowed: [
        'NC  – Only noncommercial uses of the work are permitted',
        'SA  – Adaptations must be shared under the same terms',
      ],
    },
    {
      name: 'CC BY-ND',
      description: 'This license allows reusers to copy and distribute the material in any medium or format in unadapted form only, and only so long as attribution is given to the creator. The license allows for commercial use. ',
      allowed: [
        'BY  – Credit must be given to the creator',
      ],
      notallowed: [
        'ND  – No derivatives or adaptations of the work are permitted',
      ],
    },
    {
      name: 'CC BY-NC-ND',
      description: 'This license allows reusers to copy and distribute the material in any medium or format in unadapted form only, for noncommercial purposes only, and only so long as attribution is given to the creator. ',
      allowed: [
        'BY  – Credit must be given to the creator',
      ],
      notallowed: [
        'NC  – Only noncommercial uses of the work are permitted',
        'ND  – No derivatives or adaptations of the work are permitted',
      ],
    },
  ];
  return (
    <div>
      <div className="container-col-license">
        <div className="col-item-3">
          <h1 className="license-header-bold">About CC Licenses</h1>
        </div>
        {/* <a href="/license/zh" className="col-item-3">中文</a> */}
        <a href="https://creativecommons.org/about/cclicenses/" className="col-item-3 p-3">About CC licenses</a>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          {licneses.map((license) => (
            <Tab eventKey={license.name} title={license.name} className="min-height-300">
              <div>
                {license.allowed.map((msg) => (
                  <div className="col-item-1" key={msg}>
                    <div className="license-msg-container">
                      <div>
                        <i className="bi bi-check2 license-icon-check" />
                      </div>
                      <div>
                        <h5 className="license-msg">{msg}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {license.notallowed.map((msg) => (
                  <div className="col-item-1" key={msg}>
                    <div className="license-msg-container">
                      <div>
                        <i className="bi bi-x license-icon-x" />
                      </div>
                      <div>
                        <h5 className="license-msg">{msg}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default License;
