import React from 'react';
import { useApolloClient } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect,
} from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import Home from './components/Home';
import PublicLettersList from './components/PublicLettersList';
import Footer from './components/Footer';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import useAuthorizedUser from './hooks/useAuthorizedUser';

const App = () => {
  const client = useApolloClient();
  const { authorizedUser } = useAuthorizedUser();

  const Menu = () => {
    const padding = {
      paddingRight: 5,
    };

    const handleLogout = async (event) => {
      event.preventDefault();
      localStorage.clear();
      client.resetStore();
    };

    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/" as="span">
              <Link style={padding} to="/">首页</Link>
            </Nav.Link>
            <Nav.Link href="/blogs" as="span">
              <Link style={padding} to="/public_letters">公开信件</Link>
            </Nav.Link>
            {!authorizedUser && (
              <Nav.Link href="/signup" as="span">
                <Link style={padding} to="/signup">注册</Link>
              </Nav.Link>
            )}
            {!authorizedUser && (
              <Nav.Link href="/signin" as="span">
                <Link style={padding} to="/signin">登录</Link>
              </Nav.Link>
            )}
            {authorizedUser && <Button variant="secondary" type="submit" onClick={handleLogout}>登出</Button>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  return (
    <Router>
      <div className="container">
        <Menu />
        <div>
          <Switch>
            <Route path="/public_letters" exact>
              <PublicLettersList />
            </Route>
            <Route path="/signin" exact>
              <SignInForm />
            </Route>
            <Route path="/signup" exact>
              <SignUpForm />
            </Route>
            <Route path="/user/:id" exact>
              <SignInForm />
            </Route>
            <Route path="/" exact>
              <Home />
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
