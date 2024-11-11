// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Используем новый API для React 18
import App from './App';  // Импортируем главный компонент приложения
import './styles/styles.css';  // Убедитесь, что путь правильный
import 'bootstrap/dist/css/bootstrap.min.css';

    // Стилевой файл, если есть

const root = ReactDOM.createRoot(document.getElementById('root')); // Создаем корень
root.render(
  <React.StrictMode>
    <App />  {/* Главный компонент приложения */}
  </React.StrictMode>
);
