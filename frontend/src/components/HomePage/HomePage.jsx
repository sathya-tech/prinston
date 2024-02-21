import React, { useEffect, useState } from 'react'
import './Home.css'
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMyContext } from '../../Context/MyContext';

const HomePage = () => {

  const { currentUser, setCurrentUser } = useMyContext();
  
  useEffect(() => {
    axios.get('http://localhost:3001/campgrounds')
      .then((res) => setCurrentUser({ ...currentUser, ...res.data.currentUser }));
  })

  // console.log(currentUser);

  let username = localStorage.getItem('user');
  let email = localStorage.getItem('email');

  const handleLogout = async () => {
    await axios.post("http://localhost:3001/logout");
    localStorage.removeItem('user');
    localStorage.removeItem('email');
  }
  
  return (
    <div className="d-flex text-center text-white bg-dark home-page">
      <Container className="covContainer d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <Row>
            <Col md={6} className="float-md-left mt-2">
              <h3>YelpCamp</h3>
            </Col>
            <Col md={6}>
              <Navbar expand="md" className="justify-content-center float-md-right">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="nav nav-masthead">
                    <Link to="#" className="navLink clicked">Home</Link>
                    <Link to="/campgrounds" className="navLink">Campgrounds</Link>
                    { /* Conditional rendering for Login and Register */ }
                    {!username ? (
                      <>
                        <Link to="/login" className="navLink">Login</Link>
                        <Link to="/register" className="navLink">Register</Link>
                      </>
                    ) : (
                      <Link className="navLink" onClick={handleLogout}>Logout</Link>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </header>
        <main className="px-3">
          <h1>YelpCamp</h1>
          <p className="lead">
            Welcome to YelpCamp! <br /> Jump right in and explore our many campgrounds. <br />
            Feel free to share some of your own and comment on others!
          </p>
          <Button href="/campgrounds" variant="secondary" size="lg" className="font-weight-bold border-white bg-white btnSecondary">View Campgrounds</Button>
        </main>
        <footer className="mt-auto text-white-50">
          <p>&copy; 2020</p>
        </footer>
      </Container>
    </div>
  );
}

export default HomePage