import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, FormControlLabel, Switch, Button } from '@mui/material';

const Settings = ({ themeMode, setThemeMode }) => {
    const [isDarkMode, setIsDarkMode] = useState(themeMode === 'dark');

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        setThemeMode(isDarkMode ? 'dark' : 'light');
    }, [isDarkMode, setThemeMode]);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Удаляем данные пользователя
        window.location.href = '/login'; // Перенаправляем на страницу входа
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                    Настройки
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Управляйте настройками темы вашего приложения.
                </Typography>
            </Box>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Тема оформления
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isDarkMode}
                            onChange={() => setIsDarkMode((prev) => !prev)}
                        />
                    }
                    label="Включить тёмную тему"
                />
            </Paper>

            {/* Кнопка выхода */}
            <Paper sx={{ p: 3, mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Учетная запись
                </Typography>
                <Button variant="contained" color="error" onClick={handleLogout}>
                    Выйти из аккаунта
                </Button>
            </Paper>
        </Container>
    );
};

export default Settings;