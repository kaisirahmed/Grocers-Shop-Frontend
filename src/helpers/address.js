import { getLocalUser } from './auth';
import Axios from 'axios';

const currentUser = getLocalUser();

export function address(credentials) {
    
    credentials = Object.assign({}, credentials, {user_id: currentUser.id})

    return new Promise((res,rej) => {
        Axios.post('/address', credentials)
             .then((response) => {
                res(response.data);
             })
             .catch((error) => {
                rej(error.response);
             })
    })
}

export function addressDefault(credentials) {
    
    credentials = Object.assign({}, credentials, {user_id: currentUser.id})

    return new Promise((res,rej) => {
        Axios.post(`address/default`,credentials)
            .then((response) => {
                res(response.data)
            })
            .catch((error) => {
                rej(error.response);
            })
    })
}

export function addressUpdate(credentials) {
    
    credentials = Object.assign({}, credentials, {user_id: currentUser.id})

    return new Promise((res,rej) => {
        Axios.post(`address/edit`,credentials)
            .then((response) => {
                res(response.data)
            })
            .catch((error) => {
                rej(error.response);
            })
    })
}

export function newAddressUser() { 
    const newAddressUser = localStorage.getItem("addressUser");

    if(!newAddressUser) {
        return null;
    } 
    return JSON.parse(newAddressUser);
}
