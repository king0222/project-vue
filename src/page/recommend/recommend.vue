<template>
	<div class="recommend-holder">
		<router-link :to="{path: '/recommend/detail', query:{isdefault: item.isdefault, id: item.id}}" v-for="(item, index) in recommendList" :key="item.id" class="recommend-item">
			<img class="recommend-img" :src="item.main_img_url">
			<div class="mask">
				<div class="title">
					<h3>{{item.main_title}}</h3>
				</div>
			</div>
		</router-link>
		<div>
			<transition name="slide-fade" mode="out-in">
				<router-view>
				</router-view>
			</transition>
		</div>
	</div>
</template>

<script>
	import {recommend2} from '@/service/'
	export default {
		data() {
			return {
				recommendList: []
			}
		},
		created() {
			this.getRecommend()
		},
		methods: {
			getRecommend() {
				recommend2().then(data => {
					if(data.data.success) {
						this.recommendList = data.data.data.recommends
					}

				})
			}
		}
	}
</script>

<style lang="scss">
	.recommend-item {
		position: relative;
		display: block;
		margin-bottom: 10px;
		border-radius: .4rem;

		.recommend-img {
			display: block;
			width: 100%;
		}
		.mask {
			position: absolute;
			background: rgba(0,0,0,.6);
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			border-radius: .4rem;
		}
		.title {
			color: #fff;
			text-align: center;
			font-size: .8rem;
			position: absolute;
			top: 50%;
			width: 100%;
			line-height: 1rem;
			margin-top: -0.5rem;
			h3, p {
				color: #fff;
			}
		}
	}

</style>
