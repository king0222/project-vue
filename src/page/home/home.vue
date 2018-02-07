<template>
	<div>

        <img src="../../assets/img/record_minik_icon.png">
		<p>这是当前state里面的数据：{{text}}</p>

		<p>这是store里面的数据：{{message}}</p>

		<input v-model="inputText">
		<p>测试v-model数据：{{inputText}}</p>

		<button :xx="some" @click="dosome">更新当前state的列表</button>
		<ul>
			<li v-for="item in items" :key="item.id">
				name:{{item.name}}--age：{{item.age}}
			</li>
		</ul>

		<button @click="doupdate">更新store的列表</button>
		<ul>
			<li v-for="term in songlist" >
				名字：{{term.name}}--年龄{{term.age}}
			</li>
		</ul>
		
		<router-link to="/child">
			<span>go child</span>
		</router-link>
		<router-link to="/brother">
			<span>go brother</span>
		</router-link>
		<transition name="slide-fade" mode="out-in">
            <router-view @updateText="updateText"></router-view>
        </transition>
	</div>
</template>

<script>
	import Helloworld from '@/components/HelloWorld'
	import {mapState, mapActions, mapMutations} from 'vuex'
	import {getlist} from '../../service/index'
	export default {
		data() {
			return {
				text: '标题',
				some: '这是一颗小星星属性',
				inputText: '',
				items: []
			}
		},
		props: [],
		components: {Helloworld},
		created() {
			console.log('component craeted!')
		},
		mounted() {
			console.log('component mounted')
			//this.getuserList();
			
		},
		destroy() {
			console.log('component destroy')
		},
		computed: {
			...mapState(['message', 'songlist'])
		},
		methods: {
			...mapActions(['getuserList']),
			...mapMutations(['UPDATE_LIST']),
			getlist: function() {
				getlist().then(data => {
					this.items = data.data
				})
			},
			dosome() {
				this.getlist()
			},
			doupdate() {
				let obj = {
					name: `ken${Math.random()*10000}`,
					age: Math.random()*100
				}
				this.$store.commit('UPDATE_LIST', [obj])
				//this.UPDATE_LIST([obj])
			},
			updateText: function(text) {
				this.text = text
			}
		}
	}
</script>

<style>

</style>