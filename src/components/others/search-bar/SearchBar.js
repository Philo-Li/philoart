/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
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
  const [searchRange, setSearchRange] = useState('Picky only');
  const history = useHistory();
  const classes = useStyles();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      // console.log('searchRange', searchRange);
      if (searchRange === 'All') {
        history.push(`/broadsearch?q=${searchKeyword.value}`);
      } else {
        history.push(`/search?q=${searchKeyword.value}`);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return (
    <div className="topnav">
      <Form onSubmit={handleSearch}>
        <div className="topnav container-row-1">
          <DropdownButton className={classes.margin} setSearchRange={setSearchRange} />
          <input {...searchKeyword} placeholder="Search..." aria-label="Search" />
          <IconButton aria-label="search" className={classes.margin} type="submit">
            <SearchIcon fontSize="large" />
          </IconButton>
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;