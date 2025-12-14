import { Box, Button, Tooltip, ButtonGroup } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShuffleIcon from '@mui/icons-material/Shuffle';


const QuickActions = ({
  onMarkAllComplete,
  onResetAll,
  onExport,
  onRandomTechnology,
  disabled = false
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <ButtonGroup variant="outlined" size="small">
        <Tooltip title="Отметить все как выполненные" arrow>
          <span>
            <Button
              onClick={onMarkAllComplete}
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
              onClick={onResetAll}
              disabled={disabled}
              startIcon={<RestartAltIcon />}
              color="warning"
            >
              Сбросить
            </Button>
          </span>
        </Tooltip>
      </ButtonGroup>

      <ButtonGroup variant="outlined" size="small">
        <Tooltip title="Экспортировать данные в JSON" arrow>
          <span>
            <Button
              onClick={onExport}
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
              onClick={onRandomTechnology}
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
