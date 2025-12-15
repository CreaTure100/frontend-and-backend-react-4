import React, { useState } from 'react';
import { Container, TextField, Button, Paper, Typography, Box } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      setError(null);
      window.location.href = '/';
    } else {
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Авторизация
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" onClick={handleLogin}>
            Войти
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;