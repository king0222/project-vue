<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      </transition>
      <transition name="slide-fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  import util from './utils/util'
  import {login} from './service/'
  export default {
    data() {
      return {

      }
    },
    mounted() {
      this.login()
    },
    methods: {
      login() {
        login({uid: 646608}).then(data => {
          if (data.data.success) {
            util.setCookie('token', data.data.data)
            localStorage.setItem('token', data.data.data)
          }          
        }).then(err => {
          if(err) {
            console.log('login err is:', err)
          }
        })
      }
    }
  }

</script>

<style lang="scss">
  @import './assets/css/base';
  @import './assets/css/component.scss';

  #app {
    font-family: "Microsoft Yahei", Arial, sans-serif;
    font-size: .7rem;
    height: 100%;
  }
</style>
