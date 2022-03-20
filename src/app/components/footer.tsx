import { Typography } from '@mui/material';
import * as React from 'react';


export default function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            React: Teste Frontend Linear-
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}