<template>
	<div class="container">
        <div class="row category" v-if="parentcategory !== null">
            <div class="col-md-12 text-center">
                <img class="img-thumbnail img-fluid mx-auto d-block" :src="'data:image/'+parentcategory.banner_type+';base64,'+parentcategory.banner">
            </div>
            
            <div class="col-md-12">
                <div class="title text-center pt-4">
                    <h3><template  v-if="language.lang == 'bn'">{{parentcategory.name_bn}}</template>
                    <template v-else>
                        {{parentcategory.name}}
                    </template></h3>
                </div>
                <hr>
            </div>
        </div>
        <div class="row category home-category pt-5" v-if="subcategories.type === `SubCategories` ">
        	 
            <div class="col-6 col-lg-3 col-sm-6" v-for="category in subcategories.data" :key="category.id">
                <router-link :to="category.slug">
                    <div class="box">
                        <div class="content">
                            <img :alt="category.name" class="img-fluid" :src="'data:image/'+category.image_type+';base64,'+category.image">
                            <h3><template v-if="language.lang == 'bn'">
                                {{ category.name_bn }}
                            </template>
                            <template v-else>
                                {{ category.name }}
                            </template></h3>
                        </div>
                    </div>
                </router-link>
            </div>
           
        </div>

        <div class="row offers" v-if="subcategories.type === `Products` ">
            <ProductCard  v-for="product in subcategories.data" :key="product.id" :product="product"/>
        </div>

        <div v-if="subcategories.type === `SingleProduct`">
            <SingleProduct :singleProduct="subcategories.data"/>
        </div>

  </div>
</template>
<script>

    import ProductCard from '@/components/product-card/ProductCard.vue';
    import SingleProduct from '@/components/single-product/SingleProduct.vue';
	export default {
		name: 'Products',
        props: ["product","singleProduct"],
        components: {
            ProductCard,
            SingleProduct
        },
        watch: {
           '$route' () {
                document.title = this.$route.params.slug;
            } 
        },
        created() {
            this.$store.dispatch('getCategoryProducts', this.$route.params.slug);
        },
        computed: {
            language() { 
                return this.$store.getters.language
            },
            subcategories() {console.log(this.$store.getters);
                return this.$store.getters.subcategories
            },
            parentcategory() {
                return this.$store.getters.parentcategory;
            }
        }
	}
</script>