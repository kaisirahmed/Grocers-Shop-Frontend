<template>
	<section class="signin-form">
        <div class="bg-overlay pt50 pb50">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-sm-12">
                        <div class="form bg-white bg-shadow">
                        	<div class="d-flex justify-content-center">
								<div class="brand_logo_container">
									<img src="logo.png" class="brand_logo" alt="Logo">
								</div>
							</div>
                            <div class="heading text-center clearfix">
                            	
                                <h4 class="pt10 color-dark login-headline">
                                    <template v-if="language.lang == 'bn'">
                                        {{ titleBn }}
                                    </template>
                                    <template v-else>
                                        {{ title }}
                                    </template>
                                </h4>
                                <small class="heading heading-solid center-block heading-width-100 border-light"></small>
                            </div>

                            <div class="p30">
                            	<!-- <div class="col-md-12" v-if="registerMessage">
                            		<p class="success">
                            			{{ registerMessage }}
                            		</p>
                            	</div> -->
                                <div class="col-md-12" v-if="authError">
                                    <p class="error">
                                        {{ authError }}
                                    </p>
                                </div>      
                                <form @submit.prevent="authenticate()">
                                    
                                    <div class="form-group">
                                        
                                        <input type="email" v-model="form.email" class="form-control" placeholder="Email Address">
                                     
                                    </div>
                                    <div class="form-group ">
                                        
                                        <input type="password" v-model="form.password" class="form-control" placeholder="Password">
                                        
                                    </div>
                                    
                                    <input type="submit" value="Login" class="button button-md bg-red color-white mb20 theme-background" style="width: 100%">
                                     
                                </form>

                                <div class="account-info text-center clearfix width-res">
                                    <h5 class="color-dark">
                                        <a class="float-l te-und-ho" href="password/reset.html">Forget Password?</a>
                                        <router-link :to="`/register`">
                                        	<a :href="`/register`" class="float-r te-und-ho">Create Account</a>
                                        </router-link>
                                    </h5>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script type="text/javascript">

	import { login } from '@/helpers/auth';

	export default {
	  	name: "Login",
	  	data: () => {
            return {
                form: {
                    email: '',
                    password: ''
                },
                error: null,
                title: "Login",
                titleBn: "লগইন"
            }
        },

        methods: {
            authenticate() {
                this.$store.dispatch('login');
                this.$store.dispatch('loading', true);
                login(this.$data.form)
                    .then((res) => {
                        this.$store.commit("loginSuccess", res);
                        this.$store.dispatch('loading', false);
                        this.$router.push({ path: '/' });
                    })
                    .catch((error) => {
                        this.$store.commit("loginFailed", { error });
                        this.$store.dispatch('loading', false);
                    })
            }
        },
        
        computed: {
            authError() {
                return this.$store.getters.authError;
            },
            registerMessage() {
            	return this.$store.getters.registerUser.message;
            },
            language() {
                return this.$store.getters.language
            }
        }
	}
</script>
<style scoped>
	.brand_logo_container {
		position: absolute;
		top: -20px;
		border-radius: 50%;
		text-align: center;
	}
	.brand_logo {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		border: 4px solid white;
	}
	.error {
		color: red;
		font-size: 14px;
	}
	.success {
		color: green;
		font-size: 15px;
	}
</style>