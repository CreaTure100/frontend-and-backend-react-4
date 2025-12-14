import { Card, CardContent, CardActions, Typography, Chip, Box, Button } from '@mui/material';
import { STATUS_LABELS, STATUS_COLORS } from '../hooks/useTechnologies';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const STATUS_ICONS = {
  not_started: <RadioButtonUncheckedIcon fontSize="small" />,
  in_progress: <PlayArrowIcon fontSize="small" />,
  completed: <CheckCircleIcon fontSize="small" />
};


const TechnologyCard = ({ technology, onStatusChange, onCardClick }) => {
  const { id, title, description, status } = technology;

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(id);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        borderLeft: 4,
        borderColor: STATUS_COLORS[status] || STATUS_COLORS.not_started,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 0 }}>
            {title}
          </Typography>
          <Chip
            icon={STATUS_ICONS[status]}
            label={STATUS_LABELS[status]}
            size="small"
            sx={{
              backgroundColor: STATUS_COLORS[status],
              color: 'white',
              '& .MuiChip-icon': {
                color: 'white'
              }
            }}
          />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {description || 'Нет описания'}
        </Typography>
      </CardContent>
      {onStatusChange && (
        <CardActions sx={{ pt: 0 }}>
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange(id);
            }}
          >
            Изменить статус
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default TechnologyCard;
