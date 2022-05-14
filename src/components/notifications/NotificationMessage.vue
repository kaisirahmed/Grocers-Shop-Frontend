<template>
	<div :class="typeClass" class="alert alert-dismissible fade show" role="alert">
	  {{ notification.message }}
	  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
	    <span aria-hidden="true">&times;</span>
	  </button>	
	</div>
</template>

<script>
	export default {
		props: ["notification"],
		data() {
			return {
				timeout: null
			}
		},
		computed: {
			typeClass() {
				return `alert-${this.notification.type}`;
			}
		},
		created() {
			this.timeout = setTimeout(() => {
				this.removeNotification(this.notification);
			}, 800)
		},
		beforeCreated() {
			clearTimeout(this.timeout);
		},
		methods: {
			removeNotification() {
				this.$store.dispatch("removeNotification", this.notification);
			}
		}
	}
</script>

<style scoped>
	.alert-success {
		border-left: 5px solid #187FE7;
		border-left-color: #42A85F;
	}
</style>