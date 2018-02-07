<template>
	<div class="recommend-holder">
		<div class="recommend_desc">
			<img :src="album_brief_url">
			<p class="title">{{album_name}}</p>
		</div>
		<div class="img-txt">
			{{img_txt}}
		</div>
		<h3 class="h3-title">歌单</h3>
		<song-item :songList="recommendList">
		</song-item>
	</div>
</template>

<script>
	import songItem from '@/components/common/songItem'
	import {recommendDetail2} from '@/service/'
	export default {
		data() {
			return {
				recommendList: [],
				album_brief_url: '',
				album_name: '',
				img_txt: ''
			}
		},
		components: {songItem},
		created() {
			this.getRecommendDetail()
		},
		methods: {
			async getRecommendDetail(option) {
				let {isdefault, id} = this.$route.query;
				let data = await recommendDetail2({isdefault: isdefault, id: id})
				if (data.data.success) {
					let recommendDetail = data.data.data.recommend
					this.recommendList = data.data.data.song_recommends
					this.album_brief_url = recommendDetail.album_brief_url
					this.album_name = recommendDetail.album_name
					this.img_txt = recommendDetail.img_txt
				}
			}
		}
	}
</script>

<style lang="scss">
	.recommend-holder {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: auto;
		background: #fff;
		z-index: 9999;

		.recommend_desc {
			position: relative;
			img {
				display: block;
				width: 100%;
			}
			.title {
				position: absolute;
				width: 100%;
				line-height: 2rem;
				background: rgba(0,0,0,.6);
				color: #fff;
				bottom: 0;
				font-size: .8rem;
				text-indent: 1rem;
				border-bottom-left-radius: .4rem;
				border-bottom-right-radius: .4rem;
			}
		}

		.img-txt {
			text-indent: 1rem;
			padding: 10px;
			max-height: 8rem;
			overflow: auto;
			line-height: 1rem;
		}
	}
</style>