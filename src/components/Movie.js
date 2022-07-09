import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { useNavigate, Link, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import moment from "moment";
import axios from "axios";

const Movie = ({ user }) => {
    let params = useParams();

    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        poster: "",
        reviews: []
    });

    useEffect(() => {
        const getMovie = id => {
            MovieDataService.findById(id)
                .then(response => {
                    console.log(response.data);
                    setMovie(response.data);
                }).catch(e => {
                    console.log(e);
                })

        }
        getMovie(params.id);
    }, [params.id]);
    
    const deleteReview = (review, index) => {
        var data = {
            review_id: review._id,
            user_id: user.googleId,
        }
        MovieDataService.deleteReview(data)
            .then(response => {
                setMovie((previousState)=> {
                    previousState.reviews.splice(index,1);
                    return ({
                        ...previousState
                    })
                })
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className="poster">
                            <Image
                                className="bigPicture"
                                src={movie.poster + "/100px250"}
                                onError={(e) => {
                                    e.target.src = '/images/NoPosterAvailable-crop.jpeg' // some replacement image
                                }}
                                fluid />
                        </div>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">
                                {movie.title}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {movie.plot}
                                </Card.Text>
                                {user && <Link to={"/movies/" + params.id + "/review"}>
                                    Add Review
                                </Link>}
                            </Card.Body>
                        </Card>
                        <h2>
                            Reviews
                        </h2>
                        <br></br>
                        {movie.reviews.map((review, index) => {
                            return (
                                <div className="d-flex">
                                    <div className="flex-shrink-0 reviewText">
                                        <h5>{review.name + " reviewed on "} {moment(review.date).format("Do MMMM YYYY")}</h5>
                                        <p className="review">{review.review}</p>
                                        {user && user.googleId === review.user_id &&
                                            <Row>
                                                <Col>
                                                    <Link to={{
                                                        pathname: "/movies/" + params.id + "/review"
                                                    }}
                                                        state={{
                                                            currentReview: review
                                                        }}>
                                                        Edit
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Button variant="link" onClick={() => {
                                                        deleteReview(review, index);
                                                    }}>
                                                        delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Movie;