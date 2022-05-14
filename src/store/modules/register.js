import { newLocalUser } from '@/helpers/auth';

const newUser = newLocalUser();

export default {
	state: {
		registerUser: newUser,
		register_error: null,
	},
	getters: {
		registerUser(state) {
			return state.registerUser;
		},
		registerError(state) {
			return state.register_error;
		}
	},
	mutations: {
		Register(state) {
			state.register_error = null;
		},
		RegisterSuccess(state, payload) {
			state.register_error = null;
            state.registerUser = Object.assign({}, payload.data.user, { token: payload.data.access_token }, { message: payload.message });

            localStorage.setItem("newUser", JSON.stringify(state.registerUser));
		},
		RegisterFailed(state, payload) {
			state.register_error = Object.assign({}, payload.error.data.errors);
		}
	},
	actions: {
		Register(context) {
			context.commit("Register");
		}
	}
}