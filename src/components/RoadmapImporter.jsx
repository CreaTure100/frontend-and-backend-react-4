import { useState, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


const RoadmapImporter = ({ onImport, isLoading = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFile = useCallback(async (file) => {
    if (!file) return;

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setError('Пожалуйста, выберите JSON файл');
      return;
    }

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (onImport) {
        onImport(data);
        setSuccess(true);
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Ошибка парсинга JSON файла: неверный формат');
      } else {
        setError(err.message || 'Ошибка при импорте файла');
      }
    }
  }, [onImport]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e) => {
    setError(null);
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [processFile]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  return (
    <Box>
      <Paper
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          p: 4,
          textAlign: 'center',
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'divider',
          backgroundColor: isDragging ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'primary.light',
            backgroundColor: 'action.hover'
          }
        }}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={48} />
            <Typography color="text.secondary">
              Загрузка...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {isDragging ? (
              <InsertDriveFileIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            ) : (
              <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
            )}
            
            <Box>
              <Typography variant="h6" gutterBottom>
                {isDragging ? 'Отпустите файл для загрузки' : 'Импорт дорожной карты'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Перетащите JSON файл сюда или нажмите для выбора
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={(e) => {
                e.stopPropagation();
                handleButtonClick();
              }}
            >
              Выбрать файл
            </Button>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" variant="filled">
          Дорожная карта успешно импортирована!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RoadmapImporter;
