import { createStore } from "vuex";
import Login from './modules/login.js';
import Register from './modules/register.js';
import Category from './modules/category.js';
import Product from './modules/categoryProducts.js';
import Language from './modules/lang.js';
import Cart from './modules/cart.js';
import Address from './modules/address.js';
import Notifications from './modules/notifications.js';
import Loading from './modules/loading.js';
import Verify from './modules/verify.js';
import Checkout from './modules/checkout.js';
import Orders from './modules/orders.js';

export default createStore({
    modules: {
    	login: Login,
    	register: Register,
    	category: Category,
    	product: Product,
    	language: Language,
    	cart: Cart,
    	address: Address,
    	notificatons: Notifications,
        loading: Loading,
        verify: Verify,
        checkout: Checkout,
		orders: Orders
    }
});
