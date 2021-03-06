import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Tab, Carousel } from 'react-bootstrap';
import usePhotos from '../../hooks/usePhotos';
import HomePhotoList from '../others/photo-list/HomePhotoList';
// import SearchBar from '../others/search-bar/SearchBar';
import CategoryBar from '../others/CategoryBar';
import Discover from '../discover/Discover';
import config from '../../config';
// import '../../MDB-Free_4.19.2/css/mdb.css';

const Home = () => {
  const [allPhotos, setAllPhotos] = useState();
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('home');

  const userId = localStorage.getItem('philoart-userId');
  const baseUrl = 'https://media.philoart.io/photos.json';

  const variables = {
    username: config.philoartAdmin,
    checkUserLike: userId,
    first: 20,
  };

  const { photos, fetchMore, hasNextPage } = usePhotos(variables);

  useEffect(async () => {
    if (photos) {
      const temp = photos && photos.edges
        ? photos.edges.map((edge) => edge.node)
        : [];

      setAllPhotos(temp);
      setLoading(false);
    } else {
      const temp = await axios.get(baseUrl).then((res) => res.data.node);

      setAllPhotos(temp);
    }
  }, [photos]);

  const clickFetchMore = () => {
    fetchMore();
    setLoading(true);
  };

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
              <p className="jumbotron-subheader">Discover the best NFTs.</p>
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
        <Tab eventKey="home" title="Home">
          <HomePhotoList
            allPhotos={allPhotos}
            setAllPhotos={setAllPhotos}
            clickFetchMore={clickFetchMore}
            loading={loading}
            hasNextPage={hasNextPage}
          />
        </Tab>
        <Tab eventKey="collections" title="Collections">
          <Discover />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Home;
