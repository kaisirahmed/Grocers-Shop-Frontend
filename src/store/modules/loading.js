export default {
	state: {
		loading: false
	},
	getters: {
		getLoading: state => {
			return state.loading;
		}
	},
	actions: {
		loading: ({commit}, payload) => {
			commit("SetLoading", payload);
		}
	},
	mutations: {
		SetLoading: (state, payload) => {
			state.loading = payload;
		}
	}
}