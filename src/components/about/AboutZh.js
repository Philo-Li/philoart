/* eslint-disable max-len */
import React from 'react';
import {
  Image, Col, Card,
} from 'react-bootstrap';
import aboutImg4 from '../../img/aboutImg4.jpg';
import AboutComponent from './AboutComponent';

const img1 = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1416&q=80';
const img2 = 'https://images.unsplash.com/photo-1497030947858-3f40f1508e84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80';
const img3 = 'https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1492&q=80';
const img4 = aboutImg4;

const AboutZh = () => {
  const msgToShow = [
    {
      title: 'Picky - 出色的免费图库搜索引擎',
      subtitle: '致力于帮助你更快地获取网上最优秀的免费图片',
      imgFirst: true,
      img: img1,
    },
    {
      title: 'Picky 可以做什么?',
      imgFirst: false,
      img: img2,
      msgList: [
        { icon: 'bi bi-download icon-check', msg: '搜索和重定向下载免费图片' },
        { icon: 'bi bi-search icon-check', msg: '帮助发现出色的在线免费图库' },
        { icon: 'bi bi-heart icon-check', msg: '点赞你喜欢的图片' },
        { icon: 'bi bi-plus-square icon-check', msg: '创建专属收藏夹' },
      ],
    },
    {
      title: '谁需要 Picky?',
      imgFirst: true,
      img: img3,
      msgList: [
        { icon: 'bi bi-shop icon-check', msg: '设计师' },
        { icon: 'bi bi-camera icon-check', msg: '摄影师' },
        { icon: 'bi bi-pencil icon-check', msg: '创作者' },
        { icon: 'bi bi-palette icon-check', msg: '艺术家' },
        { icon: 'bi bi-emoji-sunglasses icon-check', msg: '......你' },
      ],
    },
    {
      title: '为什么选择 Picky?',
      imgFirst: false,
      img: img4,
      msgList: [
        { icon: 'bi bi-check2 icon-check', msg: '优雅易用的网站' },
        { icon: 'bi bi-check2 icon-check', msg: '精挑细选的收藏夹' },
        { icon: 'bi bi-check2 icon-check', msg: '激发你的灵感' },
        { icon: 'bi bi-check2 icon-check', msg: '提升你的创造力' },
      ],
    },
  ];
  return (
    <div>
      <div className="container-col-login">
        <div className="col-item-4">
          <h1 className="header-bold">关于 Picky</h1>
        </div>
        <Card.Link href="/about" className="col-item-3">English</Card.Link>
      </div>
      <div className="container-col-about">
        <h1 className="subheader">{msgToShow[0].title}</h1>
        <h3 className="subheader2">
          {msgToShow[0].subtitle}
        </h3>
      </div>
      <AboutComponent msgToShow={msgToShow[1]} />
      <AboutComponent msgToShow={msgToShow[2]} />
      <AboutComponent msgToShow={msgToShow[3]} />
      <div className="p-3 container-about-row">
        <Col>
          <Card>
            <Image src={img1} width="100%" />
          </Card>
        </Col>
      </div>
      <div className="container-col-login">
        <div className="col-item-3 licence-msg">
          <h3>
            如果你有任何疑问或帮助 Picky 实现更好的体验的改进建议，可以发邮件到 philoart42@gmail.com.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutZh;
