import React from 'react';

const SearchForm = ({ query, setQuery, category, setCategory, sort, setSort, onSearch }) => {
  // Функция для обработки нажатия клавиши
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();  // Запускать поиск только при нажатии Enter
    }
  };

  return (
    <div className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress} // Обработчик нажатия клавиши
        placeholder="Поиск книг..."
        className="form-control"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="form-control"
      >
        <option value="all">all</option>
        <option value="art">art</option>
        <option value="biography">biography</option>
        <option value="computers">computers</option>
        <option value="History">history</option>
        <option value="medical">medical</option>
        <option value="poetry">poetry</option>
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="form-control"
      >
        <option value="relevance">relevance</option>
        <option value="newest">newest</option>
      </select>
    </div>
  );
};

export default SearchForm;
