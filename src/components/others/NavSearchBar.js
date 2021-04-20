/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import useField from '../../hooks/useField';

const NavSearchBar = () => {
  const searchKeyword = useField('text');
  const history = useHistory();
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      history.push(`/search?q=${searchKeyword.value}`);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <div className="topnav2">
      <Form onSubmit={handleSearch}>
        <div className="topnav2">
          <input {...searchKeyword} placeholder="Search for free photos" aria-label="Search" />
        </div>
      </Form>
    </div>
  );
};

export default NavSearchBar;
