import React from 'react';

const Pagination = ({ onLoadMore }) => {
  return (
    <div className="pagination">
      <button className="btn btn-primary" onClick={onLoadMore}>
        Загрузить больше
      </button>
    </div>
  );
};

export default Pagination;
