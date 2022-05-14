<template>
     <div class="m-4">
        <div class="row">
            <div class="col-md-8">
                <div class="card address-book">
                    <div class="card-header">
                        <i class="lnil lni-book">&nbsp;Order List</i>
                         
                    </div>
                    
                    <div class="card-body align-items-center d-flex justify-content-center">
                        
                        <div class="col-md-12">
                            <div class="card mt-4" v-for="order in allOrders" :key="order.id">
                                <button type="submit" class="edit-btn btn-sm btn-default" @click="showModal(order.id)">View</button>
                                <!-- <button type="submit" class="del-btn btn-sm btn-default">Delete</button> -->
                                <div class="card-body address">
                                     
                                    <button class="btn btn-success">{{ order.order_status }}</button> <br> 
                                    <h4 class="address_text"> 
                                        Order #{{ order.order_number }}
                                        <br>
                                        ৳ {{ order.total_price }}
                                    </h4>
                                    <h5 class="text-right" style="margin-top: -50px">
                                        <strong>{{ order.invoice_number }}</strong> <br>
                                        {{ order.order_date }}
                                    </h5>
                                     
                                </div>
                            </div>
                        </div>
                    </div>

                <Modal
                  v-show="isModalVisible"
                  @close="closeModal">
                    <template v-slot:header>
                       View Details
                    </template>
                    <template v-slot:body>
                        <ul class="list-group" v-for="product in orderProducts" :key="product.id">
                            <li class="list-group-item"><img width="60" :src="'data:image/'+product.image_type+';base64,'+product.image"> {{ product.product_name }} {{ product.price }}</li>
                        </ul>
                    </template>
                </Modal>

                </div>
            </div>
        </div>
     </div>
</template>

<script>

import Axios from 'axios';

export default {
    data: () => {
        return {
            isModalVisible: false,
            orderProducts: null
        }
    },
    methods: {
        showModal(orderId) {
            this.isModalVisible = true;
             
            this.$store.dispatch('loading', true);
            Axios.post(`/product/orders`,{order_id:orderId})
                .then((response) => { 
                    this.$store.dispatch('loading', false);
                    this.orderProducts = response.data.data;
                   // console.log(response.data.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        closeModal() {
            this.isModalVisible = false;
        },
    },
    mounted() {
        this.$store.dispatch('login');
        if(this.$store.getters.isLoggedIn) { 
            this.$store.dispatch('orders');
        }
    },
    computed: {
        allOrders() {  
            return this.$store.getters.allOrders;
        },
         
    }
}

</script>


<style scoped>
    button {
        padding: .25rem 1.5rem;
        margin-top: 0px;
    }
    .edit-btn {
        position: absolute;
        top: -20px;
        right: 10px;
        text-align: center;
        border: 1px solid #b2b2b2;
        margin-left: 12px;
        color: #b2b2b2;
        background: #ffffff;
        outline: none;
    }
    .edit-btn:hover {
        color: #ffc200;
        border: 1px solid #ffc200; 
    }
    .del-btn {
        position: absolute;
        top: -20px;
        right:100px;
        text-align: center;
        border: 1px solid #b2b2b2;
        margin-left: 12px;
        color: #b2b2b2;
        background: #ffffff;
        outline: none;
    }
    .del-btn:hover {
        color: red;
        border: 1px solid red; 
    }
</style>