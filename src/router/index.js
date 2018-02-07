
import HelloWorld from '@/components/HelloWorld'
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const brother = r => require.ensure([], () => r(require('../page/home/brother/brother')), 'brother')

const songs = r => require.ensure([], () => r(require('../page/songs/songs')), 'songs')
const selected = r => require.ensure([], () => r(require('../page/songs/selected/selected')), 'selected')
const recommend = r => require.ensure([], () => r(require('../page/recommend/recommend')), 'recommend')
const recommendDetail = r => require.ensure([], () => r(require('../page/recommend/children/detail')), 'recommendDetail')
const singer = r => require.ensure([], () => r(require('../page/singer/singer')), 'singer')
const singerDetail = r => require.ensure([], () => r(require('../page/singer/detail/detail')), 'singer')
const singerSearch = r => require.ensure([], () => r(require('../page/singer/search/search')), 'singerSearch')
const personal = r => require.ensure([], () => r(require('../page/personal/personal')), 'personal')
const personalSingcard = r => require.ensure([], () => r(require('../page/personal/children/singcard')), 'personal')

export default [{
    path: '/',
    component: home,
    children: [
	    {
	    	path: 'child',
	    	component: HelloWorld
	    }
    ]
}, {
	path: '/brother',
	component: brother
}, {
	path: '/songs',
	component: songs,
	children: [
		{
			path: '/songs/selected',
			component: selected
		}
	]
}, {
	path: '/recommend',
	component: recommend,
	children: [
		{
			path: '/recommend/detail',
			component: recommendDetail
		}
	]
}, {
	path: '/singer',
	component: singer
}, {
	path: '/singer/:id',
	component: singerDetail
}, {
	path: '/singersearch/:keyword',
	component: singerSearch
}, {
  path: '/personal',
  component: personal,
  children: [
    {
      path: '/personal/del_members',
      component: personalSingcard
    }
  ]
}]
