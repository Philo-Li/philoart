/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect,
} from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import Home from './components/Home';
import Discover from './components/Discover';
import Footer from './components/Footer';
import Profile from './components/Profile';
import UserLikes from './components/UserLikes';
import UserCollections from './components/UserCollections';
import PhotoDetails from './components/PhotoDetails';
import CollectionDetails from './components/CollectionDetails';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import useAuthorizedUser from './hooks/useAuthorizedUser';
import useField from './hooks/useField';
import NavSearchBar from './components/NavSearchBar';
import UserPage from './components/UserPage';
import License from './components/License';
import logo from './logo.png';

const App = () => {
  const client = useApolloClient();
  const { authorizedUser } = useAuthorizedUser();
  const searchValue = useField('searchValue');
  const [newSearchValue, setNewSearchValue] = useState('');

  const Menu = () => {
    const handleLogout = async (event) => {
      event.preventDefault();
      localStorage.clear();
      client.resetStore();
    };

    let userPage;
    if (authorizedUser) userPage = `/user/${authorizedUser.id}`;

    return (
      <div>
        <Navbar expand="lg" bg="dark" variant="dark" fixed="sticky">
          <Navbar.Brand className="text-light container-row-0" href="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Free Stock Photos"
            />
            Picky
          </Navbar.Brand>
          <NavSearchBar
            searchValue={searchValue}
            setNewSearchValue={setNewSearchValue}
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end light">
            <Nav className="justify-content-end container-row-0">
              <Nav.Link className="text-light" href="/discover">Discover</Nav.Link>
              <Nav.Link className="text-light" href="/license">License</Nav.Link>
              <Nav.Link className="text-light" href="/about">About</Nav.Link>
              {authorizedUser && <Nav.Link className="text-light" href={userPage}>Profile</Nav.Link>}
              {!authorizedUser && <Nav.Link className="text-light" href="/signin">Login</Nav.Link>}
              {!authorizedUser && <Nav.Link className="text-light" href="/signup">Sign Up</Nav.Link>}
              {authorizedUser && <Button variant="outline-primary" type="submit" onClick={handleLogout}>logout</Button>}
            </Nav>
            <Nav>
              {!authorizedUser && <Button href="/signup" variant="primary" type="submit">Join</Button>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };

  return (
    <Router>
      <div>
        <Menu />
        <div>
          <Switch>
            <Route path="/discover" exact>
              <Discover />
            </Route>
            <Route path="/license" exact>
              <License />
            </Route>
            <Route path="/faq" exact>
              <License />
            </Route>
            <Route path="/about" exact>
              <License />
            </Route>
            <Route path="/signin" exact>
              <SignInForm />
            </Route>
            <Route path="/signup" exact>
              <SignUpForm />
            </Route>
            <Route path="/user" exact>
              <UserPage />
            </Route>
            <Route path="/user/:id" exact>
              <Profile />
              <UserLikes />
            </Route>
            <Route path="/user/:id/collections" exact>
              <Profile />
              <UserCollections />
            </Route>
            <Route path="/photo/:id" exact>
              <PhotoDetails />
            </Route>
            <Route path="/collection/:id" exact>
              <CollectionDetails />
            </Route>
            <Route path="/" exact>
              <Home
                authorizedUser={authorizedUser}
                searchValue={searchValue}
                newSearchValue={newSearchValue}
                setNewSearchValue={setNewSearchValue}
              />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
