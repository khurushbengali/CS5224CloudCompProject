import {ALL_SELECT_OPTION} from '../constants';
import _ from 'lodash'
import { faker } from '@faker-js/faker';

const DUMMY_URL = 'https://ic.od-cdn.com/resize?type=auto&url=%2FImageType-100%2F1523-1%2F%257BB240C268-9B32-4D56-A59D-DB07DF769865%257DIMG100.JPG&stripmeta=true&width=440'
const RANDOM_START_DATE = "2000-01-01"
const RANDOM_END_DATE = "2024-01-01"

function generateRandomBook(id) {
    const book = {
        id: id, 
        title: 'Book ' + id, 
        image: DUMMY_URL, 
        dateAdded: faker.date.between({"from": RANDOM_START_DATE, "end": RANDOM_END_DATE}),
        author: faker.person.fullName()
    }
    Object.entries(ALL_SELECT_OPTION).map(([cat, enums]) => (
        book[cat] = faker.helpers.arrayElement(enums)
    ))
    return book;
}

function fetchRandomBooks(nBooks) {
    const fetchedBooks = _.range(nBooks).map(generateRandomBook)
    return fetchedBooks
}

export function fetchAllBooks() {
    return fetchRandomBooks(13000)
}

export function getBookDetailInfo(id) {
    const book = generateRandomBook(id);
    book["description"] = faker.lorem.paragraph();
    return book;
}

export function getRecommendations(id) {
    return fetchRandomBooks(10);
}