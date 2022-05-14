import { localLang } from '@/helpers/lang';

const lang = localLang();
//console.log(lang);
export default {
	state: {
		language: lang
	},
	getters: {
		language: state => {
			return state.language;
		} 
	},
	mutations: {
		LangEn: (state, payload) => { 
			state.language = Object.assign({}, payload );
			//console.log(state.language);
			localStorage.setItem("localLang", JSON.stringify(state.language));
			
		},
		LangBn: (state, payload) => { 
			state.language = Object.assign({}, payload );
			localStorage.setItem("localLang", JSON.stringify(state.language));
		}
	},
	actions: {
		
	}
}