import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, FormControlLabel, Switch } from '@mui/material';

const Settings = ({ themeMode, setThemeMode }) => {
    const [isDarkMode, setIsDarkMode] = useState(themeMode === 'dark');

    useEffect(() => {
        // Изменение темы и сохранение в localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        setThemeMode(isDarkMode ? 'dark' : 'light');
    }, [isDarkMode, setThemeMode]);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Заголовок страницы */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                    Настройки
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Управляйте настройками темы вашего приложения.
                </Typography>
            </Box>

            {/* Настройки темы */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Тема оформления
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isDarkMode}
                            onChange={(e) => setIsDarkMode(e.target.checked)}
                        />
                    }
                    label="Включить тёмную тему"
                />
            </Paper>
        </Container>
    );
};

export default Settings;