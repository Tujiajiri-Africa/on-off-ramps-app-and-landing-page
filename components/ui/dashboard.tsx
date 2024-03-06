import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

export default function MainDashboard(){
    return (
        <>
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Welcome back 👋 Dickens
                </Typography>
                <Grid container spacing={3}>
                    
                </Grid>
            </Container>
        </>
    ) 
}