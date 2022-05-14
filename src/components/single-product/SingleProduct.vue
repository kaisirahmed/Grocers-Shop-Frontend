<template>			
	<section class="product-details mt10">
		<div class="container" v-if="singleProduct">
			<div class="row product-detail-top-block">
			<div class="col-md-12">
				<div class="product-detail-banner col-md-4">
					<h1 class="product-detail-banner-heading">
						<span> <b>গ্রোসারস</b> কেন পছন্দ করবেন?</span>
					</h1>
				</div>
				<div class="col-md-8">
					<img src="/assets/images/banner/banner-product-detail.png">
				</div>
			</div>
		</div>
			<div class="row">
				<div class="col-lg-6 col-sm-12">
					<div class="products-slider" style="overflow: hidden;">
						<div class="big-img">
							<div class="zoom-left">
								<img id="product_zoom" data-zoom-image="" class="img-area" data-src="" :src="'data:image/'+singleProduct.image_type+';base64,'+singleProduct.image">
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6 col-sm-12">
					<div class="pro-det-right">
						<h3>{{ singleProduct.name }}</h3> 
						<div class="pro-items qty_unit_details">
							<span class="item-number">{{ singleProduct.sub_name }}</span>
						</div> 
						<!-- <div class="pro-avai">
							<span class="item-name">AVAILABILITY:</span> 
							<span class="item-val">YES</span>
						</div> 
						<div class="pro-avai">
							<span class="item-name">Brand:</span> 
							<span class="item-val">N/A</span>
						</div> 
						<div class="pro-items">
							<span class="item-name">ITEM NO.:</span> 
							<span class="item-number">ITM-#29</span>
						</div>  -->
						<div class="price">
							<span class="price-number">৳ {{ parseFloat(singleProduct.sale_price).toFixed(2) }}</span> 
						</div> 
						<span class="button-wrapper" style="margin-top: -15px;">
							<a href="javascript:;" class="button btn-cart" @click.prevent="addToCart">
                			Add to Cart <i class="lni lni-shopping-basket"></i>
                			</a>
                		</span> 
                		<div class="short-des" style="margin-bottom: 20px;">
                			<p>
                				<span style="background-color: rgb(246, 248, 250); color: rgb(71, 71, 71);" v-html="singleProduct.description"></span>
                			</p>
                		</div> 
                		<!-- <a href="" class="more-less theme-color">...Read more</a>  -->
                		<!-- <div class="follow mt10">
                			<a href="https://www.facebook.com/sharer/sharer.php?u=http://limmerz.limmexbd.com/product/29/Kelloggs-Chocos-Crunchy" class="entry bg-primary text-white">
                				<i class="lni lni-facebook-filled"></i>
                			</a> 
                			<a href="https://twitter.com/intent/tweet?text=http://limmerz.limmexbd.com/product/29/Kelloggs-Chocos-Crunchy" data-size="large" class="entry bg-info text-white"><i class="lni lni-twitter-filled"></i></a>
                		</div> -->
                	</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
	export default {
		name: "SingleProduct",
		props: ["singleProduct"],
		methods: {
			addToCart() {
				this.$store.dispatch("addProductToCart", {
					product: this.singleProduct,
					quantity: 1
				})
				if(this.$store.getters.getCartItemCount == (1 || '১')) {
					this.toggleBodyClass('addClass', 'sidebar_right_js_open');
				}
			},
			toggleBodyClass(addRemoveClass, className) {
			    const el = document.body;

			    if (addRemoveClass === 'addClass') {
			      el.classList.add(className);
			    } else {
			      el.classList.remove(className);
			    }
			 },
		},
		computed: {

		}
	}
</script>

<style scoped>
	.img-area {
		max-width: 100%;
		height: auto;
	}
	.product-detail-on-land .product-detail-top-block .product-detail-banner {
	    display: flex;
	    justify-content: center;
	}
	.product-detail-top-block {
	    margin: 3px;
	    border: none;
	    border-radius: 5px;
	    background: linear-gradient(to right,#a9dd2f,#d6f58b);
	}
	.product-detail-top-block .product-detail-banner .product-detail-banner-heading {
	    align-self: center;
	    color: #3c5d41;
	    font-size: 20px;
	    padding: 2%;
	    margin: 0;
	    text-align: center;
	}
	 .product-detail-top-block .product-detail-banner img {
	    width: 100%;
	    padding: 5px;
	}
</style>