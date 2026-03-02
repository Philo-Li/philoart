"use client";

import { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const licenses = [
  {
    name: "CC BY",
    allowed: ["BY  – Credit must be given to the creator"],
    notallowed: [],
  },
  {
    name: "CC BY-SA",
    allowed: ["BY  – Credit must be given to the creator"],
    notallowed: ["SA  – Adaptations must be shared under the same terms"],
  },
  {
    name: "CC BY-NC",
    allowed: ["BY  – Credit must be given to the creator"],
    notallowed: ["NC  – Only noncommercial uses of the work are permitted"],
  },
  {
    name: "CC BY-NC-SA",
    allowed: ["BY  – Credit must be given to the creator"],
    notallowed: [
      "NC  – Only noncommercial uses of the work are permitted",
      "SA  – Adaptations must be shared under the same terms",
    ],
  },
  {
    name: "CC BY-ND",
    allowed: ["BY  – Credit must be given to the creator"],
    notallowed: ["ND  – No derivatives or adaptations of the work are permitted"],
  },
  {
    name: "CC BY-NC-ND",
    allowed: ["BY  – Credit must be given to the creator"],
    notallowed: [
      "NC  – Only noncommercial uses of the work are permitted",
      "ND  – No derivatives or adaptations of the work are permitted",
    ],
  },
];

export default function LicenseLegacyClient() {
  const [key, setKey] = useState("CC BY");

  return (
    <div className="container-col-license">
      <div className="col-item-3">
        <h1 className="license-header-bold">About CC Licenses</h1>
      </div>
      <a href="https://creativecommons.org/about/cclicenses/" className="col-item-3 p-3">
        About CC licenses
      </a>
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k || "CC BY")} className="mb-3">
        {licenses.map((license) => (
          <Tab eventKey={license.name} title={license.name} key={license.name} className="min-height-300">
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
  );
}
