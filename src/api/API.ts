import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const baseAPI = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

const tokenAPI = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export { tokenAPI, baseAPI };