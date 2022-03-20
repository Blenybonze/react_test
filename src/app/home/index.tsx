import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Container, Grid, Paper } from '@mui/material';


export default function Home() {

    return (

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: 'auto',
                        width: '80%'
                    }}>
                        <Typography variant="h1" component="div" gutterBottom>
                            Teste Frontend Linear
                        </Typography>
                        <Button variant="contained" href="/dashboard">Ir para Dashboard</Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>



    );
}