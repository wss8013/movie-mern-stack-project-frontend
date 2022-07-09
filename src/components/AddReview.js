import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useLocation } from 'react-router-dom';

const AddReview = ({ user }) => {
    const navigate = useNavigate();
    let params = useParams();

    let editing = false;
    let initialReviewState = "";
    let location = useLocation();

    // initialReviewState will have a different value
    // if we're editing an existing review
    const [review, setReview] = useState(initialReviewState);
    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }

    if (location.state && location.state.currentReview) {
        editing = true;
    }


    const saveReview = () => {
        var data = {
            review: review,
            name: user.name,
            user_id: user.googleId,
            movie_id: params.id // get movie id from url
        }

        if (editing) {
            data.review_id = location.state.currentReview._id;
            MovieDataService.updateReview(data)
                .then(Response => {
                    navigate("/movies/" + params.id)
                })
                .catch(e => {
                    console.log(e);
                });

        } else {
            MovieDataService.createReview(data)
                .then(Response => {
                    navigate("/movies/" + params.id)
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <Container className="main-container">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        review={review}
                        onChange={onChangeReview}
                        defaultValue={editing ? null : ""}
                    />
                </Form.Group>
                <Button variant="primary" onClick={saveReview}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddReview;