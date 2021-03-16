/* eslint-disable max-len */
import React from 'react';
import {
  Image, Row, Col, Card,
} from 'react-bootstrap';
import '../index.css';
import aboutImg4 from '../img/aboutImg4.jpg';

const img1 = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1416&q=80';
const img2 = 'https://images.unsplash.com/photo-1497030947858-3f40f1508e84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80';
const img3 = 'https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1492&q=80';
const img4 = aboutImg4;

const AboutZh = () => {
  const cando = ['搜索和重定向下载免费图片', '帮助发现出色的在线免费图库', '点赞你喜欢的图片', '创建专属收藏夹'];
  const needpicky = ['设计师', '摄影师', '创作者', '艺术家', '......你'];
  const whychoosepicky = ['优雅易用的网站页面', '精挑细选的免费图库', '更易发现出色的在线免费图库', '激发你的灵感', '增加你的创造力'];
  return (
    <div>
      <div className="container-col-login">
        <div className="col-item-4">
          <h1 className="header-bold">关于 Picky</h1>
        </div>
        <Card.Link href="/about" className="col-item-3">English</Card.Link>
      </div>
      <div className="container-col-login">
        <div className="col-item-3">
          <h1>
            觉得付费图库收费太贵？
          </h1>
        </div>
        <div className="col-item-3">
          <h1>
            总是很难找到一张漂亮优雅或有趣的免费图片？
          </h1>
        </div>
        <div className="col-item-3">
          <h1>
            想省钱省时间？
          </h1>
        </div>
      </div>
      <Row className="p-3 container-about">
        <Col>
          <div className="container-col-login">
            <h1 className="header-bold">Picky - 出色的免费图库搜索引擎</h1>
            <h3>
              Picky 致力于帮助你更快地获取网上最优秀的免费图片.
            </h3>
          </div>
        </Col>
        <Col>
          <Card>
            <Image src={img1} width="100%" />
          </Card>
        </Col>
      </Row>
      <Row className="p-3 container-about">
        <Col>
          <Card>
            <Image src={img2} width="100%" />
          </Card>
        </Col>
        <Col>
          <div className="container-col-login">
            <h1 className="header-bold">Picky 可以做什么?</h1>
            <div className="col-item-1">
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-download icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{cando[0]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-search icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{cando[1]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-heart icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{cando[2]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-plus-square icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{cando[3]}</h5>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="p-3 container-about">
        <Col>
          <div className="container-col-login">
            <h1 className="header-bold">谁需要 Picky?</h1>
            <div className="col-item-1">
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-shop icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{needpicky[0]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-camera icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{needpicky[1]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-pencil icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{needpicky[2]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-palette icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{needpicky[3]}</h5>
                </div>
              </div>
              <div className="container-row-4">
                <div className="row-item-5">
                  <i className="bi bi-emoji-sunglasses icon-check" />
                </div>
                <div className="row-item-5">
                  <h5>{needpicky[4]}</h5>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <Card>
            <Image src={img3} width="100%" />
          </Card>
        </Col>
      </Row>
      <Row className="p-3 container-about">
        <Col>
          <Card>
            <Image src={img4} width="100%" />
          </Card>
        </Col>
        <Col>
          <div className="container-col-login">
            <h1 className="header-bold">为什么选择 Picky?</h1>
            {whychoosepicky.map((msg) => (
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
        </Col>
      </Row>
      <div className="container-col-login">
        <div className="col-item-3">
          <h3>
            如果你有任何疑问或帮助 Picky 实现更好的体验的改进建议，可以发邮件到 philoart42@gmail.com.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutZh;
