/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import { Button, Jumbotron, Form, FormControl } from 'react-bootstrap';
import '../index.css';
import usePhotos from '../hooks/usePhotos';
import useField from '../hooks/useField';
import PhotoList from './PhotoList';

// eslint-disable-next-line react/prefer-stateless-function
const Home = () => {
  const searchValue = useField('searchValue');
  const [newSearchValue, setNewSearchValue] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      await setNewSearchValue(searchValue.value);
      // eslint-disable-next-line no-alert
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };
  const variables = {
    searchKeyword: newSearchValue,
    first: 30,
  };

  const { photos } = usePhotos(variables);

  return (
    <div>
      <div>
        <Jumbotron className="jumbotron">
          <h1 className="header">Select the best free stock photos for you.</h1>
          <p className="header">
            Free to use. Redirect to download.
          </p>
          <div className="container-row-0">
            <Form onSubmit={submit}>
              <div className="container-row-0">
                <FormControl {...searchValue} placeholder="Search for free photos" />
                <Button variant="light" type="submit">
                  <i className="bi bi-search" />
                </Button>
              </div>
            </Form>
          </div>
        </Jumbotron>
      </div>
      <div className="p-3">
        <h1>hey</h1>
      </div>
      <PhotoList photos={photos} />
    </div>
  );
};

export default Home;
