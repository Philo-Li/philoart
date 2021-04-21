/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import DropdownButton from './DropdownButton';
import useField from '../../../hooks/useField';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SearchBar = () => {
  const searchKeyword = useField('text');
  const [searchRange, setSearchRange] = useState('All');
  const history = useHistory();
  const classes = useStyles();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      // console.log('searchRange', searchRange);
      if (searchRange === 'All') {
        history.push(`/search?q=${searchKeyword.value}`);
      } else {
        history.push(`/pickysearch?q=${searchKeyword.value}`);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <div className="searchbar">
      <Form onSubmit={handleSearch}>
        <div className="container-row-searchbar">
          <DropdownButton className={classes.margin} setSearchRange={setSearchRange} />
          <input {...searchKeyword} placeholder="Search..." aria-label="Search" />
          <button type="submit" className="search-btn">
            <i className="bi bi-search icon-search" />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
