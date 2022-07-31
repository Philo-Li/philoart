/* eslint-disable max-len */
import React from 'react';
import { Card } from 'react-bootstrap';
import aboutImg4 from '../../img/aboutImg4.jpg';
import AboutComponent from './AboutComponent';
import AboutComponentRow from './AboutComponentRow';
import MyImage from './MyImage';

const img1 = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1416&q=80';
const img2 = 'https://images.unsplash.com/photo-1497030947858-3f40f1508e84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80';
const img3 = 'https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1492&q=80';
const img4 = aboutImg4;

const AboutZh = () => {
  const msgToShow = [
    {
      title: '出色的个人艺术作品站+高质量图库',
      subtitle1: '帮助你更便捷地发布和管理自己的作品',
      subtitle2: '以及更快地获取最优秀的免费版权图片',
      intro: 'PhiloArt - 为创作者而生！',
      imgFirst: true,
      img: { srcTiny: img1, srcSmall: img1, srcLarge: img1 },
    },
    {
      title: 'PhiloArt 可以做什么?',
      imgFirst: false,
      img: { srcTiny: img2, srcSmall: img2, srcLarge: img2 },
      msgList: [
        { icon: 'bi bi-download icon-check', msg: '上传、管理并且以丰富的协议发布你的作品' },
        { icon: 'bi bi-search icon-check', msg: '发现和关注喜欢的艺术家，获取即时动态' },
        { icon: 'bi bi-heart icon-check', msg: '发现、搜索和免费下载高品质免费版权图片' },
        { icon: 'bi bi-plus-square icon-check', msg: '点赞你喜欢的图片并创建专属收藏夹' },
      ],
    },
    {
      title: '谁需要 PhiloArt?',
      imgFirst: true,
      img: { srcTiny: img3, srcSmall: img3, srcLarge: img3 },
      msgList: [
        { icon: 'bi bi-palette icon-check', msg: '艺术家' },
        { icon: 'bi bi-camera icon-check', msg: '摄影师' },
        { icon: 'bi bi-pencil icon-check', msg: '创作者' },
        { icon: 'bi bi-shop icon-check', msg: '设计师' },
        { icon: 'bi bi-emoji-sunglasses icon-check', msg: '...还有你' },
      ],
    },
    {
      title: '为什么选择 PhiloArt?',
      imgFirst: false,
      img: { srcTiny: img4, srcSmall: img4, srcLarge: img4 },
      msgList: [
        { icon: 'bi bi-check2 icon-check', msg: '方便快捷地以多种协议发布和管理你的作品' },
        { icon: 'bi bi-check2 icon-check', msg: '发现更多优秀的作品及免费版权作品' },
        { icon: 'bi bi-check2 icon-check', msg: '关注喜欢的艺术家' },
        { icon: 'bi bi-check2 icon-check', msg: '鼓励创作、激发灵感和提升创造力' },
      ],
    },
  ];
  return (
    <div>
      <div className="container-col-login">
        <div className="col-item-4">
          <h1 className="header-bold">关于 PhiloArt</h1>
        </div>
        <Card.Link href="/about" className="col-item-3">English</Card.Link>
      </div>
      <div className="container-col-about">
        <h1 className="subheader">{msgToShow[0].intro}</h1>
      </div>
      <div className="container-col-about">
        <h1 className="subheader">{msgToShow[0].title}</h1>
        <h3 className="subheader2">
          {msgToShow[0].subtitle1}
        </h3>
        <h3 className="subheader2">
          {msgToShow[0].subtitle2}
        </h3>
      </div>
      <AboutComponent msgToShow={msgToShow[1]} />
      <AboutComponentRow msgToShow={msgToShow[2]} />
      <AboutComponent msgToShow={msgToShow[3]} />
      <div className="p-3 container-about-row">
        <MyImage image={msgToShow[0].img} />
      </div>
      <div className="container-col-login">
        <div className="col-item-3 licence-msg text-1rem">
          <p>
            如果你有任何疑问或帮助 PhiloArt 实现更好的体验的改进建议，可以发送邮件到 philoart42@gmail.com.
          </p>
        </div>
      </div>
      {/* 这世界战争不停，争吵不息，满目疮痍。我想画一点温暖东西，治愈自己，也治愈他人。 */}
    </div>
  );
};

export default AboutZh;
