// src/components/BookCard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link

const BookCard = ({ book }) => {
  const { volumeInfo } = book;
  const { title, authors, categories, imageLinks } = volumeInfo;

  return (
    <div
      className="card shadow-sm border"
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '40px 40px',
        marginTop: '20px',
        marginBottom: '20px',
        padding: '15px',
      }}
    >
      {imageLinks && imageLinks.thumbnail && (
        <img
          src={imageLinks.thumbnail}
          alt={title}
          className="card-img-top"
          style={{
            height: '200px',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      <div className="card-body d-flex flex-column" style={{ padding: '15px' }}>
        <h5 className="card-title" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
          {title}
        </h5>
        <p className="card-text">
          <strong>Authors: </strong>{authors ? authors.join(', ') : 'Неизвестно'}
        </p>
        <p className="card-text">
          <strong>Categories: </strong>{categories ? categories[0] : 'Не указано'}
        </p>
        <Link to={`/book/${book.id}`} className="btn btn-primary">
          View more details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
