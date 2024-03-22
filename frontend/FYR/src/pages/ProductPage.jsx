import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookCard from '../components/BookCard';

function ProductPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details from an API or database using the id
    // For now, let's use static data
    const fetchedBook = {
      id: parseInt(id),
      title: 'Book 1',
      image: 'book1.jpg',
      description: 'Description for Book 1',
      recommendations: [
        { id: 2, title: 'Book 2', image: 'book2.jpg' },
        // Add more recommendations here
      ],
    };
    setBook(fetchedBook);
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.image} alt={book.title} />
      <p>{book.description}</p>
      <h2>Recommendations</h2>
      {book.recommendations.map(recommendation => (
        <BookCard key={recommendation.id} book={recommendation} />
      ))}
    </div>
  );
}

export default ProductPage;