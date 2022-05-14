<template>
	<div>
		<h5>{{verified}}</h5>
	</div>
</template>
<script>
	export default {
		name: "Verified",
		mounted() {
			this.$store.dispatch("verify", this.$route.query);
		},
		computed: {
			verified() {
				return this.$store.getters.verifiedMessage;
			}
		}
	}
</script>