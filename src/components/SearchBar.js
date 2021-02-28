/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBar = ({ searchValue, setNewSearchValue }) => {
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      await setNewSearchValue(searchValue.value);
      // eslint-disable-next-line no-alert
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <div className="container-row-searchbar">
          <Form.Control {...searchValue} placeholder="Search for free photos" />
          <Button variant="light" type="submit">
            <i className="bi bi-search" />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
