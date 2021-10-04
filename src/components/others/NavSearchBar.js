/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import useField from '../../hooks/useField';

const NavSearchBar = ({ placeholder, searchRange }) => {
  const searchKeyword = useField('text');
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const query = searchKeyword.value.split(' ');
      let qs = '';

      for (let i = 0; i < query.length; i += 1) {
        if (query[i]) {
          if (qs) qs = qs.concat('+', query[i]);
          else qs = query[i];
        }
      }

      if (qs) {
        const searchUrl = searchRange === 'picky' ? `/pickysearch?q=${qs}` : `/search?q=${qs}`;
        history.push(searchUrl);
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
