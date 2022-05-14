import Axios from 'axios';

export default {
	state: {
		verifiedMessage: null,
	},
	getters: {
		verifiedMessage: state => {
			return state.verifiedMessage;
		}
	},
	actions: {
		verify: ({commit, dispatch}, query) => {
			 
			dispatch('loading', true);

			Axios.post('/email/verify', {
					user_id: query.customerGID,
					expired_at: query.expired,
					signature: query.signatureGEV
				})
				.then((response) => {
					console.log(response.data)
					dispatch('loading', false);
					commit("Verified", response.data);
				})
				.catch((error) => {
					console.log(error.data)
					dispatch('loading', false);
					commit("InvalidVerification", error)
				})
		}
	},
	mutations: {
		Verified: (state, verify) => {
			state.verifiedMessage = verify.message;
		},
		InvalidVerification: (state, error) => {
			state.verifiedMessage = error.message
		}
	}
}