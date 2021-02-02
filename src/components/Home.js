/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import '../index.css';
import usePhotos from '../hooks/usePhotos';
import HomePhotoList from './HomePhotoList';
import SearchBar from './SearchBar';

// eslint-disable-next-line react/prefer-stateless-function
const Home = ({ searchValue, newSearchValue, setNewSearchValue }) => {
  console.log('searchValue, newSearchValue', searchValue, newSearchValue);

  const variables = {
    searchKeyword: newSearchValue,
    first: 15,
  };

  const { photos, fetchMore } = usePhotos(variables);

  const clickFetchMore = () => {
    fetchMore();
  };

  return (
    <div>
      <div>
        <Jumbotron className="jumbotron">
          <h1 className="header">Select the best free stock photos for you.</h1>
          <p className="header">
            Free to use. Redirect to download.
          </p>
          <SearchBar searchValue={searchValue} setNewSearchValue={setNewSearchValue} />
        </Jumbotron>
      </div>
      <div className="p-3">
        <h1>hey</h1>
      </div>
      <HomePhotoList photos={photos} />
      <div className="row-item-2">
        <Button variant="outline-secondary" onClick={clickFetchMore}>
          <i className="bi bi-three-dots" />
          More photos
        </Button>
      </div>
    </div>
  );
};

export default Home;
