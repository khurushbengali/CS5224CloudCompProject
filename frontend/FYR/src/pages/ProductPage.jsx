import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import _ from 'lodash';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Stack from '@mui/material/Stack';

function ProductPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  let navigate = useNavigate(); 
  const routeChange = (book) => () =>{ 
    let path = `/product/${book.id}`;
    console.log(path); 
    navigate(path);
}

  useEffect(() => {
    // Fetch book details from an API or database using the id
    // For now, let's use static data
    const fetchedBook = {
      id: parseInt(id),
      title: 'Book 1',
      image: 'book1.jpg',
      description: 'Description for Book 1',
      recommendations: [
        { id: 2, title: 'Book 2', image: 'book2.jpg' },
        // Add more recommendations here
      ],
    };
    setBook(fetchedBook);
  }, [id]);

  if (!book) return <div>Loading...</div>;

  const dummyUrl = 'https://ic.od-cdn.com/resize?type=auto&url=%2FImageType-100%2F1523-1%2F%257BB240C268-9B32-4D56-A59D-DB07DF769865%257DIMG100.JPG&stripmeta=true&width=440'

  const nBooks = 10
  const randomStartDate = "2000-01-01"
  const randomEndDate = "2024-01-01"
  const fetchedBooks = _.range(nBooks).map(x => {
      const book = {
          id: x, 
          title: 'Book ' + x, 
          image: dummyUrl, 
          // dateAdded: getRandomDateAsString(randomStartDate, randomEndDate)
      }
      // Object.entries(ALL_SELECT_OPTION).map(([cat, enums]) => (
      //     book[cat] = getRandomDateFromChoices(enums)
      // ))
      return book;
      })

  return (
    <div>
      <Header/>
      <Container component="main" maxWidth="lg">
        <Box display="flex" flexDirection="col">
          <img src={dummyUrl} alt={book.title} />
          <Box display="flex" flexDirection="row">
            <Stack>
              <Typography variant="h3" component="div">
                {book.title}
              </Typography>
              <Typography variant="h4" component="div">
                {book.description}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <h2>Recommendations</h2>
        <ImageList
          sx={{
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr)) !important",
            gridAutoColumns: "minmax(240px, 1fr)"
          }}
          gap={12}
        >
          {fetchedBooks.map(recommendation => (
            <ImageListItem key={recommendation.id}sx={{
                  '&:hover': {
                      cursor: 'pointer'
                  }
              }} className="card" onClick={routeChange(recommendation)}>
              <img src={recommendation.image} />
              <ImageListItemBar
                title={recommendation.title}
                subtitle={<span>by: {"dummy author"}</span>}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
        
    </div>
  );
}

export default ProductPage;