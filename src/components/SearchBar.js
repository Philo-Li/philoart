/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import useField from '../hooks/useField';

const SearchBar = () => {
  const searchKeyword = useField('searchKeyword');
  const history = useHistory();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      history.push(`/search?q=${searchKeyword.value}`);
      // eslint-disable-next-line no-alert
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  console.log('search', searchKeyword);

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <div className="container-row-searchbar">
          <input {...searchKeyword} placeholder="Search for free photos" />
          <Button variant="light" type="submit">
            <i className="bi bi-search" />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
