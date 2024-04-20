import * as React from 'react';
import Box from '@mui/material/Box';
import BookCard from './BookCard';
import Pagination from '@mui/material/Pagination';
import _ from 'lodash';
import ImageList from "@mui/material/ImageList";

const BOOK_PER_PAGE = 20;


export default function Gallery(props) {
    const {books} = props;
    const [page, setPage] = React.useState(1);
    const bookChunks = _.chunk(books, BOOK_PER_PAGE);
    const pageCount = bookChunks.length;
    const handleChange = (event, value) => {
        setPage(value);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };
    if (bookChunks.length == 0) {
        return <Box/>
    }
    return (
        <Box>
            <ImageList sx={{
                gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr)) !important",
                gridAutoColumns: "minmax(240px, 1fr)",
                cols: 4,
                gap: 12,
                rowHeight: 400
            }}>
                {bookChunks[page-1].map(book => (
                    <BookCard key={book.uuid} book={book} />
                ))}
            </ImageList>
            <Pagination count={pageCount} page={page} onChange={handleChange} shape="rounded" />
        </Box>
    );
}