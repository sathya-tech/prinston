import React from 'react'
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useMyContext } from '../../Context/MyContext';

const Login = () => {
  const navigate = useNavigate();

  const [returnTo, setReturnTo] = useState('');
  // const [currentUser, setCurrentUser] = useState('');
  const { currentUser, setCurrentUser } = useMyContext();

  const [formData, setForm] = useState({
    username: '',
    password:''
  });
  const baseUrl = "http://localhost:3001/login";

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    
      setForm({
        ...formData,
        username: e.target[0].value,
        password:e.target[1].value
      });

    axios.post("http://localhost:3001/login", formData)
      .then((res) => {
        setCurrentUser({ ...currentUser, ...res.data.currentUser });
        localStorage.setItem('user', currentUser.username);
        localStorage.setItem('email', currentUser.email);
        navigate(res.data.redirectUrl);
        
      })  
      .catch((err) => console.log(err))
  }
  console.log(currentUser.username);

  return (
    <Container className="d-flex justify-content-center offset-4 align-items-center mt-5">
      <Row>
        <Col md={6} offset-md={3} xl={4} offset-xl={4}>
          <Card className="shadow">
            <Card.Img
              src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
              alt=""
              className="card-img-top"
            />
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Form onSubmit={handleSubmit} className="validated-form" noValidate validated={validated}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control type="text" id="username" name="username" autoFocus required />
                  <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control type="password" id="password" name="password" required />
                  <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Button variant="success" block type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login