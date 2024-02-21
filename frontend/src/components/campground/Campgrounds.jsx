import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useMyContext } from '../../Context/MyContext';


const Campgrounds = () => {
  const { currentUser, setCurrentUser } = useMyContext();
    const [campgrounds, setCampgrounds] = useState([]);
    const BaseUrl = "http://localhost:3001"
    
    useEffect(() => {
        axios.get("http://localhost:3001/campgrounds")
          .then((res) => {
                setCampgrounds(res.data.campgrounds);
          })
    },[])

    return (
        <Container>
          <h1 className="px-5 mb-4">All Campgrounds</h1>
          <ul>
            {campgrounds?.length ? (
              campgrounds.map((campground, index) => (
                <Card key={index} className="mb-3">
                  <Row>
                    <Col md={4}>
                      {campground.backgroundImg ? (
                        <Card.Img src={campground.backgroundImg} alt="" className="img-fluid" style={{ height: "100%" }} />
                      ) : (
                        <Card.Img
                          src="https://res.cloudinary.com/dwxewr61q/image/upload/v1696491615/YelpCamp/camp2_t1a6v5.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      )}
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title>{campground.title}</Card.Title>
                        <Card.Text>{campground.description}</Card.Text>
                        <Card.Text>
                          <small className="text-muted">{campground.location}</small>
                        </Card.Text>
                        <Link to={`/campgrounds/${campground._id}`}>
                          <Button variant="primary">View {campground.title}</Button>
                        </Link>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              ))
            ) : (
              <h2>No data</h2>
            )}
          </ul>
          <Link to="/campgrounds/new">New Campgrounds</Link>
        </Container>
      );
}

export default Campgrounds