import React, { useState, useEffect } from "react";
import "./Review.css";
import { useParams } from "react-router-dom";

const Review = () => {
  const { id } = useParams(); 
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
   
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/reviews/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedReviews = await response.json();
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      try {
        const response = await fetch('http://localhost:4000/api/reviews/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, comment: reviewText }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // After successful submission, fetch updated reviews
        const newReview = await response.json();
        setReviews([...reviews, newReview]);
        setReviewText(""); 
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  return (
    <div className="reviewPage">
      
      <div className="reviewContainer">
        <div className="reviewForm">
          <h2>Add a Review</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              rows="5"
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
        <div className="reviewList">
          <h2>Existing Reviews</h2>
          {reviews.length ? (
            reviews.map((review) => (
              <div className="reviewItem" key={review.id}>
                <p>{review.text}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
