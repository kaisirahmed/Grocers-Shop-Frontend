<template>
	<div id="hidden_right" class="sidebar_right">

	    <div class="sidebar_right_inner" @click="closeCartDrawer">
	        <a href="javascript:;" class="sidebar_right_close theme-hover-bg"><i class="lni lni-close"></i></a>
	        
	    </div> 
	    <Modal 
		v-show="isModalVisible"
		@close="closeModal">
			<template v-slot:header>
	            Policy Info
	        </template>
			<template v-slot:body>
				<section class="helpBody">
					<h3 class="text-center" style="color: green;">What is your delivery charge policy? </h3>
					<div class="policy-description">
						<span>We charge ৳ 19 delivery fee for all orders below ৳ 400, and ৳ 9 delivery fee for all other orders.</span>
						<span>1. ৳ 9 fee on orders of ৳ 400 and above.</span>
						<span>2. ৳ 19 fee applicable for all orders below ৳ 400.</span>
						<span>3. ৳ 59 fee applicable for 15 minutes delivery</span>
					</div>
				</section>
			</template>
		</Modal>
	    <div class="slider_right_content cart-total ">
	        <h2>My bag(<span class="cart-pro-count">{{ cartItemCount }}</span>)
	        <button class="info-cart" @click="policyInfo"><i class="lni lni-information"></i></button></h2>
	        <div class="cart-body">
	            <ul class="slider_right_product">

	                <span class="shipping-discount theme-background">Shop $1500.00 more and save $20</span>
	               		<div class="cart-section">
	               			<template v-if="cartItemCount">
		                	<div class="cart-item">
		                		<table class="table-responsive mt-2">
		                			<tbody>
		                				<template v-if="language.lang == 'bn'">
		                				<tr v-for="item in cart" :key="item.product.id">
		                					<td>
		                						<i title="Remove one" class="lni lni-minus" @click.prevent="decrementQuantity(item)"></i>
		                						<strong> {{ item.quantity }} </strong>
		                						<i title="Add one more" class="lni lni-plus" @click.prevent="incrementQuantity(item)"></i> 
		                					</td> 
		                					<td>
		                						<img width="50" alt="product-image" class="img-fluid" :src="'data:image/'+item.product.image_type+';base64,'+item.product.image">
		                					</td> 
		                					<td>
		                						<span class="title">{{ item.product.name_bn }}</span> <br>
			                          			<span class="price mr-2">৳{{ item.product.sale_price_bn }}</span> 
			                          			<span class="price discount-price">৳{{ item.product.price_bn }}</span>
			                          		</td> 
			                          		<td>
			                        			৳{{ item.quantity * item.product.sale_price }}
		                      				</td> 
		                      				<td>
		                      					<a href="javascript:;" @click.prevent="removeProductFromCart(item.product)"><i class="lni lni-close theme-hover-color"></i></a>
		                      				</td>
		                      			</tr>
		                      			</template>
		                      			<template v-else>
		                      				<tr v-for="item in cart" :key="item.product.id">
		                					<td>
		                						<i title="Remove one" class="lni lni-minus" @click.prevent="decrementQuantity(item)"></i>
		                						<strong> {{ item.quantity }} </strong>
		                						<i title="Add one more" class="lni lni-plus" @click.prevent="incrementQuantity(item)"></i> 
		                					</td> 
		                					<td>
		                						<img width="50" alt="product-image" class="img-fluid" :src="'data:image/'+item.product.image_type+';base64,'+item.product.image">
		                					</td> 
		                					<td>
		                						<span class="title">{{ item.product.name }}</span> <br>
			                          			<span class="price mr-2">৳{{ parseFloat(item.product.sale_price).toFixed(2) }}</span> 
			                          			<span class="price discount-price">৳{{ parseFloat(item.product.price).toFixed(2) }}</span>
			                          		</td> 
			                          		<td>
			                        			৳{{ parseFloat(item.quantity * item.product.sale_price).toFixed(2) }}
		                      				</td> 
		                      				<td>
		                      					<a href="javascript:;" @click.prevent="removeProductFromCart(item.product)">
		                      						<i class="lni lni-close theme-hover-color"></i>
		                      					</a>
		                      				</td>
		                      			</tr>
		                      			</template>
		                      		</tbody>
		                      	</table>
		                	</div>
		                	</template>
		                	<template v-else>
		                	<div class="cart-empty">
			                    <div class="icon">
			                        <i class="lni lni-shopping-basket theme-color"></i>
			                    </div> 
			                    <span>Your shopping bag is empty. Start shopping now.</span>
			                </div>
			                </template>
			            </div>
	            </ul>
	        </div>
	        <template v-if="cartItemCount">
		        <div class="slider-right__money checkout-area">
		        	<div class="p10">
			        	<span>Subtotal: </span> 
			        	<strong class="float-right">
			        		<span class="woocommerce-Price-amount amount">
			        			<span class="woocommerce-Price-currencySymbol">৳&nbsp;
			        			{{ cartTotalPrice }}</span>
			        		</span>
			        	</strong>
		        	</div>
		        	<div class="p1">
		        		<router-link to="/checkout" class="slider_right_order theme-background">	Checkout
			        	</router-link>
			        	<a href="javascript:;" class="slider_right_order clear-cart-btn" @click.prevent="clearCartItems()" v-if="cartItemCount">Clear Cart</a>
		        	</div> 
		        </div>
	        </template>
	    </div>
	</div>

	<div class="cart-right d-none d-sm-block d-md-block d-lg-block d-xl-block" @click="openCartDrawer">
	    <a class="sidebar_right_cart theme-background">
	        <i class="lni lni-shopping-basket"></i>
	        	<span>&nbsp;{{ cartItemCount }} Items
	    	</span> 
	        <div class="cart-count custom-cart-total">
	            <span class="cart-text"></span> 
	            <span class="cart_count theme-color" >
	            	৳&nbsp;<span>{{ cartTotalPrice }}</span>
	            </span>
	        </div>
	    </a>
	</div>

	<div class="sidebar_right_js_open">
	    
	    <div class="container-fluid cart-bottom d-sm-none d-md-none d-lg-none d-xl-none">
	        <div class="row" @click.prevent="openCartDrawer">
	            <div class="col-3 no-padding text-center">
	                <a href="" class="price-bottom theme-color cart-open sidebar_right_cart">৳&nbsp;<span>{{ cartTotalPrice }}</span></a>
	            </div> 
	            <div class="col-6 no-padding">
	                <a href="javascript:;" class="button button-md theme-background color-white btn-block sidebar_right_cart">View Cart</a>
	            </div> 
	            <div class="col-3 no-padding text-center">
	                <a title="cart open" href="" class="button button-md btn-block bg-white cart-open sidebar_right_cart"><i class="lni lni-shopping-basket"></i> <span class="badge theme-background color-white">{{ cartItemCount }}</span></a>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>	

	export default {
		name: "Cart",
		data() {
			return {
				isModalVisible: false
			}
		},
		methods: {
			openCartDrawer() {
				this.toggleBodyClass('addClass', 'sidebar_right_js_open');
			},
			closeCartDrawer() {
				this.toggleBodyClass('removeClass', 'sidebar_right_js_open');
			},
			toggleBodyClass(addRemoveClass, className) {
			    const el = document.body;

			    if (addRemoveClass === 'addClass') {
			      el.classList.add(className);
			    } else {
			      el.classList.remove(className);
			    }
			},
			removeProductFromCart(product) {
				this.$store.dispatch("removeProductFromCart", product);
			},
			clearCartItems() {
				this.$store.dispatch('clearCartItems');
			},
			incrementQuantity(cartItem) {
				this.$store.dispatch("incrementQuantity", cartItem);
			},
			decrementQuantity(cartItem) {
				this.$store.dispatch("decrementQuantity", cartItem);
			},
			policyInfo() {
				this.isModalVisible = true;
			},
			closeModal() {
                this.isModalVisible = false;
            }
		},
		mounted() {
			this.$store.dispatch("getCartItems");
		},
		computed: {
			cart() { console.log(this.$store.state);
				return this.$store.getters.getCartItem
			},
			cartItemCount() {
				return this.$store.getters.getCartItemCount
			},
			cartTotalPrice() {
				return this.$store.getters.getCartTotalPrice
			},
			language() {
                return this.$store.getters.language
            }
		}
	}
</script>

<style scoped>
	.clear-cart-btn {
	    color: #ffffff;
	    font-size: 12px;
	    background: #000000;
	    outline: none;
	    margin-top: 4px;
	}
	.clear-cart-btn:hover {
		border: 1px solid red;
	    background: red;
	    color: #ffffff;
	    outline: none;
	}
	.table-responsive {
    	/* display: block; */
    	width: 100%;
    	overflow-x: auto;
    	-webkit-overflow-scrolling: touch;
	}
	.checkout-area {
		padding: 10px;
		margin-top: -22px;
	}
	.info-cart {
		margin: 0 0 auto 0;
	    height: 33px;
	    width: 35px;
	    position: absolute;
	    top: 0;
	    right: 0;
	    cursor: pointer;
	    font-size: 15px;
	    color: #fff !important;
	    background: black;
	    line-height: 33px;
	    border:none;
	    border-radius: 50%;
	    outline: none;
	}
	.info-cart:hover {
		background: #696969;
	}
	.cart-total {
		opacity: 1;
		font-size: 14px;
	}
	.policy-description {
		line-height: 2.5;
		font-size: 14px;
		font-weight: 600;
	}
</style>