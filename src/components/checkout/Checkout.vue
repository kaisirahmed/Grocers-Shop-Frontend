<template>
	<div class="container mt-4">
		<form @submit.prevent="placeOrder">

            <div class="row">
				<div class="col-lg-8 col-sm-12">
					<div class="card profile-card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="lnil lni-cart-full">&nbsp;Checkout</i></h3>
                        </div>
                        <div class="card-body">
         
                		    <div class="payment-form">
                				<div class="form product-info bg-white">
                					<div class="table-responsive">
                						<table class="table">
                							<tfoot>
                								<tr>
                									<td colspan="4">
                										<span class="totitle">SubTotal</span>
                									</td> 
                									<td>
                										<span class="total">৳ {{ cartSubTotal }}</span>
                									</td>
                								</tr> 
                								<tr>
                									<td colspan="4">
                										<span class="totitle">(+) Delivery Charge</span>
                									</td> 
                									<td>
                										<span class="total">৳ {{ deliveryCost }}</span>
														
                									</td>
                								</tr> 
                								<tr>
                									<td colspan="4" class="text-right ">
                										<span class="totitle theme-color">Grand Total : </span>
                									</td> 
                									<td>
                										<span class="total">৳ {{ cartTotalCost }}</span>
                									</td>
                								</tr>
                                                <tr>
                                                    <td colspan="5">
                                                        <div class="p20">
                                                            <div class="payment-form">	
                                                                <div class="payment-method">
                                                                    <input id="payment-method-Cash-on-Delivery" name="payment_method" v-model="form.payment_method" value="COD" type="radio" class="input-radio my-radio" :checked="checked"> 
                                                                    <label for="payment-method-Cash-on-Delivery">Cash On Delivery</label> 
                                                                    <img src="/assets/images/payment/cash-on-delivery.png" alt="Cash Image">
                                                                </div> 
                                                                <button type="submit" class="button button-md theme-background color-white mb20 w-100">Place Order</button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                							</tfoot>
                						</table> 
                						<!-- <input type="hidden" name="coupon_discount" value="0"> 
                						<input type="hidden" name="coupon_code">  -->
                						<!-- <input type="hidden" name="delivery_cost" v-model="form.deliveryCost" >  -->
                						<!-- <input type="hidden" name="cart_total" value="383"> -->
                					</div> 
                					<!-- <div>
                						<div style="padding: 10px;">
                							<div class="row">
                								<div class="col-md-7 col-7">
                									<input type="text" placeholder="Enter Coupon Code" class="form-control">
                								</div> 
                								<div class="col-md-5 col-5">
                									<button class="btn btn-outline-secondary">Apply Coupon</button>
                								</div>
                							</div>
                						</div>
                					</div> -->
                				</div>
                			</div>
                         
                        </div>
                    </div>
                </div> 
               <!--  <div class="col-lg-6 col-sm-12">
                	<div class="form bg-white bg-shadow mt-2">
                		<div class="heading  checkout-heading clearfix p10">
                			<h4 class="color-white">Payment</h4>
                		</div> 
                		<div class="p20">
                			<div class="payment-form">
                				<div class="payment-method">
                					<input id="payment-method-Cash-on-Delivery" name="payment_method" value="1" type="radio" class="input-radio my-radio"> 
                					<label for="payment-method-Cash-on-Delivery">Cash On Delivery</label> 
                					<img src="http://limmerz.limmexbd.com/assets/image/payment/c-cash.jpg" alt="Cash Image">
                				</div> 
                				<div class="payment-method">
                					<input id="payment-method-paypal" name="payment_method" value="2" type="radio" class="input-radio my-radio"> 
                					<label for="payment-method-paypal">Paypal</label> 
                					<img src="http://limmerz.limmexbd.com/assets/image/payment/paypal-payment-icon.png" alt="Paypal Image">
                				</div> 
                				<div class="payment-method">
                					<input id="payment-method-ssl-commerz" name="payment_method" value="4" type="radio" class="input-radio my-radio"> 
                					<label for="payment-method-ssl-commerz">Ssl Commerz</label> 
                					<img src="http://limmerz.limmexbd.com/assets/image/payment/ssl.jpg" alt="SSL  Commerz" class="img-fluid">
                				</div> 
                				<button type="submit" class="button button-md theme-background color-white mb20 w-100">Place Order</button>
                			</div>
                		</div>
                	</div>
                </div> -->
            </div>
        </form>
    </div>
</template>

<script>

    import { checkout } from '@/helpers/checkout';
	import { localCart } from '@/helpers/cart';

	export default {
		name: "Checkout",
        data() {
            return {
                form: {
                    payment_method: null,
                },
            }
        },
        methods: {
             placeOrder() {
               // this.$store.dispatch('login');

			   	const cart = localCart();
				
				var cartId = cart.map(x => {
					return x.product.id
				});
				let credentials = Object.assign({}, this.$data.form, {delivery_cost: this.deliveryCost}, {productId: cartId})
				
	  
				if(cart.length > 0) {
					if (this.$data.form.payment_method != null) {
									
						checkout(credentials)
							.then((response) => {console.log(response)
								//this.$store.commit("CheckoutSuccess", res);
								this.$store.dispatch('loading', false);
								//this.$router.push({ path: '/orders' });
								this.$store.dispatch("orders")
								.then(this.$router.push({path:'/orders'}));
							})
							.catch((error) => {console.log(error)
							// this.$store.commit("CheckoutFailled", { error });
								this.$store.dispatch('loading', false);
							})
					} else {
						alert("Please select the payment method");
					}
				} else {
					alert("Your Cart is empty!!");
				}
			   	
             }
        },
        computed: {
            cartSubTotal() {
                return this.$store.getters.getCartTotalPrice;
            },
            deliveryCost() {
                return this.$store.getters.deliveryCost;
            },
            cartTotalCost() {//console.log(parseInt(this.cartSubTotal) + parseInt(this.deliveryCost))
                return parseInt(this.cartSubTotal) + parseInt(this.deliveryCost);
            }
        }
	}
</script>