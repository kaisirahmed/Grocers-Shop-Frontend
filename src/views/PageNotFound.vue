<template>
	<div id="main">
		<Navbar/>
    	<Sidebar/>
    	<div class="wrapper">
            <div id="content">
 
				<div class="container">
					<div class="row category home-category">
						<div class="m-4">
							<div class="row">
							    <div class="error-template float-l">
								    <h1>Oops!</h1>
								    <h2>404 Not Found</h2>
								    <div class="error-details pt-4">
										Sorry, an error has occured, Requested page not found!<br>
								    </div>
								    <div class="error-actions">
								    	<router-link :to="`/`">
											<a :href="`/`" class="btn btn-info">
										    	<i class="icon-home icon-white"></i> Take Me Home </a>
									    </router-link>
										<a href="mailto:me@null-byte.info" class="btn btn-warning color-white">
									    	<i class="icon-envelope"></i> Contact Support </a>
								    </div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import Sidebar from "@/components/sidebar/Sidebar.vue";
	import Navbar from "@/components/navbar/Navbar.vue";

	export default {
		name: "PageNotFound",
		components: {
			Sidebar,
			Navbar
		}
	}
</script>

<style scoped>
	.error-template {
		padding: 40px 15px;
	}

	.error-template h1 {
		color: orange;
		font: bold;
	}
	.error-template h2 {
		color: orange;
		font: bold;
	}
	.error-actions {
		margin-top:15px;
		margin-bottom:15px;
	}
	.error-actions .btn { 
		margin-right:10px; 
	}
</style>