import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BookCard from './BookCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import _ from 'lodash';

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
            <Grid container spacing={2}>
                {bookChunks[page-1].map(book => (
                    <Grid item key={book.id} xs={6} md={3} >
                        <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>
            <Pagination count={pageCount} page={page} onChange={handleChange} shape="rounded" />
        </Box>
    );
}