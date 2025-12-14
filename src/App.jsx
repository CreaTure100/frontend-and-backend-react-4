import { useState } from 'react';
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

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});

// Внутренний компонент для работы с роутингом
function AppContent() {
    const [activeTab, setActiveTab] = useState(0);

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
            default:
                return <Home onNavigate={handleTabChange} />;
        }
    };

    return (
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
                    {/* Детальная страница использует роутинг */}
                    <Route
                        path="/technology/:id"
                        element={<TechnologyDetail />}
                    />
                    {/* Остальные страницы рендерятся без роутинга */}
                    <Route path="*" element={renderMainContent()} />
                </Routes>
            </Box>
            <Box
                component="footer"
                sx={{
                    py: 2,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: 'grey.100',
                    textAlign: 'center',
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                }}
            >
                Tech Tracker © {new Date().getFullYear()} - Персональный трекер
                освоения технологий
            </Box>
        </Box>
    );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    );
}

export default App;
