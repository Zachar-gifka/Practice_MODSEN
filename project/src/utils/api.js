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

    console.log('API request:', params); //Запрос к API

    const response = await axios.get(API_URL, { params });

    console.log('Response from API:', response.data); //Ответ от API

    return response.data; // Возвращаем данные
  } catch (error) {
    console.error('ERROR loading data from Google Books API:', error); //Ошибка при загрузке данных с Google Books API:

    if (error.response) {
      console.error('Response from the server with an error:', error.response.data); //Ответ от сервера с ошибкой:
    } else {
      console.error('ERROR without response from server:', error.message); //Ошибка без ответа от сервера:
    }

    throw new Error('FAILED to load books'); //Не удалось загрузить книги
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
    console.error('ERROR loading book data:', error); //Ошибка при загрузке данных о книге:

    if (error.response) {
      console.error('Server response with error:', error.response.data); //Ответ от сервера с ошибкой
    } else {
      console.error('Error: no response from server:', error.message); //Ошибка без ответа от сервера
    }

    throw new Error('Failed to load book data'); //Не удалось загрузить данные книги
  }
};
