<template>
  <div class="title-container" :class="{'enter-animation-active': isActive}">
    <div class="main-title">
      <div class="js-title">Hot</div>
      <div class="content-title">Do you like ...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hot-header',
  data () {
    return {
      isActive: false
    }
  },
  mounted () {
    this.isActive = true
  }
}
</script>

<style lang="less">
  .title-container{
    margin-bottom: 40px;
  }
  .transition{
    transition: 0s 1s;
    -webkit-transition: 0s 1s;
  }
  .translate(@x:0, @y:0){
    transform: translate(@x, @y);
    -webkit-transform: translate(@x, @y);
  }
  .main-title{
    display: block;
    text-align: center;
    .js-title{
      display: inline-block;
      font-size: 50px;
      height: 60px;
      line-height: 60px;
      letter-spacing: 10px;
      padding-right: 10px;
      color: #ff3c1c;
      white-space: nowrap;
      overflow: hidden;
      border-bottom: 1px solid #ff3c1c;
      transform: scale(0, 0);
      .transition;
    }
    .content-title{
      display: inline-block;
      color: #666;
      font-size: 20px;
      margin-left: 10px;
      letter-spacing: 2px;
      overflow: hidden;
      vertical-align: bottom;
      .translate(30px);
      .transition;
      opacity: 0;
    }
  }
  .enter-animation-active {
    .main-title {
      .js-title{
        transform: scale(1, 1);
        transition: .8s .5s ease-out;
        -webkit-transition: .8s .5s ease-out;
        -webkit-animation: bounceIn .8s .5s ease-out;
        animation: bounceIn .8s .5s ease-out;
      }
      .content-title{
        transition: .5s 1.3s ease-out;
        -webkit-transition: .5s 1.3s ease-out;
        transform: translateX(0);
        -webkit-transform: translateX(0);
        opacity: 1;
      }
    }
  }

  /*动画模块*/
  @keyframes bounceIn {
    0%{
      opacity: 0;
      -webkit-transform: scale(.3);
    }
    50% {
      opacity: 1;
      -webkit-transform: scale(1.05);
    }
    70% {
      -webkit-transform: scale(.9);
    }
    100% {
      -webkit-transform: scale(1);
    }
  }
</style>
