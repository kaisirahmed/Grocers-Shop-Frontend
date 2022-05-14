import Axios from 'axios';
import { localOrders } from '@/helpers/orders';

const orders = localOrders();

export default {
    state: {
        orders: orders,
        //orderProducts: []
    },
    getters: {
        allOrders(state) {
            return state.orders;
        },
        // orderProducts(state) {
        //     return state.orderProducts;
        // }
    },
    actions: {
        orders: ({commit}, state) => { console.log(state);
            Axios.post(`/orders`)
                .then((response) => { console.log(response.data)
                    commit("setOrders", response.data);
                }) 
                .catch((error) => {
                    console.log(error);
                }) 
        },

        // productsOrder:({commit, dispatch},payload) => {

        //     dispatch('loading', true);
        //     Axios.post(`/product/orders`,payload)
        //         .then((response) => {console.log(commit);
        //             dispatch('loading', false);
        //             commit('setProductOrders', response.data);
        //             console.log(response.data)
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         })

            
        // }

    },
    mutations: {
        setOrders: (state, orders) => { console.log(orders);
            state.orders = orders.data;
            localStorage.setItem("localOrders", JSON.stringify(state.orders));
        },
        // setProductOrders: (state, orders) => { console.log(orders);
        //     state.orderProducts = orders.data;
        // }
    }
}