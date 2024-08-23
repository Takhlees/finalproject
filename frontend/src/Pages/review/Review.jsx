import React, { useState, useEffect } from "react";
import "./Review.css";
import { useParams } from "react-router-dom";

const Review = () => {
  const { _id } = useParams(); 
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  // Fetch existing reviews when component loads
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      try {
        const response = await fetch('http://localhost:4000/api/reviews/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({roomId: _id, comment: reviewText }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const newReview = await response.json();
        console.log(newReview)
        setReviews(prevReviews => [...prevReviews, newReview]);
// Add new review to the existing list
        setReviewText(""); // Clear the text area
       
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/reviews/${_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  });
 
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
          <ul>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <li key={review._id}>
                   {review.comment}
                </li>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Review;
