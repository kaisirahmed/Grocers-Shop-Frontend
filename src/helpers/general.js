import Axios from 'axios';

export function initialize(store, router) {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(racord => racord.meta.requiresAuth);
        const currentUser = store.state.login.currentUser;
        if(requiresAuth && !currentUser) {
          next('/login');          
        } else if((to.path == '/login' || to.path == '/register') && currentUser) {
          next('/');
        } else {
          next();
        }
    });
    // Add a request interceptor
    Axios.interceptors.request.use(function (config) {
      //store.dispatch("loading", true);
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
 
    Axios.interceptors.response.use(null, (error) => {
     // console.log(error.response.status);
      if (error.response.status == 401) {
          store.dispatch('logout');
          router.push('/login');
      }
      return Promise.reject(error);
    });

    if (store.getters.currentUser) {
        setAuthorization(store.getters.currentUser.token);
    }
}

export function setAuthorization(token) { 
  Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}