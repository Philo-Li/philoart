/* eslint-disable object-curly-newline */
import React from 'react';
import { useApolloClient } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect,
} from 'react-router-dom';
import { Nav, Form, FormControl, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import Home from './components/Home';
import Discover from './components/Discover';
import Footer from './components/Footer';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import DailyCover from './components/DailyCover';
import useAuthorizedUser from './hooks/useAuthorizedUser';
import logo from './logo.png';

const App = () => {
  const client = useApolloClient();
  const { authorizedUser } = useAuthorizedUser();

  const Menu = () => {
    const handleLogout = async (event) => {
      event.preventDefault();
      localStorage.clear();
      client.resetStore();
    };

    return (
      <div>
        <Navbar expand="lg" bg="white" variant="light" sticky="top">
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Free Stock Photos"
            />
            Picky
          </Navbar.Brand>
          <Form inline xs="auto">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="justify-content-end">
              <Nav.Link href="/discover">Discover</Nav.Link>
              <Nav.Link href="/license">License</Nav.Link>
              <Nav.Link href="/signin">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/faq">FAQ</Nav.Link>
              {authorizedUser && <Button variant="outline-primary" type="submit" onClick={handleLogout}>logout</Button>}
            </Nav>
            <Nav>
              <Button href="/join" variant="primary" type="submit">Join</Button>
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
        <div className="container">
          <Switch>
            <Route path="/discover" exact>
              <Discover />
            </Route>
            <Route path="/license" exact>
              <Home />
            </Route>
            <Route path="/signin" exact>
              <SignInForm />
            </Route>
            <Route path="/signup" exact>
              <SignUpForm />
            </Route>
            <Route path="/FAQ" exact>
              <SignInForm />
            </Route>
            <Route path="/join" exact>
              <SignInForm />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
        <DailyCover />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
