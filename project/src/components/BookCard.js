import React from 'react';

const BookCard = ({ book }) => {
  const { volumeInfo } = book;
  const { title, authors, categories, imageLinks } = volumeInfo;

  return (
    <div className="col-md-4 col-sm-6 mb-4"> 
      <div className="card h-100"> 
        {imageLinks && imageLinks.thumbnail && (
          <img
            src={imageLinks.thumbnail}
            alt={title}
            className="card-img-top" 
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            <strong>Авторы: </strong>{authors ? authors.join(', ') : 'Неизвестно'}
          </p>
          <p className="card-text">
            <strong>Категории: </strong>{categories ? categories[0] : 'Не указано'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

