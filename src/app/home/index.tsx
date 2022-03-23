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
                <Grid item xs={12} sm={12} md={12}>
                    <Typography align="center" variant="h1" component="div" gutterBottom>
                        Teste Frontend Linear
                    </Typography>
                </Grid>
                <Grid md={4}></Grid>
                <Grid direction="column" item xs={12} sm={12} md={4} >
                    <Button fullWidth variant="contained" href="/dashboard">Ir para Dashboard</Button>
                </Grid>
                <Grid md={4}></Grid>
            </Grid>
        </Container>



    );
}