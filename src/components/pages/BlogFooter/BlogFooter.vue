<template>
  <div class="footer-wrapper">
    <div class="main-container footer-container">
      <div class="info">© 2019 remango个人博客网站  <span class="version">version 1.0.0</span></div>
      <div class="connect-me-wrapper"><a class="connect-me">联系我</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog-footer'
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
        flex-basis: 35%;
        .connect-me{
          color: #969696;
          &:hover{
            opacity: .8;
          }
        }
      }
    }
  }

</style>
