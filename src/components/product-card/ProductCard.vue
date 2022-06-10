<template>
	<div class="col-6 col-lg-3 col-sm-4">
        <div class="offer">
            <router-link :to="product.slug">
                <img class="img-fluid" data-src="" :src="'data:image/'+product.image_type+';base64,'+product.image" :alt="product.name">
            </router-link>
            <div class="content">
                <template v-if="language.lang == 'bn'">
                    {{ product.name_bn }}
                </template>
                <template v-else>
                     {{ product.name }}
                </template>
               
                <span v-if="product.sub_name != null">
                    {{ product.sub_name }}
                </span>
                
                <p class="qty_unit">
                    <small>{{ product.sub_name }}</small>
                </p> 
                <template v-if="language.lang == 'bn'">
                     <span class="regular-price mr-4">
                        ৳{{ product.sale_price_bn }}
                    </span> 

                    <span class="discount-price">
                        ৳{{ product.price_bn }}
                    </span> 
                </template>
                <template v-else>
                    <span class="regular-price mr-4">
                        ৳{{ parseFloat(product.sale_price).toFixed(2) }}
                    </span> 

                    <span class="discount-price">
                        ৳{{ parseFloat(product.price).toFixed(2) }}
                    </span> 
                </template>

                <!-- <div class="item-cart">
                    <a title="Remove On" class="float-left qty-minus">
                        <strong><i class="lni lni-minus"></i></strong>
                    </a> 
                    <div class="qty-text float-left">
                        <strong>1 in Cart</strong>
                    </div> 
                    <a title="Add One More" class="float-left qty-plus">
                        <strong><i class="lni lni-plus"></i></strong>
                    </a>
                </div> -->

                <a href="javascript:;" class="button button-sm add_to_cart_button" @click.prevent="addToCart">
                    Add to Cart <i class="lni-shopping-basket"></i>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
 
	export default {
		props: ['product'],
		methods: {
			addToCart() {
                if(this.$store.getters.currentUser) {
                    this.$store.dispatch("addProductToCart", {
                        product: this.product,
                        quantity: 1
                    })
                    if(this.$store.getters.getCartItemCount == (1 || '১')) {
                        this.toggleBodyClass('addClass', 'sidebar_right_js_open');
                    }
                } else {
                    alert('Please Login');
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
            language() {
                return this.$store.getters.language
            }
        }
	}
</script>