import Axios from 'axios';

export function checkout(credentials) {

    return new Promise((res,rej) => {
        Axios.post('/checkout', credentials)
             .then((response) => {
                res(response.data); 
                
             })
             .catch((error) => {
                rej(error.response);
             })
    })
}