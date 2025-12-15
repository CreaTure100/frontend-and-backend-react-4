import { Box, Button, Tooltip, ButtonGroup } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShuffleIcon from '@mui/icons-material/Shuffle';

// Функция проверки авторизации
const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    return user && JSON.parse(user).isAuthenticated;
};

const QuickActions = ({
    onMarkAllComplete,
    onResetAll,
    onExport,
    onRandomTechnology,
    disabled = false,
}) => {
    const handleAction = (action, label) => {
        if (!isAuthenticated()) {
            alert(`Для выполнения действия "${label}" необходимо авторизоваться.`);
            return;
        }
        action();
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {/* Группа кнопок для завершения всех и сброса */}
            <ButtonGroup variant="outlined" size="small">
                <Tooltip title="Отметить все как выполненные" arrow>
                    <span>
                        <Button
                            onClick={() => handleAction(onMarkAllComplete, 'Завершить все')}
                            disabled={disabled}
                            startIcon={<CheckCircleOutlineIcon />}
                            color="success"
                        >
                            Завершить все
                        </Button>
                    </span>
                </Tooltip>

                <Tooltip title="Сбросить все статусы" arrow>
                    <span>
                        <Button
                            onClick={() => handleAction(onResetAll, 'Сброс')}
                            disabled={disabled}
                            startIcon={<RestartAltIcon />}
                            color="warning"
                        >
                            Сбросить
                        </Button>
                    </span>
                </Tooltip>
            </ButtonGroup>

            {/* Группа кнопок для экспорта данных и случайной технологии */}
            <ButtonGroup variant="outlined" size="small">
                <Tooltip title="Экспортировать данные в JSON" arrow>
                    <span>
                        <Button
                            onClick={() => handleAction(onExport, 'Экспорт')}
                            disabled={disabled}
                            startIcon={<FileDownloadIcon />}
                            color="primary"
                        >
                            Экспорт
                        </Button>
                    </span>
                </Tooltip>

                <Tooltip title="Выбрать случайную технологию" arrow>
                    <span>
                        <Button
                            onClick={() => handleAction(onRandomTechnology, 'Случайная технология')}
                            disabled={disabled}
                            startIcon={<ShuffleIcon />}
                            color="secondary"
                        >
                            Случайная
                        </Button>
                    </span>
                </Tooltip>
            </ButtonGroup>
        </Box>
    );
};

export default QuickActions;