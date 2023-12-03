import axios from 'axios';

export const api = axios.create({
    baseURL: "https://fullstack-challenge-backend.onrender.com"
})