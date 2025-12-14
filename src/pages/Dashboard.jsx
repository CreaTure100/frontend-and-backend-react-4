import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    Tabs,
    Tab,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Chip,
    Divider,
    Alert,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import useTechnologies, {
    STATUS,
    STATUS_LABELS,
    STATUS_COLORS,
} from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';

const STATUS_ICONS = {
    [STATUS.NOT_STARTED]: <RadioButtonUncheckedIcon />,
    [STATUS.IN_PROGRESS]: <PlayArrowIcon />,
    [STATUS.COMPLETED]: <CheckCircleIcon />,
};

const Dashboard = ({ onNavigate }) => {
    const navigate = useNavigate();
    const { roadmap, technologies, progress, stats } = useTechnologies();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
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

    const upcomingDeadlines = technologies
        .filter((t) => t.deadline && t.status !== STATUS.COMPLETED)
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 5);

    const inProgressItems = technologies.filter(
        (t) => t.status === STATUS.IN_PROGRESS
    );

    const completedItems = technologies.filter(
        (t) => t.status === STATUS.COMPLETED
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                >
                    Статистика
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Обзор вашего прогресса по карте "{roadmap.title}"
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <AssignmentIcon
                                    color="primary"
                                    sx={{ mr: 1 }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Всего пунктов
                                </Typography>
                            </Box>
                            <Typography variant="h3" fontWeight="bold">
                                {stats.total}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card
                        sx={{
                            height: '100%',
                            borderTop: 3,
                            borderColor: 'success.main',
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <CheckCircleIcon
                                    color="success"
                                    sx={{ mr: 1 }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Выполнено
                                </Typography>
                            </Box>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color="success.main"
                            >
                                {stats.completed}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card
                        sx={{
                            height: '100%',
                            borderTop: 3,
                            borderColor: 'warning.main',
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <PlayArrowIcon color="warning" sx={{ mr: 1 }} />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    В работе
                                </Typography>
                            </Box>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color="warning.main"
                            >
                                {stats.inProgress}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card
                        sx={{
                            height: '100%',
                            borderTop: 3,
                            borderColor: 'grey.400',
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                }}
                            >
                                <TrendingUpIcon color="action" sx={{ mr: 1 }} />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    Прогресс
                                </Typography>
                            </Box>
                            <Typography variant="h3" fontWeight="bold">
                                {progress}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Общий прогресс
                </Typography>
                <ProgressBar
                    value={progress}
                    label={`${stats.completed} из ${stats.total} пунктов выполнено`}
                    height={20}
                    color="auto"
                    stats={stats}
                />
            </Paper>

            <Paper sx={{ mb: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                >
                    <Tab label={`В работе (${inProgressItems.length})`} />
                    <Tab label={`Выполнено (${completedItems.length})`} />
                    <Tab label={`Дедлайны (${upcomingDeadlines.length})`} />
                </Tabs>
            </Paper>

            <Paper sx={{ p: 3 }}>
                {tabValue === 0 && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Пункты в работе
                        </Typography>
                        {inProgressItems.length === 0 ? (
                            <Alert severity="info">
                                У вас нет пунктов в работе. Начните изучение!
                            </Alert>
                        ) : (
                            <List>
                                {inProgressItems.map((item, index) => (
                                    <Box key={item.id}>
                                        {index > 0 && <Divider />}
                                        <ListItem
                                            component="div"
                                            onClick={() =>
                                                navigate(
                                                    `/technology/${item.id}`
                                                )
                                            }
                                            sx={{
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'action.hover',
                                                },
                                            }}
                                        >
                                            <ListItemIcon>
                                                {STATUS_ICONS[item.status]}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.title}
                                                secondary={item.description}
                                                secondaryTypographyProps={{
                                                    noWrap: true,
                                                }}
                                            />
                                            <Chip
                                                label={
                                                    STATUS_LABELS[item.status]
                                                }
                                                size="small"
                                                sx={{
                                                    backgroundColor:
                                                        STATUS_COLORS[
                                                            item.status
                                                        ],
                                                    color: 'white',
                                                }}
                                            />
                                        </ListItem>
                                    </Box>
                                ))}
                            </List>
                        )}
                    </Box>
                )}

                {tabValue === 1 && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Выполненные пункты
                        </Typography>
                        {completedItems.length === 0 ? (
                            <Alert severity="info">
                                У вас пока нет выполненных пунктов.
                            </Alert>
                        ) : (
                            <List>
                                {completedItems.map((item, index) => (
                                    <Box key={item.id}>
                                        {index > 0 && <Divider />}
                                        <ListItem
                                            component="div"
                                            onClick={() =>
                                                navigate(
                                                    `/technology/${item.id}`
                                                )
                                            }
                                            sx={{
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'action.hover',
                                                },
                                            }}
                                        >
                                            <ListItemIcon>
                                                <CheckCircleIcon color="success" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.title}
                                                secondary={item.description}
                                                secondaryTypographyProps={{
                                                    noWrap: true,
                                                }}
                                            />
                                            <Chip
                                                label="Выполнено"
                                                size="small"
                                                color="success"
                                            />
                                        </ListItem>
                                    </Box>
                                ))}
                            </List>
                        )}
                    </Box>
                )}

                {tabValue === 2 && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Ближайшие дедлайны
                        </Typography>
                        {upcomingDeadlines.length === 0 ? (
                            <Alert severity="info">
                                У вас нет запланированных дедлайнов.
                            </Alert>
                        ) : (
                            <List>
                                {upcomingDeadlines.map((item, index) => {
                                    const isOverdue =
                                        new Date(item.deadline) < new Date();
                                    return (
                                        <Box key={item.id}>
                                            {index > 0 && <Divider />}
                                            <ListItem
                                                component="div"
                                                onClick={() =>
                                                    navigate(
                                                        `/technology/${item.id}`
                                                    )
                                                }
                                                sx={{
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            'action.hover',
                                                    },
                                                    backgroundColor: isOverdue
                                                        ? 'error.light'
                                                        : 'transparent',
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <EventIcon
                                                        color={
                                                            isOverdue
                                                                ? 'error'
                                                                : 'action'
                                                        }
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={item.title}
                                                    secondary={`Дедлайн: ${new Date(
                                                        item.deadline
                                                    ).toLocaleDateString(
                                                        'ru-RU'
                                                    )}`}
                                                />
                                                <Chip
                                                    label={
                                                        isOverdue
                                                            ? 'Просрочено'
                                                            : STATUS_LABELS[
                                                                  item.status
                                                              ]
                                                    }
                                                    size="small"
                                                    color={
                                                        isOverdue
                                                            ? 'error'
                                                            : 'default'
                                                    }
                                                    sx={
                                                        !isOverdue
                                                            ? {
                                                                  backgroundColor:
                                                                      STATUS_COLORS[
                                                                          item
                                                                              .status
                                                                      ],
                                                                  color: 'white',
                                                              }
                                                            : {}
                                                    }
                                                />
                                            </ListItem>
                                        </Box>
                                    );
                                })}
                            </List>
                        )}
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default Dashboard;
