import React from 'react';
import { Jumbotron, Card } from 'react-bootstrap';

const LicenseZh = () => {
  const allowed = ['所有照片均可免费使用。', '包括商业和非商业用途。', '不需要注明出处。标注摄影师不是必须的，但总是值得赞赏。', '你可以使用、复制、编辑或分享该照片。欢迎按照你喜欢的方式用其进行创造。'];
  const notallowed = ['照片中可识别的人不能以恶意或令人反感的方式出现。', '在没有修改之前，不要销售未经修改的照片或视频副本，例如作为海报、印刷品或实物产品。', '不要暗示图片上的人或品牌对你的产品有认可。', '不要将照片直接作为您自己的作品进行宣传，或宣称自己是照片作者。'];
  return (
    <div>
      <div>
        <Jumbotron className="licence">
          <h1 className="header-bold-white">CC0 协议</h1>
          <h3 className="header">
            所有图片均可免费下载和免费使用。
          </h3>
        </Jumbotron>
      </div>
      <div className="container-col-login">
        <div className="col-item-3">
          <h1 className="header-bold">可以做什么?</h1>
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
          <h1 className="header-bold">不可以做什么?</h1>
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
            除了上述提到的之外，如果你还想将图片用于其他用途，请仔细阅读原图片站点的用户协议。
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LicenseZh;
