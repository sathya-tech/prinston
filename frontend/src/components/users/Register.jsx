import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useMyContext } from '../../Context/MyContext';

const Register = () => {
  const baseUrl = "http://localhost:3001/register";

  const { currentUser, setCurrentUser } = useMyContext();

  const [formData, setForm] = useState({
    username: '',
    email: '',
    password:''
  });

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
        email: e.target[1].value,
        password:e.target[2].value
      });
      
    axios.post(baseUrl, formData)
      .then((res) => { setCurrentUser(res.data.currentUser); localStorage('user', currentUser.username);localStorage('email',currentUser.email) })
      .catch((err)=>console.log(err))
  }

  
  return (
    <>
      <Container className="d-flex justify-content-center offset-4 align-items-center mb-2">
        <Row>
          <Col md={6} offset-md={3} xl={4} offset-xl={4}>
            <Card className="shadow">
              <Card.Img
                src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
                alt=""
                className="card-img-top"
              />
              <Card.Body>
                <Card.Title>Register</Card.Title>
                <Form onSubmit={handleSubmit} className="validated-form" noValidate validated={validated}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control type="text" id="username" name="username" required autoFocus />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="email" id="email" name="email" required />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password" id="password" name="password" required />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="success" block type="submit">
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Register