import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Carousel } from 'react-bootstrap';
import usePhotos from '../../hooks/usePhotos';
import HomePhotoList from '../others/photo-list/HomePhotoList';
import SearchBar from '../others/search-bar/SearchBar';
import CategoryBar from '../others/CategoryBar';
import Discover from '../discover/Discover';
import config from '../../config';
import '../../MDB-Free_4.19.2/css/mdb.css';

const Home = ({
  authorizedUser,
}) => {
  const [allPhotos, setAllPhotos] = useState();
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('home');

  const variables = {
    username: config.philoartAdmin,
    checkUserLike: !authorizedUser ? config.visitorID : authorizedUser.id,
    first: 20,
  };

  const { photos, fetchMore, hasNextPage } = usePhotos(variables);

  useEffect(() => {
    if (photos) {
      const temp = photos && photos.edges
        ? photos.edges.map((edge) => edge.node)
        : [];

      setAllPhotos(temp);
      setLoading(false);
    }
  }, [photos, authorizedUser]);

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
              <SearchBar />
              {/* <h3 className="jumbotron-header">First slide label</h3> */}
              {/* <p className="jumbotron-subheader">Nulla vitae elit libero interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="jumbotron-slice-2" alt="Second slide" />
            <Carousel.Caption>
              {/* <h3 className="jumbotron-header">Second slide label</h3> */}
              {/* <p className="jumbotron-subheader">Lorem ipsum dolor adipiscing elit.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="jumbotron-slice-3" alt="Third slide" />
            <Carousel.Caption>
              {/* <h3 className="jumbotron-header">Third slide label</h3> */}
              {/* <p className="jumbotron-subheader">Praesent nisl consectetur.</p> */}
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
