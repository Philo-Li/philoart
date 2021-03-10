/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import SplitButton from './SplitButton';
import useField from '../hooks/useField';

const SearchBar = () => {
  const searchKeyword = useField('text');
  const [searchRange, setSearchRange] = useState('picky');
  const history = useHistory();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      if (searchRange === 'Multi Website') {
        history.push(`/broadsearch?q=${searchKeyword.value}`);
      } else {
        history.push(`/search?q=${searchKeyword.value}`);
      }
      // eslint-disable-next-line no-alert
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <div className="topnav">
      <Form onSubmit={handleSearch}>
        <div className="topnav container-row-1">
          <SplitButton setSearchRange={setSearchRange} />
          <input {...searchKeyword} placeholder="Search..." aria-label="Search" />
          <Button variant="transparent" className="search-button" type="submit">
            <div className="icon-search">
              <i className="bi bi-search" />
            </div>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
