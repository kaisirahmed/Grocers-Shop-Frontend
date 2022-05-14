<template>
	<div class="notifications-list">
 
 		<NotificationMessage 
			v-for="notification in notifications" 
			:key="notification.id" 
			:notification="notification" />

	</div>
</template>

<script>
	import NotificationMessage from './NotificationMessage.vue';

	export default {
		name: "NotificationsList",
		components: {
			NotificationMessage
		},
		computed: {
			notifications() {
				return this.$store.getters.getNotifications;
			},
		}
	}	
</script>

<style scoped>
	.notifications-list {
		position: fixed;
		left: 40%;
		top: 50px;
		margin-left: -width;
		margin-top: -height;
		z-index: 99999;
	}
</style>
