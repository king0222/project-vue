import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	songlist: [{
		key: 1,
		name: 'ken',
		age: 11
	}],
	message: 'this is a message hahah'
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})