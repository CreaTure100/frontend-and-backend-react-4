import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import './App.css';

import Navigation from './components/Navigation';

import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

function AppContent() {
    const [activeTab, setActiveTab] = useState(0); // Управление вкладками
    const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'light'); // Управление темой

    const theme = createTheme({
        palette: {
            mode: themeMode, // Используем 'light' или 'dark' режим
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#9c27b0',
            },
            background: {
                default: themeMode === 'dark' ? '#121212' : '#f5f5f5', // Цвет фона в зависимости от темы
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

    const handleTabChange = (newValue) => {
        setActiveTab(newValue);
    };

    const renderMainContent = () => {
        switch (activeTab) {
            case 0:
                return <Home onNavigate={handleTabChange} />;
            case 1:
                return <TechnologyList onNavigate={handleTabChange} />;
            case 2:
                return <Dashboard onNavigate={handleTabChange} />;
            case 3:
                return <AddTechnology onNavigate={handleTabChange} />;
            case 4:
                return <Settings themeMode={themeMode} setThemeMode={setThemeMode} />;
            default:
                return <Home onNavigate={handleTabChange} />;
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
                <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Routes>
                        <Route
                            path="/technology/:id"
                            element={<TechnologyDetail />}
                        />
                        <Route path="*" element={renderMainContent()} />
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