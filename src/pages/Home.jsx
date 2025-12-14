import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    Button,
    Card,
    CardContent,
    Alert,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';
import RoadmapImporter from '../components/RoadmapImporter';

const Home = ({ onNavigate }) => {
    const { roadmap, progress, stats, importRoadmap } = useTechnologies();

    const handleImport = (data) => {
        try {
            importRoadmap(data);
        } catch (err) {
            console.error('Import error:', err);
        }
    };

    if (!roadmap) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <RocketLaunchIcon
                        sx={{ fontSize: 64, color: 'primary.main', mb: 2 }}
                    />
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        fontWeight="bold"
                    >
                        Добро пожаловать в Tech Tracker
                    </Typography>
                    <Typography variant="h6" color="text.secondary" paragraph>
                        Персональный трекер освоения технологий
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
                    >
                        Загрузите дорожную карту в формате JSON, чтобы начать
                        отслеживать свой прогресс в изучении новой технологии
                        или направления.
                    </Typography>
                </Box>

                <RoadmapImporter onImport={handleImport} />

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Alert
                        severity="info"
                        sx={{ display: 'inline-flex', maxWidth: 600 }}
                    >
                        <Typography variant="body2">
                            Дорожная карта должна быть в формате JSON с полями:
                            title, description (опционально), и items (массив
                            пунктов с id, title, description, resources).
                        </Typography>
                    </Alert>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                >
                    {roadmap.title}
                </Typography>
                {roadmap.description && (
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        paragraph
                    >
                        {roadmap.description}
                    </Typography>
                )}
            </Box>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Общий прогресс
                </Typography>
                <ProgressBar
                    value={progress}
                    label={`${stats.completed} из ${stats.total} пунктов выполнено`}
                    height={16}
                    color="auto"
                    stats={stats}
                />
            </Paper>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Card
                        sx={{
                            height: '100%',
                            borderLeft: 4,
                            borderColor: 'success.main',
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h3"
                                color="success.main"
                                fontWeight="bold"
                            >
                                {stats.completed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Выполнено
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Card
                        sx={{
                            height: '100%',
                            borderLeft: 4,
                            borderColor: 'warning.main',
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h3"
                                color="warning.main"
                                fontWeight="bold"
                            >
                                {stats.inProgress}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                В работе
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Card
                        sx={{
                            height: '100%',
                            borderLeft: 4,
                            borderColor: 'grey.500',
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h3"
                                color="text.secondary"
                                fontWeight="bold"
                            >
                                {stats.notStarted}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Не начато
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Paper
                        sx={{
                            p: 3,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                                boxShadow: 4,
                                transform: 'translateY(-2px)',
                            },
                        }}
                        onClick={() => onNavigate && onNavigate(1)}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <ListAltIcon
                                sx={{ fontSize: 48, color: 'primary.main' }}
                            />
                            <Box>
                                <Typography variant="h6">Все пункты</Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Просмотрите все пункты дорожной карты
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Paper
                        sx={{
                            p: 3,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                                boxShadow: 4,
                                transform: 'translateY(-2px)',
                            },
                        }}
                        onClick={() => onNavigate && onNavigate(2)}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <TrendingUpIcon
                                sx={{ fontSize: 48, color: 'secondary.main' }}
                            />
                            <Box>
                                <Typography variant="h6">Статистика</Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Детальная статистика вашего прогресса
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                    variant="text"
                    color="inherit"
                    onClick={() => {
                        if (
                            window.confirm(
                                'Загрузка новой карты заменит текущую. Продолжить?'
                            )
                        ) {
                            localStorage.removeItem('roadmap');
                            localStorage.removeItem('userProgress');
                            window.location.reload();
                        }
                    }}
                >
                    Загрузить другую дорожную карту
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
