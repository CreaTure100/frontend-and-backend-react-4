import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Chip,
    Box,
    Button,
    IconButton,
    Tooltip,
} from '@mui/material';
import { STATUS_LABELS, STATUS_COLORS, STATUS } from '../hooks/useTechnologies';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import InfoIcon from '@mui/icons-material/Info';
import EventIcon from '@mui/icons-material/Event';

const STATUS_ICONS = {
    not_started: <RadioButtonUncheckedIcon fontSize="small" />,
    in_progress: <PlayArrowIcon fontSize="small" />,
    completed: <CheckCircleIcon fontSize="small" />,
};

const NEXT_STATUS = {
    [STATUS.NOT_STARTED]: STATUS.IN_PROGRESS,
    [STATUS.IN_PROGRESS]: STATUS.COMPLETED,
    [STATUS.COMPLETED]: STATUS.NOT_STARTED,
};

const SimpleTechCard = ({ technology, onStatusChange, onCardClick }) => {
    const { id, title, description, status, deadline, notes, resources } =
        technology;

    const handleClick = () => {
        if (onCardClick) {
            onCardClick(id);
        }
    };

    const handleStatusClick = (e) => {
        e.stopPropagation();
        if (onStatusChange) {
            onStatusChange(id, NEXT_STATUS[status]);
        }
    };

    const isOverdue =
        deadline &&
        new Date(deadline) < new Date() &&
        status !== STATUS.COMPLETED;
    const hasNotes = notes && notes.trim().length > 0;
    const primaryResource =
        Array.isArray(resources) && resources.length > 0 ? resources[0] : null;

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                borderTop: 4,
                borderColor: STATUS_COLORS[status] || STATUS_COLORS.not_started,
                backgroundColor: isOverdue
                    ? 'rgba(244, 67, 54, 0.05)'
                    : 'background.paper',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                },
            }}
            onClick={handleClick}
        >
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 1.5,
                    }}
                >
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            lineHeight: 1.3,
                            pr: 1,
                        }}
                    >
                        {title}
                    </Typography>
                    <Tooltip title={`Статус: ${STATUS_LABELS[status]}`} arrow>
                        <Chip
                            icon={STATUS_ICONS[status]}
                            label={STATUS_LABELS[status]}
                            size="small"
                            onClick={handleStatusClick}
                            sx={{
                                backgroundColor: STATUS_COLORS[status],
                                color: 'white',
                                fontWeight: 500,
                                fontSize: '0.7rem',
                                height: 24,
                                '& .MuiChip-icon': {
                                    color: 'white',
                                },
                                '&:hover': {
                                    backgroundColor: STATUS_COLORS[status],
                                    filter: 'brightness(0.9)',
                                },
                            }}
                        />
                    </Tooltip>
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '2.5em',
                        lineHeight: 1.4,
                    }}
                >
                    {description || 'Нет описания'}
                </Typography>

                {hasNotes && (
                    <Box
                        sx={{
                            mt: 1.5,
                            p: 1,
                            backgroundColor: 'rgba(25, 118, 210, 0.04)',
                            borderRadius: 1,
                            borderLeft: 2,
                            borderColor: 'primary.main',
                        }}
                    >
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                fontSize: '0.75rem',
                                fontStyle: 'italic',
                                display: 'block',
                                mb: 0.5,
                                color: 'primary.main',
                                fontWeight: 500,
                            }}
                        >
                            Заметки:
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                lineHeight: 1.4,
                                fontSize: '0.8rem',
                            }}
                        >
                            {notes.trim()}
                        </Typography>
                    </Box>
                )}

                <Box
                    sx={{
                        display: 'flex',
                        gap: 0.5,
                        mt: 1.5,
                        flexWrap: 'wrap',
                    }}
                >
                    {deadline && (
                        <Chip
                            icon={<EventIcon />}
                            label={new Date(deadline).toLocaleDateString(
                                'ru-RU'
                            )}
                            size="small"
                            variant="outlined"
                            color={isOverdue ? 'error' : 'default'}
                            sx={{ fontSize: '0.7rem', height: 22 }}
                        />
                    )}
                    {hasNotes && (
                        <Chip
                            icon={<InfoIcon />}
                            label="Заметки"
                            size="small"
                            variant="outlined"
                            color="info"
                            sx={{ fontSize: '0.7rem', height: 22 }}
                        />
                    )}
                </Box>
            </CardContent>

            <CardActions sx={{ pt: 0, px: 2, pb: 1.5 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Button size="small" variant="text" onClick={handleClick}>
                        Подробнее
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {primaryResource && (
                            <Button
                                size="small"
                                variant="text"
                                component="a"
                                href={primaryResource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Источник
                            </Button>
                        )}
                        <Tooltip title="Изменить статус" arrow>
                            <IconButton
                                size="small"
                                onClick={handleStatusClick}
                                sx={{
                                    color: STATUS_COLORS[status],
                                    '&:hover': {
                                        backgroundColor: `${STATUS_COLORS[status]}20`,
                                    },
                                }}
                            >
                                {STATUS_ICONS[status]}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </CardActions>
        </Card>
    );
};

export default SimpleTechCard;
