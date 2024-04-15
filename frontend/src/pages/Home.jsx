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
import Header from '../components/Header';
import { ALL_SELECT_OPTION } from '../constants';
import { fetchAllBooks } from '../api/Api';

const LANGUAGE_SET = new Set(["eng", "chi", "may", "tam"])

function preprocessLanguage(languages) {
    const results = new Set();
    languages.split("|").forEach(l => {
        if (LANGUAGE_SET.has(l)) {
            results.add(l);
        } else {
            results.add("others");
        }
    })
    return [...results];
}

function preprocessType(type) {
    return type.match(/[\w\s]+/)[0].trim()
}

function preprocessBook(book) {
    book["language"] = preprocessLanguage(book["language"])
    book["type"] = preprocessType(book["type"])
}

function preprocessBooks(books) {
    books.map(preprocessBook)
}

function sortBy(books, sortOption) {
    var newBooks;
    if (sortOption == "Date Added") {
        newBooks = _.sortBy(books, "date_created");
    } else if (sortOption == "Latest") {
        newBooks = _.orderBy(books, "date_created", "desc");
    } else {
        newBooks = _.sortBy(books, "title");
    }
    return newBooks;
}

function filter(books, filterOptions) {
    return _.filter(books, filterBook(filterOptions));
}

const filterBook = (filterOptions) => book => {
    for (const [cat, enums] of Object.entries(filterOptions)) {
        if (cat == "language") {
            var foundLanguage = false
            for (var i = 0; i < enums.length; i++) {
                if (book[cat].includes(enums[i])) {
                    foundLanguage = true
                    break
                }
            }
            if (!foundLanguage) {
                return false
            }

        } else if (!enums.includes(book[cat])) {
            // console.log(cat, enums)
            return false
        }
    }
    return true
}

function getSelectOptions(books, dim) {
    return _.sortBy(_.toPairs(_.countBy(books, dim)), 1).reverse()
}

function getSelectOptionsExplodedDim(books, dim) {
    const dims = _.flatten(books.map(book => book[dim]))
    return _.sortBy(_.toPairs(_.countBy(dims)), 1).reverse()
}

function Home() {
    const DEFAULT_SORT_OPTION = 'Alphabetical'
    const [allBooks, setAllBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [sortOption, setSortOption] = useState(DEFAULT_SORT_OPTION);
    const [filterOptions, setFilterOptions] = useState(ALL_SELECT_OPTION);

    useEffect(() => {
        const callback = (fetchedBooks) => {
            preprocessBooks(fetchedBooks);
            setAllBooks(fetchedBooks);
            // const sets = getSelectOptions(fetchedBooks, "type")
            const sortedBooks = sortBy(fetchedBooks, DEFAULT_SORT_OPTION);
            setBooks(sortedBooks)
        }
        fetchAllBooks(callback);
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
            <Box>
                <Header drawerWidth={drawerWidth}/>
                <Box  sx={{ display: 'flex' }}>
                    <Box component="nav"
                        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                    <SideDrawer allFilterOptions={ALL_SELECT_OPTION} filterOptions={filterOptions} setFilterOptions={setFilterOptions} filterBooks={filterBooks}/>
                    </Box>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                    >
                    <Box display="flex" justifyContent="flex-end">
                        <SortingOptions sortOption={sortOption} setSortOption={setSortOption} onSort={sortBooks}/>
                    </Box>
                    <Toolbar />
                    <Gallery books={books} />
                    </Box>
                </Box>
            </Box>
    );
}

export default Home;