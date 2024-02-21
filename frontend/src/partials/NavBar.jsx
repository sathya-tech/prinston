import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar sticky="top" expand="lg" bg="dark" variant='dark'>
          <Container>
            <Navbar.Brand as={Link} to="/">YelpCamp</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
            <Navbar.Collapse id="navbarNavAltMarkup">
              <Nav className="ml-auto">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/campgrounds" className="nav-link">Campgrounds</Link>
                <Link to="/campgrounds/new" className='nav-link'>New Campground</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default NavBar