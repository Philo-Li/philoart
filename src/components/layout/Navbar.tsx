"use client";

import { FormEvent, MouseEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RBNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";

export default function Navbar() {
  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;

  const [keyword, setKeyword] = useState("");

  const profileHref = useMemo(() => (username ? `/${username}` : "/signin"), [username]);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const q = keyword.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/discover");
  };

  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.clear();
    router.push("/");
    router.refresh();
  };

  return (
    <div style={{ fontSize: "1rem" }}>
      <RBNavbar collapseOnSelect expand="md" bg="white" variant="light" sticky="top">
        <div className="container-fluid">
          <RBNavbar.Brand href="/" className="container-row-navbar-brand">
            <img src="/img/logo/logo2.svg" width="30" height="30" alt="PhiloArt brand logo" />
            PhiloArt
          </RBNavbar.Brand>
          <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
          <RBNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <div className="container-row-navbar-searchbox">
                <Form onSubmit={handleSearch}>
                  <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search Food"
                    aria-label="Search"
                    className="container-row-navbar-searchbox"
                  />
                </Form>
              </div>
            </Nav>
            <Nav className="justify-content-end container-row-0">
              <Link className="navbar-link" href="/discover">Discover</Link>
              <Link className="navbar-link" href="/artists">Artist</Link>
              <Link className="navbar-link" href="/about">About</Link>
              <Link className="navbar-link" href="/license">License</Link>
              <Link className="navbar-link" href="/blog">Blog</Link>
              <a className="navbar-link" href="https://github.com/philo-li/philoart">GitHub</a>

              {!token && <Link className="navbar-link" href="/signin">Login</Link>}
              {token && (
                <NavDropdown className="navbar-link" title="My Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href={profileHref}>Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/user/edit">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <button className="navbar-button-logout" type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </NavDropdown>
              )}
              {token && <Link href="/create" className="navbar-button-join">Create</Link>}
              {!token && <Link href="/signup" className="navbar-button-join">Sign up</Link>}
            </Nav>
          </RBNavbar.Collapse>
        </div>
      </RBNavbar>
    </div>
  );
}
