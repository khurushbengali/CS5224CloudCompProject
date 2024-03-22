import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import SideDrawer from '../components/Drawer'
import _ from 'lodash'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Container } from '@mui/material';
import SortingOptions from '../components/SortingOptions';
import Gallery from '../components/Gallery';

function getRandomDateAsString(startDate, endDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const randomTime = start + Math.random() * (end - start);
    const randomDate = new Date(randomTime);

    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const day = String(randomDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getRandomDateFromChoices(choices) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function sortBy(books, sortOption) {
    var newBooks;
    if (sortOption == "Date Added") {
        newBooks = _.sortBy(books, "dateAdded");
    } else if (sortOption == "Latest") {
        newBooks = _.orderBy(books, "dateAdded", "desc");
    } else {
        newBooks = _.sortBy(books, "name");
    }
    return newBooks;
}

function filter(books, filterOptions) {
    return _.filter(books, filterBook(filterOptions));
}

const filterBook = (filterOptions) => book => {
    for (const [cat, enums] of Object.entries(filterOptions)) {
        if (!enums.includes(book[cat])) {
            return false
        }
    }
    return true
}

function Home() {
    const DEFAULT_SORT_OPTION = 'Alphabetical'
    const ALL_SELECT_OPTION = {
        "Language": [
            "cn",
            "en",
            "th"
        ],
        "Category": [
            "education",
            "encyclopedia",
            "news",
            "magazine"
        ],
        "Level": [
            "Primary",
            "Secondary"
        ]
    }
  // Mock data for books
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [sortOption, setSortOption] = useState(DEFAULT_SORT_OPTION);
  const [filterOptions, setFilterOptions] = useState(ALL_SELECT_OPTION);

  useEffect(() => {
    // Fetch books data from an API or database
    // For now, let's use static data
    const dummyUrl = 'https://ic.od-cdn.com/resize?type=auto&url=%2FImageType-100%2F1523-1%2F%257BB240C268-9B32-4D56-A59D-DB07DF769865%257DIMG100.JPG&stripmeta=true&width=440'
    const nBooks = 13000
    const randomStartDate = "2000-01-01"
    const randomEndDate = "2024-01-01"
    const fetchedBooks = _.range(nBooks).map(x => {
        const book = {
            id: x, 
            title: 'Book ' + x, 
            image: dummyUrl, 
            dateAdded: getRandomDateAsString(randomStartDate, randomEndDate)
        }
        Object.entries(ALL_SELECT_OPTION).map(([cat, enums]) => (
            book[cat] = getRandomDateFromChoices(enums)
        ))
        return book;
        })
    setAllBooks(fetchedBooks);
    const sortedBooks = sortBy(fetchedBooks, DEFAULT_SORT_OPTION);
    setBooks(sortedBooks)
  }, []);
  const drawerWidth = 240;

  const reconstructBooks = (sortOption, filterOptions) => {
    var newBooks = filter(allBooks, filterOptions);
    newBooks = sortBy(newBooks, sortOption);
    setBooks(newBooks);
  }

  const sortBooks = (sortOption) => {
    reconstructBooks(sortOption, filterOptions);
  }

  const filterBooks = (filterOptions) => {
    reconstructBooks(sortOption, filterOptions);
  }

  return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                <Typography variant="h6" noWrap component="div">
                Book Recommender System
                </Typography>
                </Toolbar>
            </AppBar>
            <Box component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
            <SideDrawer allFilterOptions={ALL_SELECT_OPTION} filterOptions={filterOptions} setFilterOptions={setFilterOptions} filterBooks={filterBooks}/>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
            <Toolbar />
            <Box display="flex" justifyContent="flex-end">
                <SortingOptions sortOption={sortOption} setSortOption={setSortOption} onSort={sortBooks}/>
            </Box>
            <Toolbar />
            <Gallery books={books} />
            </Box>
        </Box>
  );
}

export default Home;