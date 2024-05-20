import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link, Snackbar, InputAdornment, Icon } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const RegisterForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [carType, setCarType] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const checkEmailExists = async (email) => {
        try {
            const response = await fetch('https://sofback-production.up.railway.app/api/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            return data.exists;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validación del teléfono
        const phoneRegex = /^[578]\d{7}$/;
        if (!phone.match(phoneRegex)) {
            setAlertMessage('Por favor, introduzca un número de teléfono válido (8 dígitos, comenzando con 5, 7 u 8).');
            setAlertOpen(true);
            return;
        }

        // Validación del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            setAlertMessage('Por favor, introduzca un correo electrónico válido.');
            setAlertOpen(true);
            return;
        }

        const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.com'];
        const domain = email.split('@')[1];
        if (!allowedDomains.includes(domain)) {
            setAlertMessage('Por favor, utilice un correo electrónico con un dominio permitido (gmail.com, hotmail.com, yahoo.com).');
            setAlertOpen(true);
            return;
        }

        // Verificar si el correo electrónico ya existe en la base de datos
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            setAlertMessage('Este correo electrónico ya tiene una cuenta creada. Por favor, inicie sesión.');
            setAlertOpen(true);
            return;
        }

        // Construir el objeto de datos a enviar
        const userData = {
            fullName,
            email,
            password,
            carType,
            address,
            phone
        };

        // Realizar la petición POST a la API para registrar el usuario
        fetch('https://sofback-production.up.railway.app/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición.');
            }
            console.log('Registro exitoso');
            setAlertMessage('Registro exitoso');
            setAlertOpen(true);
            // Limpiar el formulario
            setFullName('');
            setEmail('');
            setPassword('');
            setCarType('');
            setAddress('');
            setPhone('');
        })
        .catch(error => {
            console.error('Error:', error);
            setAlertMessage('Error en el registro: ' + error.message);
            setAlertOpen(true);
        });
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
                    Registrarse
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="Nombre Completo"
                        name="fullName"
                        autoComplete="name"
                        autoFocus
                        variant="standard"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo Electrónico"
                        name="email"
                        autoComplete="email"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
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
                        autoComplete="new-password"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="carType"
                        label="Marca de Auto"
                        name="carType"
                        variant="standard"
                        value={carType}
                        onChange={(e) => setCarType(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DirectionsCarIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="address"
                        label="Dirección"
                        name="address"
                        variant="standard"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HomeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="phone"
                        label="Teléfono"
                        name="phone"
                        variant="standard"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            backgroundColor: '#0033ff',
                            '&:hover': { backgroundColor: '#0022aa' },
                            padding: '6px 12px',
                        }}
                        startIcon={<CheckCircleOutlineIcon />}
                    >
                        Registrarse
                    </Button>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
                        ¿Ya tienes una cuenta?&nbsp;
                        <Link component={RouterLink} to="/login">
                            Iniciar Sesión
                        </Link>
                    </Typography>
                </Box>
            </Box>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={() => setAlertOpen(false)}
                message={alertMessage}
            />
        </Container>
    );
};

export default RegisterForm;
