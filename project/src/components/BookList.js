import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import BookCard from "./BookCard";
import Pagination from "./Pagination";

const API_KEY = "AIzaSyB-PJvJSqibUZMXVWLz6OYxN6LVXS170hI";
const API_URL = "https://www.googleapis.com/books/v1/volumes";

const BookList = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [books, setBooks] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          params: {
            q: query,
            filter: category !== "all" ? category : undefined,
            orderBy: sort === "newest" ? "newest" : undefined,
            startIndex: nextPageToken ? nextPageToken : 0,
            maxResults: 12,
            key: API_KEY,
          },
        });
        setBooks(response.data.items || []);
        setNextPageToken(response.data.nextPageToken); // Получаем следующий токен для пагинации
      } catch (error) {
        console.error("Ошибка загрузки книг", error);
      }
      setLoading(false);
    };

    if (query || category !== "all") {
      fetchBooks();
    }
  }, [query, category, sort, nextPageToken]);

  const handleLoadMore = () => {
    setNextPageToken(nextPageToken);
  };

  return (
    <div className="container mt-5">
      <SearchForm
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />
      
      <div className="row g-4">
        {loading ? (
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Загрузка...</span>
            </div>
          </div>
        ) : (
          books.map((book) => (
            <div className="col-md-3 col-sm-6" style={{margin: 15}} key={book.id}>
              <BookCard book={book} />
            </div>
          ))
        )}
      </div>

      {nextPageToken && !loading && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination onLoadMore={handleLoadMore} />
        </div>
      )}
    </div>
  );
};

export default BookList;
