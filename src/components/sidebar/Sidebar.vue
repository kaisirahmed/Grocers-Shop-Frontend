<template>
    <!-- start Sidebar  -->
    <nav class="sidebar">
        <div class="sidebar-header">
        </div>
        <ul>
            <!-- <li class="initially_selected">
                <a href="#" title="10% discount on dim baji">
                <img src="assets/images/campaign/icon/gift.png" style="max-width: 23px; max-height: 23px; " alt="icon" class="img-fluid">Coupon</a>
            </li>
            <li class="initially_selected">
                <a href="#" title="Eid Damaka Discount up to 30%">
                <img src="assets/images/campaign/icon/gift.png" style="max-width: 23px; max-height: 23px; " alt="icon" class="img-fluid">Offers</a>
            </li> -->
        
                 
        <vue3-router-tree :items="categories" :routes="categories.slug">
            <template #item="{ item }">
                <img :src="'data:image/'+item.icon_type+';base64,'+item.icon" style="max-width: 30px; max-height: 30px; " alt="icon" class="img-fluid" v-if="item.icon"> 
                <router-link :to="item.slug"> 
                    
                    <!-- <template v-if="language.lang = `BN`">
                        {{ item.name_bn }}
                    </template> -->
                    
                    {{ item.name }}
                  
                </router-link>
            </template>
        </vue3-router-tree>
        </ul>
    </nav>
</template>
<script>
    import { defineComponent } from 'vue';

    import Vue3RouterTree from 'vue3-router-tree';
    export default defineComponent ({
        name: "Sidebar",
        data() {
            return {
                categories: this.getAllCategories(this.$store.getters.categories, 0)
            }
        },
        components: {
            Vue3RouterTree
        },
        created() {
            this.$store.dispatch('getCategories');
        },
        methods: {
            getAllCategories(categories, parent) {
                var categoryTree = []
                for(var i in categories) {
                  if(categories[i].parent_id === parent) {
                    var children = this.getAllCategories(categories, categories[i].id)

                    if(children.length) {
                      categories[i].children = children
                    }
                    categoryTree.push(categories[i])
                  }
                } 
                return categoryTree
            }
        },
        computed: {
            language() { console.log(this.$store.getters.language)
                return this.$store.getters.language
            }
        }
    })
</script>

<style scoped>
    .router-link-active {
        color: #00bb1d;
        font-weight: 500;
        font-size: 14px;
    }
    .router-link-active:hover {
        color: #00bb1d;
    }
</style>



