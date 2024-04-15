import _ from 'lodash'

const API_URL = import.meta.env.VITE_API_URL
const BOOKS_URL = API_URL + "books"
const BOOK_INFO_URL = API_URL + "book-info?uuid="
const RECOMMEND_URL = API_URL + "recommendations?uuid="

export function fetchAllBooks(callback) {
    return fetch(BOOKS_URL)
        .then(response => response.json())
        .then(json => callback(json))
        .catch(error => console.log(error));
}

export function getBookDetailInfo(uuid, callback) {
    return fetch(BOOK_INFO_URL + uuid)
        .then(response => response.json())
        .then(json => callback(json))
        .catch(error => console.log(error));
}

export function getRecommendations(uuid, callback) {
    return fetch(RECOMMEND_URL + uuid)
        .then(response => response.json())
        .then(json => callback(json))
        .catch(error => console.log(error));
}