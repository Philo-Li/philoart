/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import useField from '../../hooks/useField';

const NavSearchBar = ({ placeholder }) => {
  const searchKeyword = useField('text');
  const history = useHistory();
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const query = searchKeyword.value.split(' ');

      if (query) {
        history.push(`/search?q=${query}`);
      } else history.push('/discover');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <input {...searchKeyword} placeholder={placeholder} aria-label="Search" className="container-row-navbar-searchbox" />
      </Form>
    </div>
  );
};

export default NavSearchBar;
