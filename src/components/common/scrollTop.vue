<template>
	<div v-if="showScroll" class="scroll-top" @click="scrollTop">
	top
	</div>
</template>
<script>
	export default {
		data() {
			return {
				showScroll: false
			}
		},
		created() {
			window.addEventListener('scroll', this.ifScrollTop, false)
		},
		destroy() {
			window.removeEventListener('scroll', this.ifScrollTop, false)
		},
		methods: {
			ifScrollTop() {
				if (document.body.scrollTop > 500) {
					this.showScroll = true
				} else {
					this.showScroll = false
				}
			},
			scrollTop() {
				window.scrollTo(0, 0)
			}
		}
	}
</script>

<style lang="scss">
	.scroll-top {
		width: 2.5rem;
		height: 2.5rem;
		background: rgba(60,60,60,.3);
		position: fixed;
		text-align: center;
		line-height: 2.5rem;
		bottom: 1rem;
		right: 1rem;
		color: #fff;
		border-radius: .5rem;
		z-index: 999;
	}
</style>