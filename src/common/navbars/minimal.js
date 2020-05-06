import React from 'react';
import logo from '../../images/logo.png';
import { Navbar } from 'react-bootstrap';
import Links from '../../common/navbars/links.js';

function Minimal() {  
  return (
    <Navbar className="nav-blue" expand="lg">
  <Navbar.Brand href="/home">
    <img src={logo} alt="" style={{height: '50px'}} />
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Links />
</Navbar>

  );
}

export default Minimal;
