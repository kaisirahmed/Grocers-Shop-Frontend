import { createRouter, createWebHistory } from "vue-router";
import store from "../store/modules/cart.js";

const routes = [
  {
    path: "/",
    component: () => import(/*webpackChunkName: "grocers" */ "@/views/Grocers.vue"),
    meta: { 
      title: 'Grocers | The biggest online shop | Online Grocery Shop',
      requiresAuth: false 
    },
    children: [
        // UserHome will be rendered inside User's <router-view>
        { 
          path: '', 
          component: () => import(/*webpackChunkName: "home" */ "@/views/Home.vue") 
        },
        { 
          path: '/login', 
          component: () => import(/*webpackChunkName: "login" */ "@/views/Login.vue"), 
          meta: { 
            title: 'Login | Grocers | The biggest online shop',
          }
        },
        { 
          path: '/register', 
          component: () => import(/*webpackChunkName: "register" */ "@/views/Register.vue"), 
          meta: { 
            title: 'Register | Grocers | The biggest online shop' 
          }
        },
        { 
          path: '/profile', 
          component: () => import(/*webpackChunkName: "profile" */ "@/views/Profile.vue"), 
          meta: { 
            title: 'Profile | Grocers | The biggest online shop',
            requiresAuth: true 
          }
        },
        {
          path: '/email-confirm',
          component:() => import( /*webpackChunkName: "verify" */ "@/components/verification/Verify.vue"),
          meta: {
            title: 'Verified | Grocers | The biggest online shop'
          }
        },
        {
          path: ':slug',
          component: () => import(/*webpackChunkName: "products" */ "@/components/products/Products.vue"),
          meta: {
            title: ":slug",
          }
        },
        {
          path: '/checkout',
          component: () => import(/*webpackChunkName: "checkout" */ "@/components/checkout/Checkout.vue"),
          meta: {
            title: 'Chekout | Grocers | The biggest online shop',
            requiresAuth: true
          },
          beforeEnter: (to, from, next) => {
                if(store.getters.getCartItemCount) {
                    next();
                } else {
                    next('/');
                }
            }
        },
        { 
          path: '/orders', 
          component: () => import(/*webpackChunkName: "profile" */ "@/views/Orders.vue"), 
          meta: { 
            title: 'Your Orders | Grocers | The biggest online shop',
            requiresAuth: true 
          }
        },
    ]
  },
  // {
  //   path :'/:catchAll(.*)',
  //   component:() => import(webpackChunkName: "not-found"  "@/views/PageNotFound.vue"),
  //   meta: {
  //     title: 'Page Not Found'
  //   }
  // },
  // {
  //   path: '/verified/confirm',
  //   component:() => import(webpackChunkName: "verified"  "@/views/Verified.vue"),
  //   meta: {
  //     title: 'Verified'
  //   }
  // }
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  saveScrollPosition: true,
  routes
});


router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  setTimeout(() => {
      window.scrollTo(0, 0);
  }, 0);

  next();
});

export default router;
