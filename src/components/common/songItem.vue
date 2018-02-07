<template>
	<div>
		<div class="song-item table" v-for="(item, index) in songList" :key="item.songid" @click="selectSong(item.songid)">
			<span class="num table-cell">{{index + 1}}</span>
			<div class="content table-cell">
				<p class="name">{{item.song_name}}</p>
				<p class="text-light-grey">
					<span :class="'tag tag-' + item.format_code">{{item.format}}</span>
					{{item.singer}}
				</p>
			</div>
			<div class="op table-cell">
				<button :class="item.song_status == 0 ? 'op-btn mike' : 'op-btn mike disabled'" :data-id="item.songid"></button>
			</div>
		</div>
	</div>
</template>

<script>
	import {selectSong} from '@/service/'
	export default {
		data() {
			return {
				loading: false
			}
		},
		props: ['songList'],
		created() {

		},
		mounted() {

		},
		methods: {
			selectSong(id) {
				this.loading = true
				this.$emit('selectSong', true)
				selectSong({
					songid: id
				}).then(data => {
					if (data.data.success) {
						this.songList.map(item => {
							if (item.songid === id) {
								item.song_status = 1;
							}
						})
					}
					this.loading = false
					this.$emit('selectSong', false)
				}).then(err => {
					this.loading = false
					this.$emit('selectSong', false)
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>