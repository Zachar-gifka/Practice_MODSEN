import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Для получения параметра id из URL
import { fetchBookById } from '../utils/api'; // Функция для получения книги по id
import { Button } from 'react-bootstrap';

const BookDetail = () => {
  const { id } = useParams(); // Получаем id книги из URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchBookById(id); // Запрос подробной информации о книге
        setBook(data); // Устанавливаем полученную книгу
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить данные книги.');
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  if (!book) return <div>Книга не найдена.</div>;

  // Десструктурируем данные о книге
  const { volumeInfo } = book;
  const { title, authors, categories, description, imageLinks } = volumeInfo;

  return (
    <body style={{ backgroundColor: '#2e2d2d', minHeight: '100vh', padding: '20px'}}>
    <div className = "block" style={{margin: '15px 300px 15px 300px', border: '2px solid black' }}>
    <div className="book-detail" style={{ display: 'grid', placeItems: 'center', backgroundColor: '#fcf3f2', padding: '15px' }}>
      <h1>{title}</h1>
      {imageLinks?.thumbnail && (
        <img
          src={imageLinks.thumbnail}
          alt={title}
          style={{ width: '200px', height: 'auto' }}
        />
      )}
      <p><strong>Автор(ы):</strong> {authors?.join(', ') || 'Неизвестно'}</p>
      <p><strong>Категория:</strong> {categories?.join(', ') || 'Не указано'}</p>
      <p><strong>Описание:</strong> {description || 'Описание отсутствует'}</p>
      <Link to="/" style={{ textDecoration: 'none', alignContent: 'center' }}>
            <Button>Перейти на главную страницу</Button>
        </Link>
    </div>
    </div>
    </body>
  );
};

export default BookDetail;
