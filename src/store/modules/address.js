import { newAddressUser } from '@/helpers/address';
import Axios from 'axios';

const address = newAddressUser();

export default {
    state: {
		addressUser: address,
        addressError: null
 	},
	getters: {
	 	addressUser: state => {
            return state.addressUser;
        },
        authError(state) {
            return state.auth_error;
        },
    },
    actions: {
		getAddress: ({commit, rootGetters}) => { 
            if(rootGetters['isLoggedIn']) {
                Axios.get('/address')
                .then((response) => {
                    commit("SetAddress", response.data);
                })
                .catch((error) => {
                    console.log(error)
                })
			}
		},
        deleteAddress: ({commit, dispatch}, address) => { 
            commit("DeleteAddress", address);
            Axios.delete(`/address`, { 
                params: {
                    'address_id': address.id
                }
            })
            .then((response) => {
                dispatch('addNotification', {
                    type: response.data.type,
                    message: response.data.message,
                }, {root:true});
            })
            .catch((error) => {
                dispatch('addNotification', {
                    type: error.data.type,
                    message: error.data.message,
                }, {root:true});
            });
        }
	},
	mutations: {
		SetAddress: (state, payload) => {
            state.addressError = null;  
            state.addressUser = payload.data;

            localStorage.setItem("addressUser", JSON.stringify(state.addressUser))
        },
        addressFailed: (state, payload) => {
            state.addressError = payload.error.data.errors;
        },
        DeleteAddress: (state, address) => {
            state.addressUser = state.addressUser.filter(findAddress => { 
                return findAddress.id !== address.id;
            });
            localStorage.setItem("addressUser", JSON.stringify(state.addressUser))
        }
    },
}