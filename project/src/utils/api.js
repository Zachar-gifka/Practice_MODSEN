import axios from 'axios';

const API_KEY = 'AIzaSyB-PJvJSqibUZMXVWLz6OYxN6LVXS170hI'; 
const API_URL = 'https://www.googleapis.com/books/v1/volumes';

// Функция для поиска книг по запросу, категории и сортировке
export const fetchBooks = async (query, category, sort, startIndex = 0) => {
  try {
    const params = {
      q: query, // Текст поиска
      orderBy: sort, // Сортировка
      startIndex: startIndex, // Пагинация
      maxResults: 30, // Ограничение по количеству
      key: API_KEY, 
    };

    // Фильтрация по категории через subject
    if (category !== 'all') {
      params.q = `${query}+subject:${category}`;
    }

    console.log('Запрос к API:', params);

    const response = await axios.get(API_URL, { params });

    console.log('Ответ от API:', response.data);

    return response.data; // Возвращаем данные
  } catch (error) {
    console.error('Ошибка при загрузке данных с Google Books API:', error);

    if (error.response) {
      console.error('Ответ от сервера с ошибкой:', error.response.data);
    } else {
      console.error('Ошибка без ответа от сервера:', error.message);
    }

    throw new Error('Не удалось загрузить книги');
  }
};

// Функция для получения информации о конкретной книге по её ID
export const fetchBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      params: {
        key: API_KEY,
      },
    });

    return response.data; // Возвращаем данные о книге
  } catch (error) {
    console.error('Ошибка при загрузке данных о книге:', error);

    if (error.response) {
      console.error('Ответ от сервера с ошибкой:', error.response.data);
    } else {
      console.error('Ошибка без ответа от сервера:', error.message);
    }

    throw new Error('Не удалось загрузить данные книги');
  }
};
