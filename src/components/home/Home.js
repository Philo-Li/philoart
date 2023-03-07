import React, { useState } from 'react';
import { Tabs, Tab, Carousel } from 'react-bootstrap';
import Latest from './Latest';
import TypeList from './TypeList';
import CategoryBar from '../others/CategoryBar';
import Discover from '../discover/Discover';

const Home = () => {
  const [key, setKey] = useState('photograph');

  return (
    <div>
      <div>
        <Carousel fade>
          <Carousel.Item>
            <div className="jumbotron-slice-1" alt="First slide" />
            <Carousel.Caption>
              {/* <SearchBar /> */}
              <h3 className="jumbotron-header">Share your artworks with the world.</h3>
              <p className="jumbotron-subheader">Create, and Post it</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="jumbotron-slice-2" alt="Second slide" />
            <Carousel.Caption>
              <h3 className="jumbotron-header">Create, Mint, and Sell</h3>
              <p className="jumbotron-subheader">Discover the best NFTs(Upcoming).</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="jumbotron-slice-3" alt="Third slide" />
            <Carousel.Caption>
              <h3 className="jumbotron-header">Discover the best artworks.</h3>
              <p className="jumbotron-subheader">Free for personal use and download.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <CategoryBar />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        {/* <Tab eventKey="home" title="Home">
          <HomePhotoList
            allPhotos={allPhotos}
            setAllPhotos={setAllPhotos}
            clickFetchMore={clickFetchMore}
            loading={loading}
            hasNextPage={hasNextPage}
          />
        </Tab> */}
        <Tab eventKey="photograph" title="Photograph">
          <TypeList type="Photograph" />
        </Tab>
        <Tab eventKey="painting" title="Painting">
          <TypeList type="Painting" />
        </Tab>
        <Tab eventKey="digitalart" title="Digital Art">
          <TypeList type="Digital Art" />
        </Tab>
        <Tab eventKey="collections" title="Collections">
          <Discover />
        </Tab>
        <Tab eventKey="latest" title="Latest">
          <Latest />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Home;
