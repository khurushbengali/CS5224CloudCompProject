import React from 'react';
import '../styles.css';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
  

function BookCard({ book }) {
    let navigate = useNavigate(); 
    const routeChange = (book) => () =>{ 
        let path = `/product/${book.id}`;
        console.log(path); 
        navigate(path);
    }

    return (
        <ImageListItem key={book.id} sx={{
                '&:hover': {
                    cursor: 'pointer'
                }
            }} className="card" onClick={routeChange(book)}>
            <img src={book.image} />
            <ImageListItemBar
            title={book.title}
            subtitle={<span>by: {book.author}</span>}
            position="below"
            />
        </ImageListItem>
    );
}
export default BookCard;