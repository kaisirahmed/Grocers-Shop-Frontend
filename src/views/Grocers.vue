<template>
    <div id="main">
        <Navbar/>
        <Sidebar/>
        <div class="wrapper">
            <div id="content">
                <Loading v-if="loading" />
                <router-view :key="$route.fullPath"></router-view>
            </div>
            <NotificationsList/>
        </div>
        
    </div>
  
</template>

<script>
//@ is an alias to /src
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Navbar from "@/components/navbar/Navbar.vue";
//import Footer from "@/components/footer/Footer.vue";
import Loading from "@/components/loading/Loading.vue";
import NotificationsList from '@/components/notifications/NotificationsList.vue';

export default {
  name: "Grocers",
  components: {
    Sidebar,
    Navbar,
    //Footer,
    Loading,
    NotificationsList
  },
  computed: {
    loading() {
        return this.$store.getters.getLoading;
    }
  }
}
</script>

