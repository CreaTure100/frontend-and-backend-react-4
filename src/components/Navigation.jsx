import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    useMediaQuery,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';

const navItems = [
    { index: 0, label: 'Главная', icon: <HomeIcon /> },
    { index: 1, label: 'Технологии', icon: <ListIcon /> },
    { index: 2, label: 'Статистика', icon: <DashboardIcon /> },
    { index: 3, label: 'Добавить', icon: <AddIcon /> },
];

const Navigation = ({ activeTab, onTabChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleNavClick = (index) => {
        onTabChange(index);
        setDrawerOpen(false);
    };

    const drawer = (
        <Box sx={{ width: 250 }}>
            <Typography
                variant="h6"
                sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}
            >
                Tech Tracker
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.index} disablePadding>
                        <ListItemButton
                            onClick={() => handleNavClick(item.index)}
                            selected={activeTab === item.index}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.light',
                                    color: 'primary.contrastText',
                                    '& .MuiListItemIcon-root': {
                                        color: 'primary.contrastText',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static" elevation={1}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        {isMobile ? (
                            <>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={toggleDrawer(true)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ flexGrow: 1, ml: 1 }}
                                >
                                    Tech Tracker
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ flexGrow: 0, mr: 4 }}
                                >
                                    Tech Tracker
                                </Typography>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        gap: 1,
                                    }}
                                >
                                    {navItems.map((item) => (
                                        <Button
                                            key={item.index}
                                            onClick={() =>
                                                handleNavClick(item.index)
                                            }
                                            color="inherit"
                                            startIcon={item.icon}
                                            sx={{
                                                backgroundColor:
                                                    activeTab === item.index
                                                        ? 'rgba(255,255,255,0.15)'
                                                        : 'transparent',
                                                '&:hover': {
                                                    backgroundColor:
                                                        activeTab === item.index
                                                            ? 'rgba(255,255,255,0.15)'
                                                            : 'rgba(255,255,255,0.08)',
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </Box>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawer}
            </Drawer>
        </>
    );
};

export default Navigation;
