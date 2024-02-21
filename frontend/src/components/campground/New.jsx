import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const New = () => {
    const navigate = useNavigate();
    const [files, setFile] = useState([]);
    const [validated, setValidated] = useState(false);

    

    const handleFileChange = (e) => {
      setFile([...files ,...e.target.files]);
    };
    
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        console.log(form);
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);

        const title = e.target[0].value;
        const location = e.target[1].value;
        const price = e.target[2].value;
        const description = e.target[3].value;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('location', location);
        formData.append('price', price);
        formData.append('description', description);

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        if (validated) {
            await axios.post('http://localhost:3000/campgrounds/new', formData)    
        }         
    }

    return (
        <Row>
          <h1 className="text-center">New Campground</h1>
          <Col md={{ span: 6, offset: 3 }}>
            <Form
              onSubmit={onFormSubmit}
              noValidate
              encType="multipart/form-data"
              validated={validated}
            >
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" required />
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" required />
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Campground Price</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="price-label">$</InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="0.00"
                    aria-label="price"
                    aria-describedby="price-label"
                    name="price"
                    required
                  />
                  <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" type="text" name="description" required />
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image(s)</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  multiple
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Add Campground
              </Button>
            </Form>
            <Link to="/campgrounds">Home</Link>
          </Col>
        </Row>
      );
}

export default New