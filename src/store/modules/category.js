import Axios from 'axios';
import { localCategories } from '@/helpers/category';

const categories = localCategories();

export default {
	state: {
		categories: categories
	},
	getters: {
		categories(state) {
			return state.categories;
		}
	},
	actions: {
		getCategories({commit, dispatch }) { 
			dispatch('getAddress', true);
			Axios.get('/categories')
	            .then((response) => {
			    commit("Categories", response.data);
	            })
	            .catch((error) => { 
	                console.log(error);
	            })
		}
	},
	mutations: {
		Categories(state, payload) {
			state.categories = payload.data;
			localStorage.setItem("categories", JSON.stringify(state.categories));
		}
	}
}