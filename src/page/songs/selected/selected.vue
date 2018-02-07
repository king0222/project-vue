<template>	
	<div class="selected-holder">
		<div v-if="songs.length">
			<div class="song-item table" v-for="(item, index) in songs" :key="item.songid">
				<span class="num table-cell">{{index + 1}}</span>
				<div class="content table-cell">
					<p class="name">{{item.song_name}}</p>
					<p class="text-light-grey">
						<span :class="'tag tag-'+item.format_code">{{item.format}}</span>
						{{item.singer}}
					</p>
				</div>
				<div class="op table-cell">
					<button class="op-btn del" @click="deleteSong(item.songid)"></button>
				</div>
			</div>
		</div>
		<div v-else class="loading-more" >
			<p>没有已选歌曲！</p>
		</div>
	</div>
</template>

<script>
	import {selectSong, deleteSong} from '@/service/'
	export default {
		data() {
			return{
				songs: [],
				tag: false
			}
		},
		created() {
			this.getSelected()
		},
		methods: {
			getSelected() {
				selectSong({user_from: 0}).then(data => {
					if(data.data.success) {
						this.songs = data.data.data.songs
					}
				})
			},
			deleteSong(id) {
				deleteSong({songid: id}).then(data => {
					if(data.data.success) {
						alert('删除成功！')
						this.getSelected()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.selected-holder {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: auto;
		background: #fff;
		z-index: 9999;
	}
</style>