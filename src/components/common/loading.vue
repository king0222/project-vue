<template>
	<div class="fullpage-loading">
		<img class="loading-svg" src="../../assets/img/loading.svg">
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="scss" scoped>
	.fullpage-loading {
		position: fixed;
		opacity: 1;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0,0,0,.4);
		z-index: 999;
		.loading-svg {
			width: 1.5rem;
			position: absolute;
			top: 49%;
			left: 50%;
			margin-left: -0.75rem;
		}
	}
	
</style>