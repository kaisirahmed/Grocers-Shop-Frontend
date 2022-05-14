import Axios from 'axios';

export function login(credentials) {
    return new Promise((res,rej) => {
        Axios.post('/login', credentials)
            .then((response) => {
                res(response.data);
            })
            .catch((error) => { 
                rej(error.response);
            })
    })
}

export function register(credentials) {
    return new Promise((res,rej) => {
        Axios.post('/register', credentials)
             .then((response) => {
                res(response.data);
             })
             .catch((error) => {
                rej(error.response);
             })
    })
}

export function newLocalUser() {
    const newUserStr = localStorage.getItem("newUser");

    if(!newUserStr) {
        return null;
    }

    return JSON.parse(newUserStr);
}

export function getLocalUser() {
    const userStr = localStorage.getItem("user");

    if(!userStr) {
        return null;
    }

    return JSON.parse(userStr);
}
