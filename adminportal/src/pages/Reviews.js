import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/reviews/')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  return (
    <div>
      <h1>Guest Reviews</h1>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <strong>{review.guestName}</strong>: {review.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
