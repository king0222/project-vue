<template>
  <div class="wrapper">
    <transition name="fade-effect" mode="out-in">
      <keep-alive>
        <loading v-if="loading"></loading>
      </keep-alive>
    </transition>
    <div>
      <a href="/tel_register" class="register-link" v-if="!isRegister">
        <span>注册会员可以享受更多特权，快来注册吧！</span>
        <span class="register-text">立即注册></span>
      </a>
      <div class="user-info">
        <div class="listen-count">{{num}}</div>
        <router-link class="sing-card" to="/personal/del_members">
          <img src="../../assets/img/personal/p_icon35.png" alt="">
        </router-link>
        <div class="avatar">
          <img :src="user.imgurl" alt="">
        </div>
        <div class="name">{{user.wx_nickname}}</div>
        <div class="info" v-if="isRegister">
          {{user.birthday ? user.birthday + ' | ' : ''}}
          {{user.province}}
          {{user.city}}
        </div>
        <div class="sign">{{user.sign || '留下签名是迈向歌王的第一步'}}</div>
      </div>
      <div class="operates">
        <a class="operate o-poket"><span>我的钱包</span></a>
        <a class="operate o-volume"><span>咪哒卡券</span></a>
        <a class="operate o-album"><span>我的相册</span></a>
        <a class="operate o-message"><span>我的消息</span><span class="message" v-if="messageNum !== 0">{{messageNum}}</span></a>
        <a class="operate o-setting"><span>设置</span></a>
      </div>
      <div class="operates">
        <a class="operate o-shop"><span>我要开店</span></a>
        <a class="operate o-feedback"><span>我要反馈</span></a>
      </div>
    </div>
    <div>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import loading from '@/components/common/loading'
import { userInfo } from '../../service'
export default {
  data() {
    return {
      loading: false,
      user: {},
      enjoySingCard: false,
      messageNum: 0,
      money: 0,
      num: 8
    }
  },
  computed: {
    isRegister() {
      return !!this.user.msisdn
    }
  },
  components: {
    loading
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      this.loading = true
      const { data } = await userInfo()
      if (data && data.success) {
        this.enjoySingCard = data.data.enjoy_sing_card
        this.messageNum = data.data.message_num
        this.money = data.data.money
        this.num = data.data.num
        this.user = data.data.user
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/var.scss';
.wrapper {
  height: 100%;
  background-color: rgb(245, 245, 245);
}
.register-link {
  display: block;
  background-color: #ebb14d;
  height: 80rem / $unit;
  line-height: 80rem / $unit;
  text-align: center;

  & > span {
    display: inline-block;
    color: #fff;
    font-size: 26rem / $unit;
  }

  .register-text {
    margin-left: 30rem / $unit;
    font-size: 32rem / $unit;
  }
}
.user-info {
  position: relative;
  height: 420rem / $unit;
  padding-top: 30rem / $unit;
  background-image: url(../../assets/img/personal/p_bg1.jpg);
  background-repeat: no-repeat;
  background-size: 100% auto;
  text-align: center;

  .listen-count {
    position: absolute;
    top: 30rem / $unit;
    right: 0;
    padding-left: 40rem / $unit;
    padding-right: 30rem / $unit;
    background: url(../../assets/img/personal/p_icon8.png) no-repeat left center;
    background-size: auto 90%;
    color: #fff;
  }
  .avatar {
    width: 198rem / $unit;
    height: 198rem / $unit;
    margin: 0 auto;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.7);

    & > img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .name {
    padding-top: 10rem / $unit;
    padding-bottom: 10rem / $unit;
    color: #fff;
    font-size: 36rem / $unit;
  }
  .sign {
    color: #49d5b4;
  }
  .info {
    color: #fff;
    opacity: 0.5;
    padding-bottom: 10rem / $unit;
  }
  .sing-card {
    position: absolute;
    width: 112rem / $unit;
    height: 119rem / $unit;
    right: 15rem / $unit;
    top: 75rem / $unit;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
.operates {
  margin-top: 30rem / $unit;
  background-color: #fff;

  .operate {
    display: block;
    position: relative;
    height: 100rem / $unit;
    line-height: 100rem / $unit;
    padding-left: 100rem / $unit;
    padding-right: 30rem / $unit;
    border-bottom: 1rem / $unit solid #efefef;
    background-size: 46rem / $unit;
    background-position: 30rem / $unit;
    background-repeat: no-repeat;

    &:last-child {
      border-bottom: none;
    }

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 30rem / $unit;
      width: 12rem / $unit;
      height: 20rem / $unit;
      background-image: url(../../assets/img/personal/p_icon7.png);
      background-size: cover;
      transform: translateY(-50%);
    }
  }

  .o-poket {
    background-image: url(../../assets/img/personal/p_icon4.png);
  }
  .o-volume {
    background-image: url(../../assets/img/personal/p_icon12.png);
  }
  .o-album {
    background-image: url(../../assets/img/personal/icon-pic.png);
  }
  .o-message {
    background-image: url(../../assets/img/personal/p_icon29.png);

    .message {
      position: absolute;
      right: 70rem / $unit;
      top: 50%;
      min-width: 46rem / $unit;
      height: 46rem / $unit;
      line-height: 46rem / $unit;
      text-align: center;
      background-color: #ff5454;
      color: #fff;
      border-radius: 50%;
      transform: translateY(-50%);
    }
  }
  .o-setting {
    background-image: url(../../assets/img/personal/p_icon5.png);
  }
  .o-shop {
    background-image: url(../../assets/img/personal/p_icon36.png);
  }
  .o-feedback {
    background-image: url(../../assets/img/personal/p_icon6.png);
  }
}
</style>
