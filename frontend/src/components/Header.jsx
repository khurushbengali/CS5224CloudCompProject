import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
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
            Find Your Read
            </Typography>
            </Toolbar>
        </AppBar>)
}