import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
} from '@mui/material';
import useTechnologies, { STATUS_LABELS } from '../hooks/useTechnologies';

// Функция проверки авторизации
const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user).isAuthenticated;
};

const BulkEditTechnologies = () => {
    const { technologies, updateStatuses } = useTechnologies(); // Функция массового изменения статусов
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [newStatus, setNewStatus] = useState('');

    const handleSelectTechnology = (id) => {
        setSelectedTechnologies((prev) =>
            prev.includes(id) ? prev.filter((techId) => techId !== id) : [...prev, id]
        );
    };

    const handleChangeStatus = (e) => {
        setNewStatus(e.target.value);
    };

    const handleApplyChanges = async () => {
        if (!isAuthenticated()) {
            alert('У вас нет доступа для изменения статусов. Пожалуйста, авторизуйтесь.');
            return;
        }

        if (!newStatus) {
            alert('Пожалуйста, выберите статус.');
            return;
        }

        try {
            await updateStatuses(selectedTechnologies, newStatus);
            alert(`${selectedTechnologies.length} технологий обновлены.`);
            setSelectedTechnologies([]);
            setNewStatus('');
        } catch (error) {
            alert('Произошла ошибка при обновлении статусов.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" mb={3}>
                Массовое редактирование технологий
            </Typography>
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Выберите технологии для редактирования:
                </Typography>
                <Paper elevation={1} sx={{ p: 2, maxHeight: 300, overflow: 'auto' }}>
                    <List>
                        {technologies.map((technology) => (
                            <React.Fragment key={technology.id}>
                                <ListItem>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={selectedTechnologies.includes(technology.id)}
                                            onChange={() => handleSelectTechnology(technology.id)}
                                            inputProps={{
                                                'aria-label': `Выберите технологию ${technology.title}`,
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={technology.title}
                                        secondary={technology.description}
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Box>

            <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="new-status-label">Новый статус</InputLabel>
                    <Select
                        labelId="new-status-label"
                        id="new-status"
                        value={newStatus}
                        onChange={handleChangeStatus}
                        inputProps={{ 'aria-label': 'Выберите новый статус для технологий' }}
                    >
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                            <MenuItem key={key} value={key}>
                                {label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyChanges}
                    disabled={!selectedTechnologies.length || !newStatus}
                    aria-label="Применить изменения к выбранным технологиям"
                >
                    Применить изменения
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        setSelectedTechnologies([]);
                        setNewStatus('');
                    }}
                    aria-label="Очистить выбор"
                >
                    Очистить выбор
                </Button>
            </Box>
        </Container>
    );
};

export default BulkEditTechnologies;