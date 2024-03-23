import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
    const {drawerWidth} = props;
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        navigate(`/`);
    }
    return (
        <AppBar
            position="sticky"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, '&:hover': {
                cursor: 'pointer'
            } }}
            onClick={routeChange}
        >
            <Toolbar>
            <Typography variant="h6" noWrap component="div">
            Book Recommender System
            </Typography>
            </Toolbar>
        </AppBar>)
}