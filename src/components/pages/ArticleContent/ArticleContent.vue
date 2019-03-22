<template>
  <div>
    <nav class="nav nav-top">
      <div class="nav-header">
        <div class="logo-wrapper clearfix">
          <router-link :to="{ name: 'index'}" class="logo">博客</router-link>
        </div>
        <div class="login-register-wrapper">
          <el-button size="medium" class="nav-btn" @click="toLoginPage()">登录</el-button>
          <el-button size="medium" class="nav-btn">注册</el-button>
        </div>
        <div class="main-container">
          <div class="write-btn-wrapper">
            <a class="write-btn" @click="toWriteArticlePage()">写博客</a>
          </div>
          <ul class="header-list">
            <li class="header-item clearfix">
              <a class="nav-link">首页</a>
            </li>
            <li class="header-item clearfix">
              <a  class="nav-link">热点</a>
            </li>
            <li class="header-item clearfix">
              <a class="nav-link">时间轴</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="main-container">
      <div class="article-wrapper">
        <div class="article-title">
          这是一个标题
        </div>
        <div class="blog-info">
          <span class="blog-info-item"><i class="icon iconfont icon-yonghutouxiang"></i> {{author}}
          </span>
          <span class="blog-info-item" v-if="publishTime">
            <i class="icon iconfont icon-rili1"></i> {{publishTime}}
          </span>
          <span class="blog-info-item">
            <i class="icon iconfont icon-biaoqian"></i> {{categories}}
          </span>
          <span class="blog-info-item">
            <i class="icon iconfont icon-shu"></i> {{visits}}
          </span>
        </div>
        <div class="article-content">
        <div id="wordsView">
          <textarea style="display:none;" name="editormd-markdown-doc" id="mdText"></textarea>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-content',
  data () {
    return {
      articleTitle: '',
      publishTime: '',
      author: '',
      categories: '',
      visits: 0,
      queryArticleByIdAuthorUrl: '/blog/queryArticleByIdAuthor'
    }
  },
  mounted () {
    this.initArticleCont()
  },
  methods: {
    initArticleCont () {
      let params = this.getArticleParamObj()
      this.axios.get(this.queryArticleByIdAuthorUrl, {
        params: params
      }).then(response => {
        this.articleTitle = response.data.data.articleTitle
        this.author = response.data.data.author
        this.publishTime = this.getFormatDate(response.data.data.createTime)
        this.categories = this.getCategoriesList(response.data.data.categories)
        this.visits = response.data.data.visits
        $('#mdText').text(response.data.data.content)
        editormd.markdownToHTML('wordsView', {
          htmlDecode: 'true', // you can filter tags decode
          emoji: true,
          taskList: true,
          tex: true,
          flowChart: true,
          sequenceDiagram: true
        })
        console.log(response.data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getArticleParamObj () {
      let paramObj = {}
      let param = window.location.href.split('?')[1]
      let paramList = param.split('&')
      paramList.forEach((currentValue) => {
        let array = currentValue.split('=')
        let label = array[0]
        let value = array[1]
        paramObj[label] = value
      })
      return paramObj
    },
    toLoginPage () {
      this.$router.push({name: 'login'})
    },
    toWriteArticlePage () {
      this.$router.push({name: 'writeArticle'})
    },
    getCategoriesList (Categories) {
      return Categories.split(',').join(' ')
    },
    getFormatDate (time) {
      let date = new Date(time)
      let yyyy = date.getFullYear()
      let moth = date.getMonth() + 1
      let MM = moth >= 10 ? moth : '0' + moth
      let dd = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
      let HH = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
      let mm = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
      let ss = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
      return `${yyyy}-${MM}-${dd}  ${HH}:${mm}:${ss}`
    }
  }
}
</script>

<style scoped lang="less">
  .article-wrapper{
    margin-top: 40px;
    .article-title{
      font-size: 32px;
      text-align: left;
      font-weight: 600;
      color: #333;
      letter-spacing: 2px;
    }
    .blog-info{
      font-size: 12px;
      color: #777;
      margin: 25px 0 35px;
      .blog-info-item{
        margin-right: 20px;
        .iconfont{
          font-size: 12px;
        }
      }
    }
    .article-content{
      padding: 10px 0;
    }
  }
</style>
