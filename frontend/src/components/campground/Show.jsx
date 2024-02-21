import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Carousel, Card, ListGroup, Button, Form } from 'react-bootstrap';
import './Show.css';

const Show = () => {
  const [campground, setCampground] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/campgrounds/${id}`)
          .then((res) => {
            setCampground(res.data.campground);
            setCurrentUser(res.data.currentUser);
            })
    },[])

    const onDeleteClick = () => {
        axios.delete(`http://localhost:3001/campgrounds/${id}/delete`)
            .then((res) => {
                if (res.status == 200) {
                    navigate('/campgrounds');
            }
        })
    }
return(
    <Row>
      <Col className="col-6">
        <Carousel>
          {campground?.images?.map((img, i) => (
            <Carousel.Item key={i}>
              <img className="d-block w-100" src={img.url} alt={`Slide ${i}`} />
            </Carousel.Item>
          ))}
        </Carousel>
        
        <Card className="mb-3">
          <Card.Body>
            <h5 className="card-title">{campground.title}</h5>
            <p className="card-text">{campground.description}</p>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item className="text-muted">{campground.location}</ListGroup.Item>
            <ListGroup.Item>Submitted by {campground?.author?.username}</ListGroup.Item>
            <ListGroup.Item>${campground.price}/night</ListGroup.Item>
          </ListGroup>
          {currentUser && campground.author.equals(currentUser._id) && (
            <div className="card-body">
              <a className="card-link btn btn-info" href={`/campgrounds/${campground._id}/edit`}>Edit</a>
              <form className="d-inline" action={`/campgrounds/${campground._id}?_method=DELETE`} method="POST">
                <button className="btn btn-danger">Delete</button>
              </form>
            </div>
          )}
          <div className="card-footer text-muted">2 days ago</div>
        </Card>
      </Col>

      <Col className="col-6">
        {currentUser && (
          <>
            <h2>Leave a Review</h2>
            <form action={`/campgrounds/${campground._id}/reviews`} method="POST" className="mb-3 validated-form" noValidate>
              {/* Add your rating input here */}
              <div className="mb-3">
                <label className="form-label" htmlFor="body">Review Text</label>
                <textarea className="form-control" name="review[body]" id="body" cols="30" rows="3" required></textarea>
                <div className="valid-feedback">Looks good!</div>
              </div>
              <button className="btn btn-success">Submit</button>
            </form>
          </>
        )}

        {campground?.reviews?.map((review, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <h5 className="card-title">{review?.author?.username}</h5>
              {/* Render the rating here */}
              <p className="starability-result" data-rating={review.rating}>Rated: {review.rating} stars</p>
              <p className="card-text">Review: {review.body}</p>
              {currentUser && review.author.equals(currentUser._id) && (
                <form action={`/campgrounds/${campground._id}/reviews/${review._id}?_method=DELETE`} method="POST">
                  <button className="btn btn-sm btn-danger">Delete</button>
                </form>
              )}
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Row>
  );
}

export default Show