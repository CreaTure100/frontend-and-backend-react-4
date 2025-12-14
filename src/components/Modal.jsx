import { useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const Modal = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  disableEscapeKeyDown = false,
  disableBackdropClick = false
}) => {
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape' && !disableEscapeKeyDown && onClose) {
      onClose();
    }
  }, [disableEscapeKeyDown, onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleKeyDown]);

  const handleBackdropClick = (event) => {
    if (!disableBackdropClick && event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={disableBackdropClick ? undefined : onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      onClick={handleBackdropClick}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {title && (
        <DialogTitle id="modal-title">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="span">
              {title}
            </Typography>
            {onClose && (
              <IconButton
                aria-label="закрыть"
                onClick={onClose}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'text.primary'
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
      )}
      
      <DialogContent id="modal-description" dividers={!!title}>
        {children}
      </DialogContent>
      
      {actions && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
