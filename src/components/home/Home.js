import React, { useState, useEffect } from 'react';
import { Jumbotron, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import usePhotos from '../../hooks/usePhotos';
import HomePhotoList from '../others/photo-list/HomePhotoList';
import SearchBar from '../others/search-bar/SearchBar';
import CategoryBar from '../others/CategoryBar';
import config from '../../config';
import '../../MDB-Free_4.19.2/css/mdb.css';

const Home = ({
  authorizedUser,
}) => {
  const history = useHistory();
  const [allPhotos, setAllPhotos] = useState();
  const [loading, setLoading] = useState(false);

  const variables = {
    username: config.pickyAdmin,
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
  const username = "picky"
  const homePageCollections = "/discover";

  return (
    <div>
      <div>
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active d-block w-100">
              <Jumbotron className="jumbotron-slice-1" alt="Second slide">
                <h1 className="header">Discover the best free stock photos.</h1>
                <p className="subheader">
                  Free to use. Redirect to download.
                </p>
                <SearchBar />
              </Jumbotron>
            </div>
            <div class="carousel-item">
              <Jumbotron className="jumbotron-slice-1" alt="Second slide">
                <h1 className="header">Discover the best free stock photos.</h1>
                <p className="subheader">
                  Free to use. Redirect to download.
                </p>
                <SearchBar />
              </Jumbotron>
            </div>
            <div class="carousel-item">
              <Jumbotron className="jumbotron-slice-1" alt="Third slide">
                <h1 className="header">Discover the best free stock photos.</h1>
                <p className="subheader">
                  Free to use. Redirect to download.
                </p>
                <SearchBar />
              </Jumbotron>
            </div>
          </div>
          
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
       
      </div>
      <CategoryBar />
      <Nav variant="tabs" defaultActiveKey={history.location.pathname}>
        <Nav.Item>
          <Nav.Link href="/">All</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={homePageCollections} eventKey={homePageCollections}>Collections</Nav.Link>
        </Nav.Item>
      </Nav>
      <HomePhotoList
        allPhotos={allPhotos}
        setAllPhotos={setAllPhotos}
        clickFetchMore={clickFetchMore}
        loading={loading}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default Home;
