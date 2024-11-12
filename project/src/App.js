import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Заменили Switch на Routes
import { fetchBooks } from './utils/api';
import SearchForm from './components/SearchForm';
import BookCard from './components/BookCard';
import Pagination from './components/Pagination';
import BookDetail from './components/BookDetail'; // Импортируем компонент для страницы книги
import './styles/styles.css';

// Компонент для поиска книг
function SearchPage({ query, setQuery, category, setCategory, sort, setSort, books, totalItems, loading, error, onSearch, handleLoadMore }) {
  return (
    <div className="app-wrapper">
      <div className="search-section"
        style={{
          backgroundImage: 'url(/images/second.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '40px 0',
          textAlign: 'center',
          width: '100%',
          height: 'auto',
        }}
      >
        <SearchForm
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          onSearch={onSearch}
        />
      </div>

      {loading && <div>Загрузка...</div>}
      {error && <div className="error">{error}</div>}

      <div className="results-section" style={{ padding: '20px', width: '100%' }}>
        <h3>{totalItems} результатов</h3>
        <div className="row" style={{ margin: '0' }}>
          {books.map((book) => (
            <div className="col-md-4" key={book.id} style={{ padding: '0' }}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
        {totalItems > books.length && (
          <Pagination onLoadMore={handleLoadMore} />
        )}
      </div>
    </div>
  );
}

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
    if (!query) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchBooks(query, category, sort, 0);
      setBooks(data.items || []);
      setTotalItems(data.totalItems);
      setStartIndex(30);
      setLoading(false);
    } catch (err) {
      setError('Произошла ошибка при загрузке данных.');
      setLoading(false);
    }
  }, [query, category, sort]);

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const data = await fetchBooks(query, category, sort, startIndex);
      setBooks((prevBooks) => [...prevBooks, ...data.items]);
      setStartIndex((prevIndex) => prevIndex + 30);
      setLoading(false);
    } catch (err) {
      setError('Произошла ошибка при загрузке данных.');
      setLoading(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<SearchPage 
            query={query} 
            setQuery={setQuery} 
            category={category} 
            setCategory={setCategory} 
            sort={sort} 
            setSort={setSort} 
            books={books} 
            totalItems={totalItems} 
            loading={loading} 
            error={error} 
            onSearch={handleSearch} 
            handleLoadMore={handleLoadMore}
          />} 
        />
        <Route path="/book/:id" element={<BookDetail />} /> {/* Страница с деталями книги */}
      </Routes>
    </Router>
  );
}

export default App;
