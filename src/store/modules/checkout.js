
export default {
	state: {
		deliveryCost: null
	},
	getters: {
		deliveryCost: (state, getters, rootState, rootGetters) => {
			if(rootGetters["getCartTotalPrice"] > 400) {
				return state.deliveryCost = 9;
			} else if(rootGetters["getCartTotalPrice"] < 400 && rootGetters["getCartTotalPrice"] > 0) {
				return state.deliveryCost = 19;
			} else {
				return state.deliveryCost = 0;
			}
		}
	},
	actions: {
		
	},
	mutations: {
		
	}
}