<template>
    <div class="m-4" v-if="currentUser">
        <div class="row">
            <div class="col-md-8">
                <div class="alert alert-warning" role="alert" v-if="currentUser.email_verified_at === null">
                    {{ getVerifyMessage }}
                    <div class="verify-loader-btn">
                        <div class="fa fa-check" :class="isVerifyFinish"></div>
                        <div class="fa fa-close" :class="isVerifyFailed"></div>
                        <button class="btn" :class="isVerifying" type="submit" @click.prevent="verifyEmail" :disabled="isDisabled"> Verify</button>
                    </div>
                    
                </div>

                <div class="card profile-card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="lnil lni-user">&nbsp;Profile</i></h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <form>
                                    <div class="form-group row">
                                        <div class="col-12">
                                          <input :value="currentUser.name" placeholder="First Name" class="form-control here" type="text">
                                        </div>
                                    </div>
                               
                                    <div class="form-group row">
                                        <div class="col-12 input-group">
                                            <input type="email" :value="currentUser.email" class="form-control" placeholder="Email Address">
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-12">
                                            <input type="text" :value="currentUser.mobile_number" placeholder="Phone Number" class="form-control here" required="required" disabled="disabled">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row pt-4">
            <div class="col-md-8">
                <Modal
                  v-show="isModalVisible"
                  @close="closeModal">
                    <template v-slot:header>
                        New Address
                    </template>
                    <template v-slot:body>
                        <form @submit.prevent="addNewAddress()" class="profile-form">
                            <div class="form-group row">
                                <div class="col-12">
                                    <label for="name_new">Name</label>
                                    <input id="name_new" v-model="form.name" placeholder="Name" class="form-control here" required="required" type="text">
                                </div>
                            </div>
                          
                            <div class="form-group row">
                                <div class="col-12">
                                    <label for="mobile_number_new">Phone Number</label>
                                    <div class="input-group">
                                        <div class="input-group-text">+88</div>
                                        <input id="mobile_number_new" v-model="form.mobile_number" placeholder="Phone Number" class="form-control here" type="text">
                                    </div>
                                </div>
                            </div>
                          
                            <div class="form-group row">
                                <div class="col-12">
                                    <label for="area_new">Area</label>
                                    <select id="area_new" name="area" class="custom-select" v-model="form.area">
                                        
                                        <option selected="selected">Select area</option>
                                        <option  v-for="area in areas"  v-bind:value="area.name" :key="area.id">
                                            {{ area.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                           
                            <div class="form-group row">
                                <div class="col-12">
                                    <label for="address_new">Address</label>
                                    <textarea id="address_new" v-model="form.address" cols="40" rows="4" placeholder="Address" class="form-control"></textarea>
                                </div>
                            </div>
                         
                            <div class="form-group row">
                                <div class="offset-4 col-12">
                                    <button name="submit" type="submit" class="btn btn-danger">Confirm</button>
                                </div>
                            </div>
                        </form>
                    </template>
                </Modal>

                <Modal
                  v-show="isEditModalVisible"
                  @close="closeEditModal">
                    <template v-slot:header>
                        Edit Address
                    </template>
                    <template v-slot:body>
                        <form @submit.prevent="updateAddress()" class="profile-form">
                            <div class="form-group row">
                                <div class="col-12">
                                    <label for="name_edit">Name</label>
                                    <input id="name_edit" v-model="editForm.name" placeholder="Name" class="form-control here" required="required" type="text">
                                </div>
                            </div>
                          
                            <div class="form-group row">
                                <div class="col-12">
                                    <label for="mobile_number_edit">Phone Number</label>
                                    <div class="input-group">
                                        <div class="input-group-text">+88</div>
                                        <input id="mobile_number_edit" v-model="editForm.mobile_number" placeholder="Phone Number" class="form-control here" type="text">
                                    </div>
                                </div>
                            </div>
                          
                            <div class="form-group row">
                                <div class="col-12">
                                    <label for="area_edit">Area</label>
                                    <select id="area_edit" name="area" class="custom-select" v-model="editForm.area">
                                        
                                        <option selected="selected">Select area</option>
                                        <option  v-for="area in areas"  v-bind:value="area.name" :key="area.id">
                                            {{ area.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                           
                            <div class="form-group row">
                                <div class="col-12">
                                    <label for="address_edit">Address</label>
                                    <textarea id="address_edit" v-model="editForm.address" cols="40" rows="4" placeholder="Address" class="form-control"></textarea>
                                </div>
                            </div>
                         
                            <div class="form-group row">
                                <div class="offset-4 col-12">
                                    <button name="submit" type="submit" class="btn btn-danger">Update</button>
                                </div>
                            </div>
                        </form>
                    </template>
                </Modal>

                <div class="card address-book">
                    <div class="card-header">
                        <i class="lnil lni-book">&nbsp;Address</i>
                        <button class="btn btn-sm btn-new-address float-right" @click="showModal">Add New</button>
                    </div>
                    <div class="card-body align-items-center d-flex justify-content-center">
                        
                        <div class="col-md-12">
                            <template v-if="!address.length">
                            <form @submit.prevent="addNewAddress()" class="profile-form">
                                <div class="form-group row">
                                    <div class="col-8">
                                        <label for="name">Name</label>
                                        <input id="name" v-model="form.name" placeholder="Name" class="form-control here" required="required" type="text">
                                    </div>
                                </div>
                              
                                <div class="form-group row">
                                    <div class="col-8">
                                        <label for="mobile_number">Phone Number</label>
                                        <div class="input-group">
                                            <div class="input-group-text">+88</div>
                                            <input id="mobile_number" v-model="form.mobile_number" placeholder="Phone Number" class="form-control here" type="text">
                                        </div>
                                    </div>
                                </div>
                              
                                <div class="form-group row">
                                    <div class="col-8">
                                        <label for="area">Area</label>
                                        <select id="area" name="area" class="custom-select" v-model="form.area">
                                            
                                            <option selected="selected">Select area</option>
                                            <option  v-for="area in areas"  v-bind:value="area.name" :key="area.id">
                                                {{ area.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                               
                                <div class="form-group row">
                                    <div class="col-8">
                                        <label for="address">Address</label>
                                        <textarea id="address" v-model="form.address" cols="40" rows="4" placeholder="Address" class="form-control"></textarea>
                                    </div>
                                </div>
                             
                                <div class="form-group row">
                                    <div class="offset-3 col-8">
                                        <button name="submit" type="submit" class="btn btn-danger">Confirm</button>
                                    </div>
                                </div>
                            </form>
                            </template>
                            <template v-else>
                                <div class="card mt-4" v-for="address in address" :key="address.id">
                                    <button type="submit" class="edit-btn btn-sm btn-default" @click.prevent="editAddress(address)">Edit</button>
                                    <button type="submit" class="del-btn btn-sm btn-default" @click.prevent="deleteAddress(address)">Delete</button>
                                    <div class="card-body address">
                                        <div class="form-check">
                                            <input type="radio" name="is_default" class="form-check-input" @change="updateDefault(address)" :checked="address.is_default == 1">
                                        </div>
                                          
                                        <h5>    
                                            <p class="address_text">{{address.address}}</p>
                                            <p class="text-right" style="margin-top: -20px">{{address.area}}</p>
                                        </h5>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import Axios from 'axios';
    import { address } from '@/helpers/address';
    import { addressDefault } from '@/helpers/address';
    import { addressUpdate } from '@/helpers/address';

    export default {
        name: 'Profile',
        data: () => {
            return {
                form: {
                    name: '',
                    mobile_number: '',
                    area: '',
                    address:''
                },

                editForm: {
                    address_id: '',
                    name: '',
                    mobile_number: '',
                    area: '',
                    address: '',
                    is_default: ''
                },
        
                areas:[
                    { id:1, name: 'Adabor'},
                    { id:2, name: 'Aftabnagar'},
                    { id:3, name: 'Agargaon'},
                    { id:4, name: 'Badda'},
                    { id:5, name: 'Banani'},
                    { id:6, name: 'Banasree'},
                    { id:7, name: 'Bangshal'},
                    { id:8, name: 'Mirpur'},
                    { id:9, name: 'Baridhara'},
                    { id:10, name: 'Gulshan'},
                ],
                error: null,
                title: "Profile",
                titleBn: "আপনার প্রোফাইল",
                isModalVisible: false,
                isEditModalVisible: false,
                isVerifying: 'btn-verify',
                isVerifyFinish: 'done',
                isVerifyFailed: 'failed',
                isDisabled: false
            }
        },
        methods: {
            logout() {
                this.$store.commit('logout');
                this.$router.push('/login');
            },
            verifyEmail() {
                this.isVerifying = "loading";
                Axios.get(`email/resend`)
                     .then((response) => {
                        console.log(response.data)
                        this.isVerifying = "stop-loading";
                        this.isVerifyFinish = "done finish";
                        // var verify = {
                        //     verifyMessage: "Verification link is sent to your email. Check your email.",
                        //     isVerifyFinish: "done finish",
                        //     isVerifyFinish: "done finish" 
                        // }
                        this.isDisabled = true;
                        this.setWithExpiry("verifyMessage", "verify", 1000 * 60 * 60)
                     })
                     .catch((error) => {
                        console.log(error.response)
                        this.isVerifyFinish = "done";
                        this.isVerifyFailed = "failed finish";
                        var verifyMessage = "Some error is happened when verifying email";
                        this.setWithExpiry("verifyMessage", verifyMessage, 1000 * 60 * 60)
                        // if (error !== null) {
                        //     setTimeout(function(){
                        //         this.isVerifying = 'btn-verify';
                        //         this.isVerifyFinish = 'done';
                        //         this.isVerifyFailed = 'failed';
                        //         this.isDisabled = false;
                        //     }, 1000);
                        // }
                     })
            },
            addNewAddress() {
                this.$store.dispatch('loading', true);
                
                address(this.$data.form)    
                    .then((response) => {
                        this.isModalVisible = false;
                        this.$store.dispatch('loading', false);
                        this.$store.commit("SetAddress", response);
                    })
                    .catch((error) => {
                        this.$store.dispatch('loading', false);
                        this.$store.commit("addressFailed", { error });
                    })
                this.resetInput();
            },
            editAddress(address) { // console.log(address)
                this.isEditModalVisible = true

                this.editForm.address_id = address.id;
                this.editForm.name = address.name;
                this.editForm.mobile_number = address.mobile_number;
                this.editForm.area = address.area;
                this.editForm.address = address.address;
                this.editForm.is_default = address.is_default;
            },

            updateAddress() {
                this.$store.dispatch('loading', true);
                
                addressUpdate(this.$data.editForm)    
                    .then((response) => {
                        this.isEditModalVisible = false;
                        this.$store.dispatch('loading', false);
                        this.$store.commit("SetAddress", response);
                    })
                    .catch((error) => {
                        this.$store.dispatch('loading', false);
                        this.$store.commit("addressFailed", { error });
                    })
                this.resetInput();
            },
            resetInput() {
                this.form.email = "";
                this.form.name = '';
                this.form.mobile_number = '';
                this.form.area = '';
                this.form.address = '';
            },
            deleteAddress(address) {
                if(confirm("Are you sure to Delete?")) {
                    this.$store.dispatch('deleteAddress', address);
                } 
            },
            updateDefault(address) {
                this.$store.dispatch('loading', true);
                addressDefault({address_id:address.id})
                    .then((response) => {
                        this.$store.dispatch('loading', false);
                        this.$store.commit("SetAddress", response);
                        this.$store.dispatch('addNotification', {
                            type: "success",
                            message: "Default address is set!",
                        }, {root:true});
                    })
                    .catch((error) => {
                        this.$store.dispatch('loading', false);
                        this.$store.commit("addressFailed", { error });
                    })
            },
            showModal() {
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            closeEditModal() {
                this.isEditModalVisible = false;
            },
            setWithExpiry(key, value, ttl) {
                const now = new Date()

                // `item` is an object which contains the original value
                // as well as the time when it's supposed to expire
                const item = {
                    value: value,
                    expiry: now.getTime() + ttl,
                }
                localStorage.setItem(key, JSON.stringify(item))
            },
            getWithExpiry(key) {
                const itemStr = localStorage.getItem(key)

                // if the item doesn't exist, return null
                if (!itemStr) {
                    return "Your email is not verified. Click to verify email."
                }

                const item = JSON.parse(itemStr)
                const now = new Date()

                // compare the expiry time of the item with the current time
                if (now.getTime() > item.expiry) {
                    // If the item is expired, delete the item from storage
                    // and return null
                    localStorage.removeItem(key)
                    return "Your email is not verified. Click to verify email."
                }
                return item.value
            }
        },
        mounted() {
            // if (this.currentUser.length) {
            //     return;
            // }
            
            this.$store.dispatch('login');
            if(this.$store.getters.isLoggedIn) { 
                this.$store.dispatch('getAddress');
            }
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser
            },
            address() {
                return this.$store.getters.addressUser
            },
            getVerifyMessage() {
              return this.getWithExpiry("verifyMessage");
            }
        }
    }
</script>

<style scoped>
    .card-title {
        padding: 12px;
    }

    .profile-form {
        align-items: center;
    }

    .profile-card input:focus {
      border-color: green;
    }

    .profile-card .card-title {
        margin-bottom: 0px;
    }
    .profile-card .card-header {
        padding: 0rem 1.25rem;
    }
    .profile-card .form-group {
        margin-bottom: 3rem;
    }
    .profile-card .card-body {
        padding: 32px;
        margin-bottom: -58px;
    }
    .address-book form {
        align-content: center;
    }
    .address-book .card-header {
        padding: 1rem 1.5rem;
    }
    .address-book .card {
        border: 1px solid rgba(0,0,0,0.3);
    }
    .address-book i {
        font-size: 26px;
    }
    .address-book .title {
        padding: 1px;
        margin-top: 3px;
    }

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
    .btn-verify {
        position: relative;
        text-align: center;
        border: 1px solid #e5a503;
        color: #ff9900;
        background: transparent;
        outline: none;
        float: right;
        margin-top: 2px;
    }
    .btn-verify:focus {
        outline: none;
    }
    .btn-verify:hover {
        color: #8fbc23;
        border: 1px solid #8fbc23; 
    }
    .btn-new-address {
        color: #535353;
        background-color: transparent;
        border-color: #b2b2b2;
    }
    .btn-new-address:hover {
        color: #01ab55;
        background-color: #ffffff;
        border-color: #01ab55;
    }
    .card-body {
        padding: 14px;
        border: none;
    }  
    .address {
        padding: 3px 18px 3px 18px;
    } 

    .verify-loader-btn {
        position: relative;
        text-align: center;
        outline: none;
        float: right;
        margin-top: -7px;
    }

    .loading{
      font-size:0;
      width:30px;
      height:30px;
      margin-top:5px;
      border-radius:15px;
      padding:0;
      border:3px solid #11cea7;
      border-bottom:3px solid rgba(255,255,255,0.0);
      border-left:3px solid rgba(255,255,255,0.0);
      background-color:transparent !important;
      animation-name: rotateAnimation;
      -webkit-animation-name: wk-rotateAnimation;
      animation-duration: 1s;
      -webkit-animation-duration: 1s;
      animation-delay: 0.2s;
      -webkit-animation-delay: 0.2s;
      animation-iteration-count: infinite;
      -webkit-animation-iteration-count: infinite;
    }

    @keyframes rotateAnimation {
        0%   {transform: rotate(0deg);}
        100% {transform: rotate(360deg);}
    }
    @-webkit-keyframes wk-rotateAnimation {
        0%   {-webkit-transform: rotate(0deg);}
        100% {-webkit-transform: rotate(360deg);}
    }

    .fa{
      font-size:18px !important;
      position:absolute;
      left:50%;
      top:50%;
      margin-left:-8px;
      margin-top:-7px;
      -webkit-transform:scaleX(0) !important;
      transform:scaleX(0) !important;
    }

    .fa-check {
        color: #8fbc23;
    }

    .fa-close {
        color: #ed0f0f;
    }

    .finish{
      -webkit-transform:scaleX(1) !important;
      transform:scaleX(1) !important;
    }
    .stop-loading{
        font-size: 0;
        width: 30px;
        height: 30px;
        margin-top: 4px;
        border-radius: 15px;
        padding: 0;
        border: 3px solid #8fbc23;
        background-color: transparent !important;
    }

    input[type="radio"], input[type="checkbox"] {
        display: block;
    }

    .address_text {
        margin-left: 20px;
    }

</style>