import Axios from 'axios';
import { localSubCategories } from '@/helpers/categoryProduct';
import { localParentCategory } from '@/helpers/categoryProduct';

const subcategories = localSubCategories();
const parentcategory = localParentCategory();

export default {
	state: {
		subcategories: subcategories,
		parentcategory: parentcategory
	},
	getters: {
		subcategories: state => {
			return state.subcategories;
		},
		parentcategory: state => {
			return state.parentcategory;
		}
	},
	actions: {
		getCategoryProducts: ({commit, dispatch}, route)  => {
			dispatch('loading', true);
			
            Axios.get(`/category/${route}/products`)
            .then((response) => {
                dispatch('loading', false);
                commit("SubCategories", response.data);                
                commit("ParentCategories", response.data.pcat);
            })
            .catch((error) => {
                console.log(error);
                dispatch('loading', false);
            });
               

		}
	},
	mutations: {
		SubCategories: (state, subcategories) => {
			state.subcategories = subcategories;
			localStorage.setItem("subcategories", JSON.stringify(state.subcategories));
		},
		ParentCategories: (state, parentcategory) => {

			state.parentcategory = parentcategory;
			localStorage.setItem("parentcategory", JSON.stringify(state.parentcategory));
		}
	}	
}