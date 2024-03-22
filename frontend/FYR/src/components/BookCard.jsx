import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function BookCard({ book }) {
  return (
    <div className="card">
      <h2>{book.title}</h2>
      <img src={book.image} alt={book.title} />
      <Link to={`/product/${book.id}`}>View Details</Link>
    </div>
  );
}

export default BookCard;