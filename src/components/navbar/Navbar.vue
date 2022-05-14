<template>
	
	<header class="header theme-background">
        <div class="container-fluid">
            <div class="row">
                <div class="left-menu-toggle">
                    <a id="sidebarCollapse" href="#" class="toggle-nav btn-nav nav-toggle-btn">
                        <i class="lni-menu"></i>
                    </a>
                </div>
                <div class="logo-img">
                    <div class="logo">
                        <router-link class="navbar-brand" :to="`/`">
                            <a href="#">
                                <img width="100%" src="assets/images/logo/grocer.png" alt="logo" class="img-fluid">
                            </a>
                        </router-link>
                    </div>
                </div>
              <!-- for mobile  -->
                <div class="d-sm-none d-md-none d-lg-none col col-lg-3 col-sm-3 text-center">
                    <div class="user-menu">
                        <a href="#">
                            <i class="lni lni-user" style="font-size: 20px"></i>
                        </a>
                        <ul class="dropdown-menu1">
                            <li>
                                <a href="#">
                                    <span>Login</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span>Sign up</span>
                                </a>
                            </li>                            
                            <li>
                                <a href="#">Track Order</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- end mobile profile  -->
                <div class="col-12 col-lg-6 col-sm-6">
                    <div id="searchBox" class="search">
                        <div class="input-box" v-if="language.lang == 'en'">
                            <input name="key" placeholder="Search for products.(e.g. Potato, Onion, milk)" type="text" class="single-input">
                        </div>
                        <div class="input-box" v-else>
                            <input name="key" placeholder="পণ্য খোঁজ করতে চাইলে (যেমন, আলু, পিয়াজ, দুধ, )" type="text" class="single-input">
                        </div>
                    </div>
                </div>
                <div class="d-none d-sm-block col-3 col-lg-4 col-sm-4 text-center">
                    <div class="multi-lang">
                        <div class="localeSwitch area hidden-sm hidden-xs text-center">
                            <p @click="localENLang('en')">EN&nbsp;</p>
                            <p class="divider">|</p>
                            <p @click="localBNLang('bn')">&nbsp;বাং</p>
                        </div>
                    </div>

                        <template v-if="!currentUser">

                            <router-link :to="`/login`">
                                <div class="user-menu bg-red">
                                    <a href="javascript:;">Sign in</a>
                                </div>
                            </router-link>
                        </template> 
                    
                        <template v-else>
                            <div class="user-menu bg-red">
                                <a href="#">
                                    <span v-text="currentUser.name"></span>
                                </a>
                                <ul class="dropdown-menu1">
                                    <li>
                                        <router-link :to="`/profile`">
                                            Your Profile
                                        </router-link>
                                    </li>   
                                    <li>
                                        <router-link :to="`/orders`">
                                        Your Orders
                                        </router-link>    
                                    </li>
                                    <li><a href="javascript:;">Payment History</a></li>
                                  
                                    <li><a href="javascript:;">Change Password</a></li>
                                    <li>
                                        <a href="javascript:;" @click.prevent="logout">Logout</a>
                                    </li>
                                    
                                </ul>
                            </div>
                        </template>
                </div>

                <Cart></Cart>
                
            </div>
        </div>
    </header>

</template>

<script>

    import Cart from '@/components/cart/Cart.vue';

    export default {
        name: 'Navbar',
        components: {
            Cart
        },
        data() {
            return {
                lang: 'en',
                classLangEn: null,
                classLangBn: null
            }
        },
        created() {

            if (this.$store.getters.language.lang == null) {
                localStorage.setItem("localLang", JSON.stringify({lang: this.lang}));
            }
            
            if(this.$store.getters.language.lang == 'bn') {
                this.classLangBn == 'active';
            } else {
                this.classLangEn == 'active';
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
                this.$router.push('/login');
            },
            localENLang(en) { 
                if(en) { 
                    this.$store.commit("LangEn", {lang: en });
                }
            },
            localBNLang(bn) {
                if (bn) { 
                    this.$store.commit("LangBn", {lang: bn });
                }
            }
        },
        computed: {
            currentUser() { 
                return this.$store.getters.currentUser
            },
            language() {
                return this.$store.getters.language
            }
        }
    }
</script>
<style scoped>
    .active{
        color: orange
    }
</style>