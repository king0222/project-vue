import {
	getlist
} from '../service/'
import {
	UPDATE_LIST
} from './mutation-types.js'

export default {

	async getuserList({
		commit,
		state
	}) {
		let res = await getlist();
		console.log('action res is:', res.data)
		commit(UPDATE_LIST, res.data)
	}
}