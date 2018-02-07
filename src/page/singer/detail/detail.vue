<template>
	<div>
		<div class="singer-detail table">
			<div class="singer-info">
				<img class="avatar" :src="cover_path">
				<strong>{{name}}</strong>
			</div>
		</div>
		<h3 class="h3-title">全部<span class="a-z"></span></h3>
		<div class="song-list" v-scroll="getSingerSong" >
			<song-item :songList="singer_songs" @selectSong="selectSong">
			</song-item>
			<div class="loading-more" v-if="loading"><img src="../../../assets/img/loading.svg"></div>
			<div class="loading-more" v-if="none">已经到底了，别拉了！</div>
		</div>
	</div>
</template>

<script>
	import {singerSong2} from '@/service/'
	import {LIMIT} from '@/utils/config'
	import songItem from '@/components/common/songItem'

	export default {
		data() {
			return {
				page: 1,
				songid: 0,
				loading: false,
				none: false,
				singer_songs: [],
				name: '',
				count: 0,
				cover_path: '',
			}
		},
		components: {songItem},
		mounted() {
			this.songid = this.$route.params.id
			this.getSingerSong()
		},
		methods: {
			getSingerSong() {
				return new Promise((resolve, reject) => {
					singerSong2({singerid: this.songid, start: (this.page - 1) * LIMIT, limit: LIMIT}).then(data => {
						if (data.data.success) {
							let result = data.data.data, singer_songs = result.singer_songs, singer = result.singer
							if (singer_songs.length) {
								this.singer_songs = singer_songs	
								this.name = singer.name
								this.count = singer.count
								this.cover_path = singer.url
								this.page += 1
								resolve(singer_songs)
							} else {
								this.none = true
								resolve({none: true})
							}
						} else {
							resolve({})
						}
						this.loading = false
					}).then(err => {
						this.loading = false
						if (err) {
							reject(err)
						}
					})
				})
			},
			selectSong(loading) {
				this.loading = loading
			}
		}
	}
</script>

<style lang="scss" scoped>
	.singer-detail {
		background-image: url('../../../assets/img/song_index_banner.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		padding: 1rem;
		display: flex;
		.singer-info {
			display: flex;
			flex: 1;
			align-items: center;
			color: #fff;
		}
		.avatar {
			width: 5rem;
			height: 5rem;
			outline: none;
			border-radius: 5rem;
			margin-right: .5rem;
			border: .1rem solid #87e3cd;
		}
	}
</style>