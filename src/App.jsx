import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import './App.css';

import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Login from './pages/Login';
import BulkEditTechnologies from './pages/BulkEditTechnologies';

function AppContent() {
    const navigate = useNavigate();
    const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'light');

    // Создаем тему с текущим режимом
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#9c27b0',
            },
            background: {
                default: themeMode === 'dark' ? '#121212' : '#f5f5f5',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
    });

    useEffect(() => {
        // Меняем класс на <body> для изменения переменных CSS
        document.body.className = themeMode === 'dark' ? 'dark-theme' : 'light-theme';
    }, [themeMode]);

    const handleTabChange = (newTab) => {
        // Изменение маршрута при смене вкладки
        switch (newTab) {
            case 0:
                navigate('/'); // Главная страница
                break;
            case 1:
                navigate('/technologies'); // Список технологий
                break;
            case 2:
                navigate('/dashboard'); // Статистика
                break;
            case 3:
                navigate('/add'); // Добавить технологию
                break;
            case 4:
                navigate('/settings'); // Настройки
                break;
            case 5:
                navigate('/bulk-edit'); // Массовое редактирование технологий
                break;
            default:
                navigate('/');
                break;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Navigation onTabChange={handleTabChange} />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/technologies" element={<TechnologyList />} />
                        <Route path="/technology/:id" element={<TechnologyDetail />} />
                        <Route path="/add" element={<AddTechnology />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/settings" element={
                            <ProtectedRoute>
                                <Settings themeMode={themeMode} setThemeMode={setThemeMode} />
                            </ProtectedRoute>
                        } />
                        <Route path="/bulk-edit" element={
                            <ProtectedRoute>
                                <BulkEditTechnologies />
                            </ProtectedRoute>
                        } />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Box>
                <Box
                    component="footer"
                    sx={{
                        py: 2,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: theme.palette.background.default,
                        textAlign: 'center',
                        color: theme.palette.text.primary,
                        fontSize: '0.875rem',
                    }}
                >
                    Tech Tracker © {new Date().getFullYear()} - Персональный трекер
                    освоения технологий
                </Box>
            </Box>
        </ThemeProvider>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;