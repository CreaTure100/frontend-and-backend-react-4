import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Простая проверка; настоящий авторизованный запрос замените на API
        if (username === 'admin' && password === '12345') {
            localStorage.setItem('user', JSON.stringify({ isAuthenticated: true }));
            navigate('/settings'); // Перенаправляем на страницу настроек после успешного входа
        } else {
            alert('Неверные данные для входа');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Paper sx={{ p: 4, maxWidth: 400 }}>
                <Typography variant="h5" gutterBottom>
                    Вход в систему
                </Typography>
                <TextField
                    label="Имя пользователя"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
                    Войти
                </Button>
            </Paper>
        </Box>
    );
};

export default Login;