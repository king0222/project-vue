<template>
	<div class="wrapper songs-index">
		<transition name="fade-effect" mode="out-in">
      		<keep-alive>
      			<loading v-if="loading"></loading>
      		</keep-alive>
  		</transition>

		<div class="user-info">
			<div class="info-holder table">
				<div class="table-cell info-avatar">
					<img class="img scan-btn" src="../../assets/img/scan_btn.png">
				</div>
				<div class="table-cell info-content">
					<div class='info-txt'>
						<p class="text-deep-gray welcome">欢迎使用咪哒miniK!</p>
					</div>
				</div>
				<div class="table-cell info-btn">
					<a class="btn scan-btn" href="javascript:void(0);">购买套餐</a>
				</div>
			</div>
		</div>
		<div class="main-category">
			<div class="search-bar">
				<input class="search" placeholder="搜索歌曲/歌手" />
			</div>
			<div class="flex-row">
				<div class="flex-cell">
					<router-link to="/recommend" class="cat newsong">
						<p class="cat-title">新歌推荐</p>
					</router-link>
				</div>
				<div class="flex-cell">
					<router-link to="/singer" class="cat singer">
						<p class="cat-title">歌星选歌</p>
					</router-link>
				</div>
				<div class="flex-cell">
					<router-link to="/songs/selected" class="cat selected">
						<p class="cat-title">已选歌单</p>
					</router-link>
				</div>
			</div>
		</div>
		<h3 class="h3-title">热门歌曲</h3>
		<div class="song-list" v-scroll="getSongList" >
			<song-item :songList="songList" @selectSong="selectSong">
			</song-item>
			<div class="loading-more" v-if="loading"><img src="../../assets/img/loading.svg"></div>
			<div class="loading-more" v-if="none">已经到底了，别拉了！</div>
		</div>
		<transition name="slide-fade" mode="out-in">
			<router-view>
			</router-view>
		</transition>
	</div>
</template>

<script>
	import loading from '@/components/common/loading'
	import {hotSong, selectSong} from '../../service/'
	import songItem from '@/components/common/songItem'
	export default {
		data() {
			return {
				page: 1,
				limit: 20,
				none: false,
				loading: false,
				songList: []
			}
		},
		components: {loading, songItem},
		created() {
			this.getSongList()
		},
		mounted() {
		},
		destroy() {
		},
		computed: {
		},
		methods: {
			getSongList() {
				return new Promise((resolve, reject) => {
					let limit = this.limit;
					hotSong({user_from: 0, limit: this.limit, start: ((this.page - 1) * limit)}).then(data => {
						let result = data.data.data.hot_songs
						if (result && result.length) {
							this.songList = this.songList.concat(result)
							resolve(data)
						} else {
							this.none = true
							resolve({none: true})
						}
						this.page += 1;
					}).then(err => {
						reject(err);
					})
				})
			},
			selectSong(loading) {
				this.loading = loading
			}
		}
	}
</script>


<style lang="scss">
	@import '../../assets/css/var.scss';
	$unit: 40;
	.songs-index {
		padding-top: 3.25rem;

		.user-info {
			position: fixed;
			height: 3.25rem;
			top: 0;
			width: 100%;
			background: #fff;
			z-index: 9;
		}
		.info-holder {
			height: 3.25rem;
		}
		.info-avatar,
		.info-btn {
			text-align: center;
		}
		.info-btn {
			width: 4.5rem;
		}

		img.scan-btn {
			width: 2rem;
		}



		a.scan-btn {
			display: inline-block;
			background: orange;
			line-height: 1.5rem;
			color: #fff;
			border-radius: 30px;
			padding: 5px 10px;
			width: 4rem;
			text-align: center;
		}
	}


	.main-category {
		background-image: url(../../assets/img/song_index_banner.jpg);
		background-size: cover;
		height: 10rem;
		padding: 30rem / $unit;
		padding-top: 45rem / $unit;
		.cat {
			width: 220rem / $unit;
			height: 181rem / $unit;
			margin-top: 45rem / $unit;
			margin-left: auto;
			margin-right: auto;
			text-align: center;
			position: relative;
			border-radius: 5px;
			background-position: center center;
			background-size: cover;
			background-repeat: no-repeat;
		}
		.cat-title {
			position: absolute;
			bottom: 0;
			width: 100%;
			text-align: center;
			line-height: 1.3rem;
		}
		.newsong {
			background-image: url(../../assets/img/pick_cat_1.png);
		}
		.singer {
			background-image: url(../../assets/img/pick_cat_2.png);
		}
		.selected {
			background-image: url(../../assets/img/pick_cat_3.png);
		}
	}

	.search-bar {
		height: 1.5rem;
		border-radius: 1.5rem;
		background: rgba(255,255,255,.2);
		border: 1px solid #fff;
		.search {
			height: 1.4rem;
		    padding: .5rem;
		    width: 100%;
		    background-color: transparent;
		    outline: none;
		}
	}

	.song-list {
		background: #fff;

	}


	.fade-effect-enter-active {
	    transition: all .4s linear;
	}
	.fade-effect-leave-active {
	    transition: all .4s linear;
	}
	.fade-effect-enter, .fade-effect-leave-to{
	    opacity: 0;
	}

</style>
