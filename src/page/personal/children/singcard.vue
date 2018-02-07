<template>
  <div class="page-holder wrapper">
    <div class="card">
      <img src="../../../assets/img/personal/kaquan/zhekouquan_SVIP.png" alt="">
      <div class="count clearfix">
        <div>
          <div class="title">已使用次数</div>
          <div class="num">0次</div>
        </div>
        <div>
          <div class="title">剩余次数</div>
          <div class="num">0次</div>
          <img class="tip" src="../../../assets/img/personal/p_icon33.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/var.scss';
.card {
  padding-top: 40rem / $unit;
  padding-bottom: 60rem / $unit;
  background-color: #fff;
  text-align: center;

  img {
    display: inline-block;
    width: 610rem / $unit;
  }
}
.count {
  width: 610rem / $unit;
  height: 120rem / $unit;
  margin: 50rem / $unit auto 0;

  & > div {
    position: relative;
    float: left;
    width: 50%;
    height: 100%;
    font-size: 26rem / $unit;
    border-right: 1rem / $unit solid #ccc;

    &:last-child {
      border-right: none;
    }
  }

  .title {
    color: #b3b3b3;
  }
  .num {
    color: #6acc56;
    margin-top: 20rem / $unit;
  }
  .tip {
    display: block;
    position: absolute;
    width: 150rem / $unit;
    height: 45rem / $unit;
    left: (305rem / $unit - 150rem / $unit)/2;
    bottom: -20rem / $unit;
  }
}
</style>


