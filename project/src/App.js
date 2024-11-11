import React, { useState, useEffect, useCallback } from 'react';
import { fetchBooks } from './utils/api'; // Импортируем функцию для работы с API
import SearchForm from './components/SearchForm';
import BookCard from './components/BookCard';
import Pagination from './components/Pagination';

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async () => {
    if (!query) return;  // Не делаем запрос, если пустой запрос

    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks(query, category, sort, startIndex);
      setBooks(data.items || []); // Обновляем список книг
      setTotalItems(data.totalItems);
      setLoading(false);
    } catch (err) {
      setError('Произошла ошибка при загрузке данных.');
      setLoading(false);
    }
  }, [query, category, sort, startIndex]);

  const loadMoreBooks = () => {
    setStartIndex((prevIndex) => prevIndex + 30); // Пагинация
  };

  return (
    <div className="container">
      <SearchForm
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        onSearch={handleSearch} // Передаем функцию поиска
      />
      {loading && <div>Загрузка...</div>}
      {error && <div className="error">{error}</div>}
      <div>
        <h3>{totalItems} результатов</h3>
        <div className="row">
          {books.map((book) => (
            <div className="col-md-4" key={book.id}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
        {totalItems > books.length && (
          <Pagination onLoadMore={loadMoreBooks} />
        )}
      </div>
    </div>
  );
}

export default App;
