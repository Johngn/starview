import React from 'react';
import Home from '../containers/Home';
import { Route } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar">
    <div className="container">
      <a className="nav-link mr-auto active" href="/">Skyview</a>
      <a className="nav-link" href="/about">About</a>
      <a className="nav-link last" href="/contact">Contact</a>
    </div>
    <Route path="/" exact component={Home} />
    </nav>
  )
}

export default Nav;