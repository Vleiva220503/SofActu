import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Link, Alert, InputAdornment, Icon } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { DirectionsCar, Lock, Email } from '@mui/icons-material';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [loginMessage, setLoginMessage] = useState<string>('');
    const navigate = useNavigate();

    const getRedirectUrl = (email: string) => {
        const domain = email.split('@')[1];
        if (domain === 'admin.pri') {
            return '/catalogo';
        } else {
            return '/catalogouser';
        }
    };

    const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.trim()) {
            setShowAlert(true);
            setLoginMessage('Correo vacío. Introduzca uno válido.');
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        if (!password.trim()) {
            setShowAlert(true);
            setLoginMessage('Contraseña vacía. Introduzca una contraseña.');
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'admin.pri'];
        const domain = email.split('@')[1];
        if (!allowedDomains.includes(domain)) {
            setShowAlert(true);
            setLoginMessage('Por favor, utilice un correo electrónico con un dominio permitido (gmail.com, hotmail.com, yahoo.com, admin.pri).');
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        try {
            const response = await fetch('https://sofback-production.up.railway.app/api/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            const data = await response.json();

            if (!data.exists) {
                setShowAlert(true);
                setLoginMessage('Este usuario no tiene cuenta aún. Por favor, cree una cuenta.');
                setTimeout(() => setShowAlert(false), 3000);
                return;
            }
        } catch (error) {
            console.error('Error:', error);
        }

        try {
            const response = await fetch('https://sofback-production.up.railway.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });

            if (response.ok) {
                setLoginMessage('Inicio de sesión exitoso');
                setTimeout(() => setLoginMessage(''), 3000);
                const redirectUrl = getRedirectUrl(email);
                navigate(redirectUrl);
            } else {
                setShowAlert(true);
                setLoginMessage('Correo o contraseña incorrectos.');
                setTimeout(() => setShowAlert(false), 3000);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid #e0e0e0',
                    borderRadius: '5px',
                    padding: '20px',
                    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
                    backgroundColor: 'background.paper',
                }}
            >
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
                <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo Electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {showAlert && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {loginMessage}
                        </Alert>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 3,
                                backgroundColor: '#0033ff',
                                '&:hover': { backgroundColor: '#0022aa' },
                                padding: '6px 12px',
                            }}
                            startIcon={<DirectionsCar />}
                        >
                            Iniciar Sesión
                        </Button>
                    </Box>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
                        ¿No tienes una cuenta?{' '}
                        <Link component={RouterLink} to="/register">
                            Registrarse
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;
