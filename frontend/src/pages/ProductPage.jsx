import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import _ from 'lodash';
import ImageList from "@mui/material/ImageList";
import Stack from '@mui/material/Stack';
import { getBookDetailInfo, getRecommendations } from '../api/Api';
import Divider from '@mui/material/Divider';

function ProductPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    getBookDetailInfo(id, (fetchedBook) => setBook(fetchedBook));
    getRecommendations(id, (recommendations) => setRecommendations(recommendations));
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <Header/>
      <Container component="main" maxWidth="lg">
        <Box display="flex" flexDirection="col">
          <img style={{minWidth: 500}} src={"https://eservice.nlb.gov.sg/bookcoverwrapper/cover/"+book.uuid} alt={book.title} />
          <Box display="flex" flexDirection="row">
            <Stack>
              <Typography variant="h3" component="div">
                {book.title}
              </Typography>
              <Typography variant="h4" component="div">
                {book.merged_creator != "nan" && (
                <>
                Creator: {book.merged_creator}
                </>
                )}
              </Typography>
              <Divider/>
              <Typography variant="h4" component="div">
                {book.merged_contributor != "nan" && (
                <>
                Contributor: {book.merged_contributor}
                </>
                )}
              </Typography>
              <Divider/>
              <Typography variant="h4" component="div">
                {book.abstract != "nan" && (
                <>
                Description : {book.abstract}
                </>
                )}
              </Typography>
              <Divider/>
              <Typography variant="h4" component="div">
                {book.date_created != "nan" && (
                <>
                Date : {book.date_created}
                </>
                )}
              </Typography>
              <Divider/>
              <Typography variant="h4" component="div">
                {book.subject_lcsh != "nan" && (
                <>
                Subject : {book.subject_lcsh}
                </>
                )}
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
          {recommendations.map(recommendation => (
            <BookCard key={recommendation.uuid} book={recommendation} />
          ))}
        </ImageList>
      </Container>
        
    </div>
  );
}

export default ProductPage;