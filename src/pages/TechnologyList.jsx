import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    Paper,
    Chip,
    Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useTechnologies, {
    STATUS,
    STATUS_LABELS,
    STATUS_COLORS,
} from '../hooks/useTechnologies';
import SimpleTechCard from '../components/SimpleTechCard';
import QuickActions from '../components/QuickActions';
import ProgressBar from '../components/ProgressBar';

const TechnologyList = ({ onNavigate }) => {
    const navigate = useNavigate();
    const {
        roadmap,
        technologies,
        progress,
        updateStatus,
        exportRoadmap,
        resetAllProgress,
        markAllCompleted,
    } = useTechnologies();

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredTechnologies = useMemo(() => {
        let result = technologies;

        if (statusFilter === 'overdue') {
            const today = new Date();
            result = result.filter(
                (t) =>
                    t.deadline &&
                    new Date(t.deadline) < today &&
                    t.status !== STATUS.COMPLETED
            );
        } else if (statusFilter !== 'all') {
            result = result.filter((t) => t.status === statusFilter);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (t) =>
                    t.title.toLowerCase().includes(query) ||
                    t.description.toLowerCase().includes(query)
            );
        }

        return result;
    }, [technologies, statusFilter, searchQuery]);

    const handleCardClick = (id) => {
        navigate(`/technology/${id}`);
    };

    const handleStatusChange = (id, newStatus) => {
        updateStatus(id, newStatus);
    };

    const handleExport = () => {
        const data = exportRoadmap();
        if (!data) return;

        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${roadmap.title.replace(/\s+/g, '_')}_progress.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleResetAll = () => {
        if (window.confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
            resetAllProgress();
        }
    };

    const handleMarkAllComplete = () => {
        if (window.confirm('Отметить все пункты как выполненные?')) {
            markAllCompleted();
        }
    };

    const handleRandomTechnology = () => {
        const notCompleted = technologies.filter(
            (t) => t.status !== STATUS.COMPLETED
        );
        if (notCompleted.length === 0) {
            alert('Все пункты уже выполнены!');
            return;
        }
        const randomIndex = Math.floor(Math.random() * notCompleted.length);
        navigate(`/technology/${notCompleted[randomIndex].id}`);
    };

    if (!roadmap) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="info">
                    Сначала загрузите дорожную карту на главной странице.
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                >
                    {roadmap.title}
                </Typography>

                <Paper sx={{ p: 2, mb: 3 }}>
                    <ProgressBar
                        value={progress}
                        label="Общий прогресс"
                        height={12}
                        color="auto"
                    />
                </Paper>
            </Box>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Поиск по названию или описанию..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Статус</InputLabel>
                            <Select
                                value={statusFilter}
                                label="Статус"
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                            >
                                <MenuItem value="all">Все статусы</MenuItem>
                                <MenuItem value={STATUS.NOT_STARTED}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor:
                                                    STATUS_COLORS[
                                                        STATUS.NOT_STARTED
                                                    ],
                                            }}
                                        />
                                        {STATUS_LABELS[STATUS.NOT_STARTED]}
                                    </Box>
                                </MenuItem>
                                <MenuItem value={STATUS.IN_PROGRESS}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor:
                                                    STATUS_COLORS[
                                                        STATUS.IN_PROGRESS
                                                    ],
                                            }}
                                        />
                                        {STATUS_LABELS[STATUS.IN_PROGRESS]}
                                    </Box>
                                </MenuItem>
                                <MenuItem value={STATUS.COMPLETED}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor:
                                                    STATUS_COLORS[
                                                        STATUS.COMPLETED
                                                    ],
                                            }}
                                        />
                                        {STATUS_LABELS[STATUS.COMPLETED]}
                                    </Box>
                                </MenuItem>
                                <MenuItem value="overdue">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                backgroundColor: 'error.main',
                                            }}
                                        />
                                        Просроченные
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <QuickActions
                            onMarkAllComplete={handleMarkAllComplete}
                            onResetAll={handleResetAll}
                            onExport={handleExport}
                            onRandomTechnology={handleRandomTechnology}
                            disabled={technologies.length === 0}
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                <Chip
                    label={`Всего: ${technologies.length}`}
                    variant="outlined"
                    size="small"
                />
                <Chip
                    label={`Найдено: ${filteredTechnologies.length}`}
                    color="primary"
                    size="small"
                />
                {statusFilter !== 'all' && (
                    <Chip
                        label={`Фильтр: ${
                            statusFilter === 'overdue'
                                ? 'Просроченные'
                                : STATUS_LABELS[statusFilter]
                        }`}
                        onDelete={() => setStatusFilter('all')}
                        size="small"
                        sx={{
                            backgroundColor:
                                statusFilter === 'overdue'
                                    ? 'error.main'
                                    : STATUS_COLORS[statusFilter],
                            color: 'white',
                        }}
                    />
                )}
            </Box>

            {filteredTechnologies.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">
                        {searchQuery || statusFilter !== 'all'
                            ? 'Не найдено пунктов по заданным критериям'
                            : 'Нет пунктов для отображения'}
                    </Typography>
                </Paper>
            ) : (
                <Grid container spacing={2}>
                    {filteredTechnologies.map((tech) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 4 }}
                            key={`${tech.id}-${tech.notes || ''}-${
                                tech.status
                            }-${tech.deadline || ''}`}
                        >
                            <SimpleTechCard
                                technology={tech}
                                onCardClick={handleCardClick}
                                onStatusChange={handleStatusChange}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default TechnologyList;
