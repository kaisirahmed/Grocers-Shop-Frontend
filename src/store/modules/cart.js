import bnNum from 'bnnum';
import Axios from 'axios';
import { localCart } from '@/helpers/cart';

const cart = localCart();

export default {
	state: {
		cart: cart
	},
	getters: {
		getCartItem: state => { 
			return state.cart;
		},
		getCartItemCount: (state, getters, rootState, rootGetters) => {
			if(rootGetters['language'].lang == 'bn') {
				return bnNum(state.cart.length)
			} 
			return state.cart.length
		},
		getCartTotalPrice: (state, getters, rootState, rootGetters) => {
			
			console.log(state.cart);
			let total = 0;
			state.cart.forEach(item => {
				total += item.product.sale_price * item.quantity
			})
			console.log(rootGetters['language'])
			// if(rootGetters['language'].lang == 'bn') {
			// 	return bnNum(total)
			// }
			return parseFloat(total).toFixed(2)
		}	
	},
	actions: {
		addProductToCart: ({commit, dispatch}, {product, quantity}) => {
			commit("addToCart", { product, quantity });

			dispatch('addNotification', {
				type: 'success',
				message: 'Product added to cart successfully',
			}, {root:true});

			Axios.post('cart', {
				product_id: product.id,
				quantity: quantity
			})
			.then((response) => {
				return response.data;
			})
			.then((error) => {
				console.log(error)
			})
		},
		getCartItems: ({commit}) => { 
			 
			 
			//if(state.login.currentUser) {
			Axios.post('/getcart')
				 .then((response) => {
				 	return commit("SetCart", response.data);
				 })
			//}
		},
		removeProductFromCart: ({commit, dispatch}, product) => {
			commit("removeFromCart", product);

			dispatch('addNotification', {
				type: 'warning',
				message: 'Product removed from the cart successfully',
			}, {root:true});

			Axios.delete(`/cart/${product.id}`);
		},
		clearCartItems: ({commit, dispatch}) => {
			commit('ClearCartItems');

			dispatch('addNotification', {
				type: 'warning',
				message: 'Cart has been cleared successfully.',
			}, {root:true});

			Axios.delete('/cart');
		},
		incrementQuantity: ({commit}, cartItem) => {
			commit("IncrementItemQuantity", cartItem);

			Axios.post('/cart/update', {
				cart_id: cartItem.product.id,
				quantity: 1
			})
		},
		decrementQuantity: ({commit}, cartItem) => {
			commit("DecrementItemQuantity", cartItem);

			if (cartItem.quantity > 1) {
				Axios.post('/cart/update', {
					cart_id: cartItem.product.id,
					quantity: -1
				})
			}
		}
	},
	mutations: {
		addToCart: (state, {product, quantity}) => {

			let productInCart = state.cart.find(item => {
				return item.product.id === product.id;
			})

			if (productInCart) {
				productInCart.quantity += quantity;
				return;
			}

			state.cart.push({
				product,
				quantity
			}) 
			 
			localStorage.setItem("cartProducts", JSON.stringify(state.cart));
		},
		SetCart: (state, cartItems) => {  
			
			//console.log(cartItems.data);

			/******* Flatten Items***************/
			// for (var i = 1; i <= Object.keys(cartItems.data).length; i++) {
			// 	var cart = flatten(cartItems.data[i]);
			// 	cartItems.product = cart;
			// }

			state.cart = cartItems.data;
			localStorage.setItem("cartProducts", JSON.stringify(state.cart));
			console.log(cartItems);
		},
		IncrementItemQuantity: (state, cartItem) => { 
		    const cartProduct = state.cart.find(item => item.product.id === cartItem.product.id)
		    cartProduct.quantity++

		    localStorage.setItem("cartProducts", JSON.stringify(state.cart));
		},
		DecrementItemQuantity: (state, cartItem) => { 
		    const cartProduct = state.cart.find(item => item.product.id === cartItem.product.id)
		    console.log(cartItem)
		    if(cartProduct.quantity > 0) {
		    	cartProduct.quantity--
		    	if (cartProduct.quantity === 0) {
		    		state.cart = state.cart.filter(item => {
						return item.product.id !== cartItem.product.id;
					})
					Axios.delete(`/cart/${cartItem.product.id}`);
		    	}
		    }

		    localStorage.setItem("cartProducts", JSON.stringify(state.cart));
		},
		removeFromCart: (state, product) => {
			state.cart = state.cart.filter(item => {
				return item.product.id !== product.id;
			})
			localStorage.setItem("cartProducts", JSON.stringify(state.cart));
		},
		ClearCartItems: state => {
			state.cart = [];
			localStorage.setItem("cartProducts", JSON.stringify(state.cart));
		}
	}
}

