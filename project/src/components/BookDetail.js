import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "AIzaSyB-PJvJSqibUZMXVWLz6OYxN6LVXS170hI"; // Подставьте ваш ключ API
const API_URL = "https://www.googleapis.com/books/v1/volumes";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          params: { key: API_KEY },
        });
        setBook(response.data);
      } catch (error) {
        console.error("Ошибка загрузки книги", error);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (!book) return <div>Загрузка...</div>;

  const { volumeInfo } = book;
  const title = volumeInfo.title || "Без названия";
  const authors = volumeInfo.authors ? volumeInfo.authors.join(", ") : "Неизвестные авторы";
  const description = volumeInfo.description || "Описание отсутствует";
  const categories = volumeInfo.categories ? volumeInfo.categories.join(", ") : "Категории отсутствуют";
  const imageUrl = volumeInfo.imageLinks?.thumbnail || "";

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={imageUrl} alt={title} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <h2>{title}</h2>
          <h5>Автор(ы): {authors}</h5>
          <p><strong>Категории:</strong> {categories}</p>
          <p><strong>Описание:</strong> {description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
