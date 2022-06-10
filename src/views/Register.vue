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
                            	<router-link :to="`/login`">
                            		<button class="login-headline color-black float-l btn-register btn-sm">
                            			<i class="fa fa-arrow-left"></i>
                            		</button>
                            	</router-link>
                                <h4 class="pt10 color-dark login-headline">{{ title }}</h4>
                                <small class="heading heading-solid center-block heading-width-100 border-light"></small>
                            </div>

                            <div class="p30">
                                <form @submit.prevent="register()">
                                	<p class="error" v-if="registerError || errors">
                                        {{ registerError }} {{errors}}
                                    </p>
                                	<div class="form-group">
                                        
                                        <input type="text" v-model="form.name" class="form-control" placeholder="Name">
                                     
                                    </div>
                                  
                                    <div class="form-group">
                                        
                                        <input type="email" v-model="form.email" class="form-control" placeholder="Email Address">
                                     
                                    </div>
                                   
                                    <div class="form-group ">
                                        
                                        <input type="number" v-model="form.mobile_number" class="form-control" placeholder="Mobile number">
                                        
                                    </div>
                                   
                                    <div class="form-group ">
                                        
                                        <input type="password" v-model="form.password" class="form-control" placeholder="Password" autocomplete="off">
                                        
                                    </div>

                                    <div class="form-group ">
                                        
                                        <input type="password" v-model="form.confirm_password" class="form-control" placeholder="Confirm Password">
                                        
                                    </div>
                                    
                                    <input type="submit" value="Register" class="button button-md bg-red color-white mb20 theme-background" style="width: 100%">
                                     
                                </form>
                                <div class="account-info text-center clearfix width-res">
                                    <h5 class="color-dark">
                                    	Already have an Account? Click to
                                        
                                        <router-link :to="`/login`">
                                        	<a :href="`/login`" class="float-r te-und-ho">Login</a>
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

<script>
	
	export default {
		name: "Register",
		data: () => {
			return {
                form: {
                    name: "",
		            email: "",
		            mobile_number: "",
		            password: "",
		            confirm_password: "",
                },
                errors: null,
                title: "Register"
            }
        },

        methods: {
        	register() {
        		if(this.valid()) {

        			this.$store.dispatch('Register');

        			register(this.$data.form)
	        			.then((res) => {
	        				this.$store.commit("RegisterSuccess", res);
	        				this.$router.push('/login');
	        			})	
	        			.catch((error) => {
	        				this.$store.commit("RegisterFailed", { error });
	        			})
        		}
        		
        	},
        	valid() { 
        		return this.form.password === this.form.confirm_password;
        	},
        },
        computed: {
            registerError() {
                return this.$store.getters.registerError;
            },
        },
	}
</script>

<style scoped>
	.btn-register {
		outline: none;
		border: none;
		background-color: #ffffff;
	}
	.btn-register:hover {
		background-color: #f2f2f2;
	}
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
</style>