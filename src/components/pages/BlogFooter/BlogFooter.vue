<template>
  <div class="footer-wrapper">
    <div class="main-container footer-container">
      <div class="info">© 2019 remango个人博客网站  <span class="version">version 1.0.0</span></div>
      <div class="connect-me-wrapper">
        <a class="connect-me" href="https://github.com/REmango" target="_blank"><i class="icon iconfont icon-github"></i></a>
        <a class="connect-me" @click="openMenu"><i class="icon iconfont icon-yonghu"></i><span class="about-me">about me</span></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog-footer',
  methods: {
    openMenu () {
      this.$emit('openMenu')
    }
  }
}
</script>

<style scoped lang="less">
  @footer-height:50px;
  .footer-wrapper{
    color: #969696;
    margin-top: 200px;
    border: 1px solid #eee;
    .footer-container{
      display: flex;
      height: @footer-height;
      padding: 0;
      .info{
        flex: 1;
        line-height: @footer-height;
        text-align: center;
        flex-basis: 65%;
        .version{
          margin-left: 10px;
        }
      }
      .connect-me-wrapper{
        flex: 1;
        line-height: @footer-height;
        margin-left: 20px;
        flex-basis: 40%;
        .connect-me{
          color: #333;
          display: inline-block;
          margin-right: 15px;
          opacity: .8;
          .about-me{
            display: inline-block;
            margin-left: 3px;
          }
          &:hover{
            opacity: 1;
          }
        }
      }
    }
  }

</style>
