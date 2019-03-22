<template>
  <div class="container">
    <h1>404</h1>
    <div class="error-msg">您输入了错误的网址或者网页已被管理员删除</div>
    <router-link :to="{ name: 'index'}" class="home-link">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'pageNoFound'
}
</script>

<style scoped lang="less">
.container{
  max-width: 740px;
  margin: 0 auto;
  padding: 80px 20px;
  h1{
    margin-bottom: 15px;
  }
  .error-msg{
    color: #999;
    font-size: 1.2rem;
    border-left: .25rem solid #dfe2e5;
    margin-left: 0;
    padding-left: 1rem;
  }
  .home-link{
    height: 60px;
    line-height: 60px;
    color: #00C0FF;
    font-size: 16px;
    letter-spacing: 1px;
  }
}
</style>
