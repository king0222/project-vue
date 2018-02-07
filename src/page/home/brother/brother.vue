<template>
	<div class="brother-page">
		<section class="head_goback" @click="$router.go(-1)">
		<span>返回上一页</span>
		</section>
		<h1>brother page</h1>
	</div>
</template>

<script>
	export default {

	}
</script>


<style lang="scss" scoped>
	.brother-page {
		padding: 10px;
		h1 {
			color: #666;
			font-size: 30px;
			color: #f00;
		}
	}
</style>