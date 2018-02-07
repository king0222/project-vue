<template>
	<div class="singers-page">
		<div class="search-holder">
			<div class="search-div">
				<input class="search-input" type="text" @keyup="searchKeyup" placeholder="搜索歌手" ref="searchInput">
				<button class="search-btn" @click="">搜索</button>
			</div>
		</div>
		<div class="search-content">
			<h3 class="h3-title">热门歌星 <span class="a-z"></span></h3>
			<div class="search-result" v-scroll="getSearch">
				<ul>
					<router-link :to="'/singer/' + item.number" tag="li" class="item" v-for="(item, index) in singers" :key="item.id"><a class="alink">{{item.name}}</a></router-link>
				</ul>
				<div class="loading-more" v-if="loading"><img src="../../../assets/img/loading.svg"></div>
				<div class="loading-more" v-if="none">已经到底了，别拉了！</div>
			</div>
		</div>
		<transition name="fade-effect" mode="out-in">
		<scroll-top></scroll-top>
		</transition>
	</div>
</template>

<script>
	import {searchSinger} from '@/service/'
	import {LIMIT} from '@/utils/config'
	import scrollTop from '@/components/common/scrollTop'

	export default {
		data() {
			return {
				page: 1,
				keyword: '',
				loading: false,
				none: false,
				singers: []
			}
		},
		components: {scrollTop},
		mounted() {
			this.keyword = this.$route.params.keyword
			this.$refs.searchInput.value = this.keyword
			this.$refs.searchInput.focus()
			this.getSearch()
		},
		methods: {
			searchKeyup: function(e) {
				this.keyword = e.target.value
			},
			btnSearch() {
				this.page = 1
				this.singers = []
				this.getSearch()
			},
			getSearch() {
				console.log('call get search.....')
				return new Promise((resolve, reject) => {
					this.loading = true
					searchSinger({word: this.keyword, start: (this.page - 1) * LIMIT, limit: LIMIT}).then(data => {

						if (data.data.success) {
							let singers = data.data.data.singers
							if (singers.length) {
								this.singers = this.singers.concat(singers)
								this.page += 1
								resolve(singers)
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
			}
			
		}
	}
</script>

<style lang="scss">
	
</style>