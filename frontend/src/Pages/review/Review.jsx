import React, { useState, useEffect } from "react";
import "./Review.css";
import { useParams } from "react-router-dom";

const Review = () => {
  const { id } = useParams(); 
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
   
    const fetchedReviews = [
      { id: 1, text: "Great place to stay!" },
      { id: 2, text: "Very comfortable and clean." }
    ];
    setReviews(fetchedReviews);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      
      setReviews([...reviews, { id: reviews.length + 1, text: reviewText }]);
      setReviewText(""); 
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
