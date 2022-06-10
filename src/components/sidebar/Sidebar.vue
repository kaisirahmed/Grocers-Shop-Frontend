<template>
    <!-- start Sidebar  -->
    <nav class="sidebar">
        <div class="sidebar-header">
        </div>
        <ul class="vrt-tree vrt-tree__wrapper">           
            <li class="vrt-tree__item">
            <a href="#" title="10% discount on dim baji">
                <img src="assets/images/campaign/icon/gift.png" style="max-width: 23px; max-height: 23px; " alt="icon" class="img-fluid">Coupon</a>
            </li>
            <li class="vrt-tree__item">
            <a href="#" title="Eid Damaka Discount up to 30%">
                <img src="assets/images/campaign/icon/gift.png" style="max-width: 23px; max-height: 23px; " alt="icon" class="img-fluid">Offers</a>
            </li>
        
        </ul>      
        <vue3-router-tree :items="categories" :routes="categories.slug">
            <template #item="{ item }">
                
                <router-link :to="item.slug"> 
                    <img :src="'data:image/'+item.icon_type+';base64,'+item.icon" style="max-width: 20px;max-height: 20px;" :alt="item.name" class="img-fluid" v-if="item.icon"> 
                    <!-- <template v-if="language.lang = `BN`">
                        {{ item.name_bn }}
                    </template> -->
                    
                    {{ item.name }}
                
                </router-link>
            </template>
        </vue3-router-tree>
        
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
            },
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
        color: #000000;
        font-weight: 700;
        font-size: 14px;
    }
    .router-link-active:hover {
        color: #000000;
        background-color: #e1e1e1;
        border-radius: 4px;
    }
    .vrt-tree__wrapper {
        box-shadow: 0 0 0px #ddd !important;
    }
    .vrt-tree {
        /* list-style: none; */
        padding: 0px !important;
        max-width: 280px;
    }
    .vrt-tree__item--has-more:hover {
        background-color: cornsilk !important;
    }
    .vrt-tree__item--has-more {
        padding: 2px 0 !important;
        height: 100%;
        background-color: lemonchiffon !important;
    }

    .vrt-tree .vrt-tree__wrapper .vrt-tree__item {
        padding: 2px !important;
        position: relative;
        cursor: pointer;
        display: grid;
        white-space: nowrap;
    }
</style>



