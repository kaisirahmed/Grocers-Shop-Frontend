import { getLocalUser } from '@/helpers/auth';
import Axios from 'axios';

const user = getLocalUser();

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        auth_error: null,
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        currentUser(state) {
            return state.currentUser;
        },
    },
    actions: {
        login: context => { 
            context.commit("Login");
        },
        logout: context => {
            context.commit("Logout");
            Axios.post('/logout')
                 .then((response) => {
                    //context.commit("Logout");
                    console.log(response.data);
                 })
                 .catch((error) => {
                    console.log(error);
                 })
        }
    },
    mutations: {
        Login(state) {
            state.auth_error = null;
        },
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.currentUser = Object.assign({}, payload.data.user, { token: payload.data.access_token }, { message: payload.message});
            Axios.defaults.headers.common["Authorization"] = `Bearer ${state.currentUser.token}`;
            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.auth_error = payload.error.data.errors.email[0];
        },
        Logout(state) {
            state.isLoggedIn = false;
            state.currentUser = null;
            localStorage.removeItem("user");
        }
    },
}