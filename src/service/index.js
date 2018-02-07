const qs      = require('qs');
import fetch from '../utils/fetch'
import util from '../utils/util'
import {USER_FROM} from '@/utils/config'

const _extend = (params) => {
	return {
		...params,
		user_from: USER_FROM,
		token: util.getCookie('token') || util.getQueryString('token'),
		t: new Date().getTime()
	}
}

export const getlist = (option) => fetch('list', {})


export const login = (option) => fetch(`login/?${qs.stringify(_extend(option))}`)


export const log = (option) => fetch(`log/?${qs.stringify(_extend(option))}`, {})


export const userInfo = (option) => fetch(`user/user_info/?${qs.stringify(_extend(option))}`, {})


export const hotSong = (option) => fetch(`choice_song/hot_song/?${qs.stringify(_extend(option))}`, {})


export const singerSong2 = (option) => fetch(`choice_song/singer_songs2/?${qs.stringify(_extend(option))}`, {})

export const userMessage = (option) => fetch(`user/message/?${qs.stringify(_extend(option))}`, {})

export const orderBuy = (option) => fetch(`order/buy/?${qs.stringify(_extend(option))}`, {})

export const recommend2 = (option) => fetch(`choice_song/new_recommend2/?${qs.stringify(_extend(option))}`, {})


export const recommendDetail2 = (option) => fetch(`choice_song/new_song_recommend2/?${qs.stringify(_extend(option))}`, {})


export const hotSinger = (option) => fetch(`choice_song/hot_singer/?${qs.stringify(_extend(option))}`, {})


export const singerLetter = (option) => fetch(`choice_song/singer_letter/?${qs.stringify(_extend(option))}`, {})

export const singerByLetter = (option) => fetch(`choice_song/singer_by_letter/?${qs.stringify(_extend(option))}`, {})

export const searchSinger = (option) => fetch(`choice_song/search_singer/?${qs.stringify(_extend(option))}`, {})

export const searchSong = (option) => fetch(`choice_song/search_song/?${qs.stringify(_extend(option))}`, {})

export const lackSong = (option) => fetch(`choice_song/lack_song/?${qs.stringify(_extend(option))}`, {})

export const searchWord = (option) => fetch(`choice_song/search_word/?${qs.stringify(_extend(option))}`, {})

export const wechat = (option) => fetch(`wechat_jssdk/?${qs.stringify(_extend(option))}`, {})

//已选歌曲
export const selectSong = (option) => fetch(`choice_song/play_song/?${qs.stringify(_extend(option))}`, {})

//删除歌曲
export const deleteSong = (option) => fetch(`choice_song/play_song/?${qs.stringify(_extend(option))}`, {method: 'DELETE'})

export const userStatus = (option) => fetch(`choice_song/user_status/?${qs.stringify(_extend(option))}`, {})

export const newRecord = (option) => fetch(`square/new/?${qs.stringify(_extend(option))}`, {})

export const weeklyRecord = (option) => fetch(`square/week/?${qs.stringify(_extend(option))}`, {})

export const hotRecord = (option) => fetch(`square/hot/?${qs.stringify(_extend(option))}`, {})

export const orderCoupon = (option) => fetch(`order/coupon/?${qs.stringify(_extend(option))}`, {})

export const canBuyPackage = (option) => fetch(`order/can_buy_package?${qs.stringify(_extend(option))}`, {})

export const orderUseCoupon = (option) => fetch(`order/use_coupon?${qs.stringify(_extend(option))}`, {})

export const recommendRecord = (option) => fetch(`square/recommend?${qs.stringify(_extend(option))}`, {})

export const encounterRecord = (option) => fetch(`square/encounter/?${qs.stringify(_extend(option))}`, {})

export const behavior = (option) => fetch(`user_behavior/search_behavior/?${qs.stringify(_extend(option))}`, {})

export const setLocation = (option) => fetch(`choice_song/location/?${qs.stringify(_extend(option))}`, {})

export const setsignin = (option) => fetch(`choice_song/sign_in/?${qs.stringify(_extend(option))}`, {})

export const received = (option) => fetch(`h5_activity/received/?${qs.stringify(_extend(option))}`, {})

export const isFollow = (option) => fetch(`user/is_follow/?${qs.stringify(_extend(option))}`, {})

export const receivedInfo = (option) => fetch(`h5_activity/info/?${qs.stringify(_extend(option))}`, {})

export const myRecord = (option) => fetch(`record/my_record?${qs.stringify(_extend(option))}`, {})

export const recordEditor = (option) => fetch(`record/record_editor?${qs.stringify(_extend(option))}`, {})

export const RecordPlay = (option) => fetch(`record/record_play?${qs.stringify(_extend(option))}`, {})

export const activitysWork = (option) => fetch(`activity/work?${qs.stringify(_extend(option))}`, {})

export const activitys = (option) => fetch(`voucher_new/activity_new/?${qs.stringify(_extend(option))}`, {})

export const ticketOfActivity = (option) => fetch(`voucher_new/ticket_new/?${qs.stringify(_extend(option))}`, {})

export const userJoinGame = (option) => fetch(`activity/user_join_game/?${qs.stringify(_extend(option))}`, {})

export const userJoinGameSong = (option) => fetch(`activity/user_join_game_song/?${qs.stringify(_extend(option))}`, {})

export const getRankSong = (option) => fetch(`activity/get_rank_song/?${qs.stringify(_extend(option))}`, {})

export const getFirstRankSong = (option) => fetch(`activity/get_first_rank_song/?${qs.stringify(_extend(option))}`, {})

export const getActivityDetail = (option) => fetch(`activity/get_activity_detail/?${qs.stringify(_extend(option))}`, {})

export const getRecordComment = (option) => fetch(`record/comment/?${qs.stringify(_extend(option))}`, {})

export const RecordComment = (option) => fetch(`record/get_comment/?${qs.stringify(_extend(option))}`, {})

export const receivePackage = (option) => fetch(`h5_activity/receive_package/?${qs.stringify(_extend(option))}`, {})

export const h5ActivitySendCode = (option) => fetch(`h5_activity/send_code/?${qs.stringify(_extend(option))}`, {})

export const h5ActivityPhoneReceived = (option) => fetch(`h5_activity/phone_received/?${qs.stringify(_extend(option))}`, {})

export const activityList = (option) => fetch(`activity/activity/?${qs.stringify(_extend(option))}`, {})

export const xiaojinzhong = (option) => fetch(`xiaojinzhong_log/?${qs.stringify(_extend(option))}`, {})

export const recordShareSong = (option) => fetch(`record/share_song/?${qs.stringify(_extend(option))}`, {})

export const useTicket = (option) => fetch(`ticket?${qs.stringify(_extend(option))}`, {})

export const challengeRoomOwner = (option) => fetch(`activity/challenge_room_owner?${qs.stringify(_extend(option))}`, {})

export const activityKtv = (option) => fetch(`activity/activity_ktv?${qs.stringify(_extend(option))}`, {})

export const sendRegisterCheckCode = (option) => fetch(`user/send_register_check_code?${qs.stringify(_extend(option))}`, {})

export const internationCode = (option) => fetch(`user/internation_code/?${qs.stringify(_extend(option))}`, {})

export const enjoySingingCard = (option) => fetch(`enjoy_singing_card/card_info?${qs.stringify(_extend(option))}`, {})

export const enjoySingingSendMessage = (option) => fetch(`enjoy_singing_card/send_message?${qs.stringify(_extend(option))}`, {})

export const enjoySingingRewardCoupon = (option) => fetch(`enjoy_singing_card/reward_coupon?${qs.stringify(_extend(option))}`, {})
