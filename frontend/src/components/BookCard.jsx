import React from 'react';
import '../styles.css';
import { useNavigate } from "react-router-dom";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
  

function BookCard({ book }) {
    let navigate = useNavigate(); 
    const routeChange = (book) => () =>{ 
        let path = `/product/${book.uuid}`;
        console.log(path); 
        navigate(path);
    }

    return (
        <ImageListItem key={book.id} sx={{
                '&:hover': {
                    cursor: 'pointer'
                }
            }} className="card" onClick={routeChange(book)}>
            <img src={"https://eservice.nlb.gov.sg/bookcoverwrapper/cover/"+book.uuid} />
            <ImageListItemBar
            title={book.title}
            subtitle={<span>by: {book.merged_creator}</span>}
            position="below"
            />
        </ImageListItem>
    );
}
export default BookCard;