import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { flushSync } from 'react-dom';
import {
    Typography,
    Box,
    Button,
    TextField,
    Chip,
    Divider,
    Alert,
    IconButton,
    Tooltip,
    Container,
    Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import EventIcon from '@mui/icons-material/Event';
import useTechnologies, {
    STATUS,
    STATUS_LABELS,
    STATUS_COLORS,
} from '../hooks/useTechnologies';

const TechnologyDetail = () => {
    const { id } = useParams();
    const { getTechnologyById, updateStatus, updateNotes, updateDeadline } =
        useTechnologies();

    const technology = useMemo(
        () => getTechnologyById(id),
        [id, getTechnologyById]
    );

    const [localNotes, setLocalNotes] = useState('');
    const [localDeadline, setLocalDeadline] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (technology) {
            setLocalNotes(technology.notes || '');
            setLocalDeadline(technology.deadline || '');
        }
    }, [technology]);

    const hasNotesChanges = useMemo(() => {
        if (!technology) return false;
        return localNotes !== (technology.notes || '');
    }, [localNotes, technology]);

    const hasDeadlineChanges = useMemo(() => {
        if (!technology) return false;
        return localDeadline !== (technology.deadline || '');
    }, [localDeadline, technology]);

    const hasChanges = hasNotesChanges || hasDeadlineChanges;

    const handleSave = () => {
        if (hasNotesChanges) {
            flushSync(() => {
                updateNotes(id, localNotes);
            });
        }
        if (hasDeadlineChanges) {
            flushSync(() => {
                updateDeadline(id, localDeadline);
            });
        }

        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleDeleteNotes = () => {
        if (window.confirm('Удалить заметку?')) {
            flushSync(() => {
                setLocalNotes('');
                updateNotes(id, '');
            });
        }
    };

    const handleStatusChange = (newStatus) => {
        updateStatus(id, newStatus);
    };

    const handleDeleteDeadline = () => {
        setLocalDeadline('');
        updateDeadline(id, '');
    };

    if (!technology) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="warning">
                    Пункт не найден. Возможно, дорожная карта не загружена.
                </Alert>
                <Button
                    component={Link}
                    to="/"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mt: 2 }}
                >
                    На главную
                </Button>
            </Container>
        );
    }

    const currentStatus = technology.status || STATUS.NOT_STARTED;
    const isOverdue =
        localDeadline &&
        new Date(localDeadline) < new Date() &&
        currentStatus !== STATUS.COMPLETED;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                component={Link}
                to="/technologies"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 3 }}
            >
                Назад к списку
            </Button>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                    }}
                >
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        {technology.title}
                    </Typography>
                    <Chip
                        label={STATUS_LABELS[currentStatus]}
                        sx={{
                            backgroundColor: STATUS_COLORS[currentStatus],
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                        }}
                    />
                </Box>

                {technology.description && (
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        paragraph
                    >
                        {technology.description}
                    </Typography>
                )}

                {technology.resources && technology.resources.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Полезные ссылки:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {technology.resources.map((resource, index) => (
                                <Chip
                                    key={index}
                                    icon={<LinkIcon />}
                                    label={resource.title || resource.url}
                                    component="a"
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    clickable
                                    variant="outlined"
                                    size="small"
                                />
                            ))}
                        </Box>
                    </Box>
                )}
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Управление статусом
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                        <Button
                            key={key}
                            variant={
                                currentStatus === key ? 'contained' : 'outlined'
                            }
                            onClick={() => handleStatusChange(key)}
                            sx={{
                                borderColor: STATUS_COLORS[key],
                                color:
                                    currentStatus === key
                                        ? 'white'
                                        : STATUS_COLORS[key],
                                backgroundColor:
                                    currentStatus === key
                                        ? STATUS_COLORS[key]
                                        : 'transparent',
                                '&:hover': {
                                    backgroundColor:
                                        currentStatus === key
                                            ? STATUS_COLORS[key]
                                            : `${STATUS_COLORS[key]}20`,
                                    borderColor: STATUS_COLORS[key],
                                },
                            }}
                        >
                            {label}
                        </Button>
                    ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                    Планирование
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                        type="date"
                        label="Дедлайн"
                        value={localDeadline}
                        onChange={(e) => setLocalDeadline(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: 200 }}
                    />
                    {localDeadline && (
                        <Tooltip title="Удалить дедлайн">
                            <IconButton
                                size="small"
                                onClick={handleDeleteDeadline}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    {isOverdue && (
                        <Chip
                            icon={<EventIcon />}
                            label="Просрочено!"
                            color="error"
                            size="small"
                        />
                    )}
                </Box>
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Typography variant="h6">Личные заметки</Typography>
                    {localNotes && (
                        <Tooltip title="Удалить заметку">
                            <IconButton
                                size="small"
                                color="error"
                                onClick={handleDeleteNotes}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <TextField
                    fullWidth
                    multiline
                    rows={6}
                    placeholder="Добавьте свои заметки, конспект, полезные команды или ссылки на решенные задачи..."
                    value={localNotes}
                    onChange={(e) => setLocalNotes(e.target.value)}
                    variant="outlined"
                />

                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                    }}
                >
                    {hasChanges && (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                        >
                            Сохранить изменения
                        </Button>
                    )}
                </Box>

                {saved && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Изменения сохранены!
                    </Alert>
                )}
            </Paper>

            <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}
            >
                <Button
                    component={Link}
                    to="/technologies"
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                >
                    Вернуться к списку
                </Button>
            </Box>
        </Container>
    );
};

export default TechnologyDetail;
