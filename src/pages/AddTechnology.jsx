import { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Button,
    Alert,
} from '@mui/material';
import useTechnologies from '../hooks/useTechnologies';
import RoadmapImporter from '../components/RoadmapImporter';

const AddTechnology = ({ onSuccess }) => {
    const { roadmap, importRoadmap } = useTechnologies();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleImport = (data) => {
        try {
            importRoadmap(data);
            setSuccess(true);
            setError(null);
            setTimeout(() => {
                if (onNavigate) {
                    onNavigate(1); // Переход на вкладку "Технологии"
                } else {
                    navigate('/technologies');
                }
            }, 1500);
        } catch (err) {
            setError(err.message);
            setSuccess(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                fontWeight="bold"
            >
                {roadmap ? 'Загрузить новую карту' : 'Добавить дорожную карту'}
            </Typography>

            {roadmap && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                    У вас уже загружена карта "{roadmap.title}". Загрузка новой
                    карты заменит текущую. Рекомендуем сначала экспортировать
                    текущий прогресс.
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Дорожная карта успешно загружена! Перенаправление...
                </Alert>
            )}

            <RoadmapImporter onImport={handleImport} />

            <Paper sx={{ p: 3, mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Формат JSON файла
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    Дорожная карта должна быть в формате JSON со следующей
                    структурой:
                </Typography>
                <Box
                    component="pre"
                    sx={{
                        backgroundColor: 'grey.100',
                        p: 2,
                        borderRadius: 1,
                        overflow: 'auto',
                        fontSize: '0.875rem',
                    }}
                >
                    {`{
  "title": "Название карты",
  "description": "Описание карты (опционально)",
  "items": [
    {
      "id": "unique-id-1",
      "title": "Название пункта",
      "description": "Описание пункта",
      "resources": [
        {
          "title": "Название ресурса",
          "url": "https://example.com"
        }
      ]
    }
  ]
}`}
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Пример дорожной карты
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    Скопируйте этот пример, сохраните как .json файл и
                    загрузите:
                </Typography>
                <Box
                    component="pre"
                    sx={{
                        backgroundColor: 'grey.100',
                        p: 2,
                        borderRadius: 1,
                        overflow: 'auto',
                        fontSize: '0.75rem',
                        maxHeight: 400,
                    }}
                >
                    {`{
  "title": "React Roadmap",
  "description": "Дорожная карта изучения React",
  "items": [
    {
      "id": "jsx",
      "title": "JSX",
      "description": "Синтаксис JSX и его особенности. JSX позволяет писать HTML-подобный код внутри JavaScript.",
      "resources": [
        {"title": "React Docs - JSX", "url": "https://react.dev/learn/writing-markup-with-jsx"}
      ]
    },
    {
      "id": "components",
      "title": "Компоненты",
      "description": "Создание и использование компонентов React. Функциональные и классовые компоненты.",
      "resources": [
        {"title": "React Docs - Components", "url": "https://react.dev/learn/your-first-component"}
      ]
    },
    {
      "id": "props",
      "title": "Props",
      "description": "Передача данных между компонентами через пропсы.",
      "resources": [
        {"title": "React Docs - Props", "url": "https://react.dev/learn/passing-props-to-a-component"}
      ]
    },
    {
      "id": "state",
      "title": "State",
      "description": "Управление локальным состоянием компонента с помощью useState.",
      "resources": [
        {"title": "React Docs - State", "url": "https://react.dev/learn/state-a-components-memory"}
      ]
    },
    {
      "id": "hooks",
      "title": "Хуки",
      "description": "Использование хуков React: useState, useEffect, useContext, useRef и другие.",
      "resources": [
        {"title": "React Docs - Hooks", "url": "https://react.dev/reference/react"}
      ]
    },
    {
      "id": "events",
      "title": "Обработка событий",
      "description": "Работа с событиями в React: onClick, onChange, onSubmit и другие.",
      "resources": [
        {"title": "React Docs - Events", "url": "https://react.dev/learn/responding-to-events"}
      ]
    },
    {
      "id": "conditional-rendering",
      "title": "Условный рендеринг",
      "description": "Условное отображение компонентов и элементов.",
      "resources": [
        {"title": "React Docs - Conditional", "url": "https://react.dev/learn/conditional-rendering"}
      ]
    },
    {
      "id": "lists",
      "title": "Списки и ключи",
      "description": "Рендеринг списков с помощью map() и использование ключей.",
      "resources": [
        {"title": "React Docs - Lists", "url": "https://react.dev/learn/rendering-lists"}
      ]
    },
    {
      "id": "forms",
      "title": "Формы",
      "description": "Работа с формами: контролируемые и неконтролируемые компоненты.",
      "resources": [
        {"title": "React Docs - Forms", "url": "https://react.dev/reference/react-dom/components/input"}
      ]
    },
    {
      "id": "routing",
      "title": "Маршрутизация",
      "description": "Навигация между страницами с React Router.",
      "resources": [
        {"title": "React Router Docs", "url": "https://reactrouter.com/"}
      ]
    }
  ]
}`}
                </Box>
                <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={() => {
                        const example = {
                            title: 'React Roadmap',
                            description: 'Дорожная карта изучения React',
                            items: [
                                {
                                    id: 'jsx',
                                    title: 'JSX',
                                    description:
                                        'Синтаксис JSX и его особенности.',
                                    resources: [
                                        {
                                            title: 'React Docs',
                                            url: 'https://react.dev',
                                        },
                                    ],
                                },
                                {
                                    id: 'components',
                                    title: 'Компоненты',
                                    description:
                                        'Создание и использование компонентов React.',
                                    resources: [],
                                },
                                {
                                    id: 'props',
                                    title: 'Props',
                                    description:
                                        'Передача данных между компонентами.',
                                    resources: [],
                                },
                                {
                                    id: 'state',
                                    title: 'State',
                                    description:
                                        'Управление состоянием компонента.',
                                    resources: [],
                                },
                                {
                                    id: 'hooks',
                                    title: 'Хуки',
                                    description: 'Использование хуков React.',
                                    resources: [],
                                },
                                {
                                    id: 'events',
                                    title: 'События',
                                    description: 'Обработка событий.',
                                    resources: [],
                                },
                                {
                                    id: 'conditional',
                                    title: 'Условный рендеринг',
                                    description: 'Условное отображение.',
                                    resources: [],
                                },
                                {
                                    id: 'lists',
                                    title: 'Списки',
                                    description: 'Рендеринг списков.',
                                    resources: [],
                                },
                                {
                                    id: 'forms',
                                    title: 'Формы',
                                    description: 'Работа с формами.',
                                    resources: [],
                                },
                                {
                                    id: 'routing',
                                    title: 'Маршрутизация',
                                    description: 'React Router.',
                                    resources: [],
                                },
                            ],
                        };
                        const blob = new Blob(
                            [JSON.stringify(example, null, 2)],
                            { type: 'application/json' }
                        );
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'react-roadmap-example.json';
                        a.click();
                        URL.revokeObjectURL(url);
                    }}
                >
                    Скачать пример
                </Button>
            </Paper>
        </Container>
    );
};

export default AddTechnology;
