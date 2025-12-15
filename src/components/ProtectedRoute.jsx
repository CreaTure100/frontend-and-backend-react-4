import React from 'react';
import { Navigate } from 'react-router-dom';

// Функция проверки авторизации — можно заменить на логику с токенами
const isAuthenticated = () => {
    const user = localStorage.getItem('user'); // Проверка наличия данных пользователя
    return user && JSON.parse(user).isAuthenticated;
};

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        // Перенаправление на страницу входа, если пользователь не авторизован
        return <Navigate to="/login" />;
    }
    return children; // Рендер дочернего компонента, если пользователь авторизован
};

export default ProtectedRoute;