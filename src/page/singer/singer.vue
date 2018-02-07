<template>
	<div class="singers-page">
		<div class="search-holder">
			<div class="search-div">
				<input class="search-input" @keyup="searchKeyup" type="text" placeholder="搜索歌手">
				<router-link :to="'/singersearch/' + keyword" tag="button" class="search-btn">搜索</router-link>
			</div>
		</div>
		<div class="search-country">
			<ul>
				<li class="item"><a :class="location == 0 ? 'alink active' : 'alink'" @click="changeLocation(0)">全部</a></li>
				<li class="item"><a :class="location == 1 ? 'alink active' : 'alink'" @click="changeLocation(1)">大陆</a></li>
				<li class="item"><a :class="location == 2 ? 'alink active' : 'alink'" @click="changeLocation(2)">港台</a></li>
				<li class="item"><a :class="location == 3 ? 'alink active' : 'alink'" @click="changeLocation(3)">欧美</a></li>
				<li class="item"><a :class="location == 4 ? 'alink active' : 'alink'" @click="changeLocation(4)">日韩</a></li>
			</ul>
		</div>
		<div class="search-content">
			<h3 class="h3-title">热门歌星 <span class="a-z"></span></h3>
			<div class="search-result" v-scroll="getHotSinger">
				<ul>
					<router-link :to="'/singer/' + item.number" tag="li" class="item" v-for="(item, index) in hot_singers" :key="item.id"><a class="alink">{{item.name}}</a></router-link>
				</ul>
				<div class="loading-more" v-if="loading"><img src="../../assets/img/loading.svg"></div>
				<div class="loading-more" v-if="none">已经到底了，别拉了！</div>
			</div>
		</div>
		<transition name="slide-fade" mode="out-in">
			<router-view>
			</router-view>
		</transition>
	</div>
</template>

<script>
	import {LIMIT} from '@/utils/config'
	import {hotSinger, singerLetter} from '@/service/'
	export default {
		data() {
			return {
				page: 1,
				location: 0, 
				loading: false,
				none: false,
				keyword: '',
				hot_singers: []
			}
		},
		mounted() {
			this.getHotSinger()
		},
		methods: {
			changeLocation(location) {
				this.location = location
				this.page = 1
				this.none = false
				this.loading = false
				this.hot_singers = []
				this.getHotSinger()
			},
			getHotSinger() {
				return new Promise((resolve, reject) => {
					this.loading = true
					hotSinger({start: (this.page - 1) * LIMIT, limit: LIMIT, location: this.location}).then(data => {
						if (data.data.success) {
							let result = data.data.data.hot_singers
							if (result.length) {
								this.hot_singers = this.hot_singers.concat(data.data.data.hot_singers)
								this.page += 1	
								resolve(result)
							} else {
								this.none = true
								resolve({none: true})
							}
							this.loading = false;					
						} else {
							reject(data)
							this.loading = false
						}
					})
				})
			},
			searchKeyup: function(e) {
				this.keyword = e.target.value
			},
			searchSinger: function(e) {
				if(e.keyCode == 13) {
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../assets/css/var';
	
	
	.search-country {
		background: #fff;
		overflow: hidden;
		.item {
			display: inline-block;
			margin: 0;
			padding: .5rem 0;
			width: 20%;
			text-align: center;
			float: left;
		}
		.alink {
			color: #666;
			display: inline-block;
			padding: .2rem .5rem;
			border-radius: 1rem;
			&.active {
				color: $primaryColor;
				border: 1px solid $primaryColor;
			}
		}
	}
	
</style>