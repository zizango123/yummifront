import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

class Links extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isloggedin: localStorage.getItem('loggedin')
    };
  }

  logout(){
    this.setState({isloggedin:0})
    localStorage.setItem('loggedin',0);
    localStorage.removeItem("logtoken");
    window.location.href = "/";
  }


render() {
  return (
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/home" style={{color: 'white', fontWeight: 'bold', marginLeft: '10px'}}>Home</Nav.Link>
      <Nav.Link href="/veg" style={{color: 'white', fontWeight: 'bold', marginLeft: '10px'}}>Veg Pizza</Nav.Link>
      <Nav.Link href="/nonveg" style={{color: 'white', fontWeight: 'bold', marginLeft: '10px'}}>Non-Veg Pizza</Nav.Link>
      <Nav.Link href="/drinks" style={{color: 'white', fontWeight: 'bold', marginLeft: '10px'}}>Drinks</Nav.Link>
    </Nav>
    {
      this.state.isloggedin === '1'?
          <Nav.Link href="#" onClick={() => this.logout()} style={{color: '#dc3836', fontWeight: 'bold', marginLeft: '10px'}}>Log Out</Nav.Link>
          :
          <Nav.Link href="/login" style={{color: '#dc3836', fontWeight: 'bold', marginLeft: '10px'}}>Sign In</Nav.Link>
        }
    <Nav.Link href="/cart" >
      <FontAwesomeIcon style={{color: 'white'}} icon={faShoppingCart} />
    </Nav.Link>
  </Navbar.Collapse>
  );
}
}

export default Links;
