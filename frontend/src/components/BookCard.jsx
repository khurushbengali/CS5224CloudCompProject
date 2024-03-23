import React from 'react';
import '../styles.css';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
  

function BookCard({ book }) {
    let navigate = useNavigate(); 
    const routeChange = (book) => () =>{ 
        let path = `/product/${book.id}`;
        console.log(path); 
        navigate(path);
    }

    return (
        <Box sx={{
            '&:hover': {
                cursor: 'pointer'
            }
        }} className="card" onClick={routeChange(book)}>
            <img src={book.image} alt={book.title} />
            <Typography variant="h6" noWrap component="div">
                {book.title}
            </Typography>
        </Box>
    );
}
export default BookCard;