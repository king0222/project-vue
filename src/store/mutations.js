import {
	UPDATE_LIST

} from './mutation-types.js'


export default {
	[UPDATE_LIST](state, list) {
		state.songlist = list
	}

}
