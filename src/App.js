import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect,
} from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import Home from './components/home/Home';
import Discover from './components/discover/Discover';
import Footer from './components/Footer';
import Profile from './components/profile/Profile';
import UserLikes from './components/profile/UserLikes';
import UserCollections from './components/profile/UserCollections';
import PhotoDetails from './components/photo-page/PhotoDetails';
import CollectionDetails from './components/collection-page/CollectionDetails';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import useAuthorizedUser from './hooks/useAuthorizedUser';
import useField from './hooks/useField';
import NavSearchBar from './components/others/NavSearchBar';
import UserPage from './components/profile/UserPage';
import SearchPage from './components/search/SearchPage';
import BroadSearchPage from './components/search/BroadSearchPage';
import AddNewPhotoPanel from './utils/AddNewPhotoPanel';
import License from './components/license/License';
import LicenseZh from './components/license/LicenseZh';
import About from './components/about/About';
import AboutZh from './components/about/AboutZh';
import TopWebsites from './components/TopWebsites';
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
          <NavSearchBar />
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
      <div className="daily-cover-container">
        <Menu />
        <div>
          <Switch>
            <Route path="/discover" exact>
              <Discover />
            </Route>
            <Route path="/license" exact>
              <License />
            </Route>
            <Route path="/license/zh" exact>
              <LicenseZh />
            </Route>
            <Route path="/faq" exact>
              <License />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="/about/zh" exact>
              <AboutZh />
            </Route>
            <Route path="/partner" exact>
              <TopWebsites />
            </Route>
            <Route path="/signin" exact>
              <SignIn />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/addphoto" exact>
              <AddNewPhotoPanel />
            </Route>
            <Route path="/search">
              <SearchPage authorizedUser={authorizedUser} />
            </Route>
            <Route path="/broadsearch">
              <BroadSearchPage />
            </Route>
            <Route path="/user" exact>
              <UserPage />
            </Route>
            <Route path="/user/:userId" exact>
              <Profile authorizedUser={authorizedUser} />
              <UserLikes authorizedUser={authorizedUser} />
            </Route>
            <Route path="/user/:userId/collections" exact>
              <Profile authorizedUser={authorizedUser} />
              <UserCollections authorizedUser={authorizedUser} />
            </Route>
            <Route path="/photo/:id" exact>
              <PhotoDetails authorizedUser={authorizedUser} />
            </Route>
            <Route path="/collection/:id" exact>
              <CollectionDetails authorizedUser={authorizedUser} />
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
