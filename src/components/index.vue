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
              <a class="nav-link"><i class="icon iconfont icon-home1"></i>首页</a>
            </li>
            <li class="header-item clearfix">
              <a class="nav-link"><i class="icon iconfont icon-redu"></i>热点</a>
            </li>
            <li class="header-item clearfix">
              <a class="nav-link">时间轴</a>
            </li>
            <li class="header-item clearfix">
              <el-input
                size="mini"
                placeholder="请输入搜索内容"
                suffix-icon="el-icon-search"
                v-model="articleData"
                @keyup.enter.native="searchArticlesByKey"
                class= "search-input">
              </el-input>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="main-container">
      <div class="canvas-wrapper">
        <div class="joke">
          ——上帝向人间洒满智慧，而我却打起了伞
        </div>
        <img class="umbrella" src="@/common/img/umbrella.png"/>
        <canvas id="canvas" class="canvas" height="200" width="960"></canvas>
      </div>
      <div class="blog-container">
        <div class="blog-content-wrapper">
          <ul class="blog-list">
            <li class="blog-item" v-for="article in articlesList" :key="article.id">
              <a class="blog-title" @click="toArticleContentPage(article.articleId, article.author)">{{article.articleTitle}}</a>
              <div class="blog-info">
                <span class="blog-info-item">
                  <i class="icon iconfont icon-yonghutouxiang"></i> {{article.author}}
                </span>
                <span class="blog-info-item" v-if="article.createTime">
                  <i class="icon iconfont icon-rili1"></i> {{getFormatDate(article.createTime)}}
                </span>
                <span class="blog-info-item">
                  <i class="icon iconfont icon-biaoqian"></i> {{getCategoriesList(article.categories)}}
                </span>
              </div>
              <p class="blog-summary">{{article.summary + '...'}}
              </p>
            </li>
          </ul>
        </div>
        <div class="blog-sidebar-wrapper">
          456
        </div>
      </div>
      <div class="blog-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          layout="prev, pager, next, total"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import canvas from '@/common/js/rain'
export default {
  name: 'index',
  data () {
    return {
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      articleData: '',
      articlesList: [],
      articlesUrl: '/blog/queryArticles'
    }
  },
  computed: {
  },
  mounted () {
    canvas()
    this.getArticle()
  },
  methods: {
    searchArticlesByKey () {
      console.log(123)
      this.getArticle()
    },
    getArticle () {
      let offset = (this.pagination.currentPage - 1) * this.pagination.pageSize + 1
      let params = {
        key: this.articleData,
        offset: offset,
        limit: this.pagination.pageSize
      }
      this.axios.get(this.articlesUrl, {
        params: params
      }).then(response => {
        this.pagination.total = response.data.data.total
        this.articlesList = response.data.data.rows
      }).catch(error => {
        console.log(error)
      })
    },
    toArticleContentPage (articleId, author) {
      this.$router.push({name: 'articleContent', query: { articleId: articleId, author: author }})
    },
    toLoginPage () {
      this.$router.push({name: 'login'})
    },
    toWriteArticlePage () {
      this.$router.push({name: 'writeArticle'})
    },
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.getArticle()
    },
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getArticle()
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
  @import '../common/css/theme';
  .blog-container{
    display: flex;
    justify-content:space-between;
    margin-top: 30px;
    .blog-content-wrapper{
      flex: 1;
      flex-basis: 65%;
      position: relative;
      border-top: 1px dashed @border-color;
      border-bottom: 1px dashed @border-color;
      .blog-list{
        .blog-item{
          padding: 20px 0 15px;
          &:not(:last-child) {
            border-bottom: 1px dashed @border-color;
          }
          .blog-title{
            display: block;
            font-size: 18px;
            font-weight: 600;
            color: #495969;
            line-height: 1.5;
            margin-bottom: 8px;
            &:hover{
              opacity: .8;
            }
          }
          .blog-summary{
            color: #777;
            margin-bottom: 5px;
          }
          .blog-info{
            font-size: 12px;
            color: #777;
            margin-bottom: 15px;
            .blog-info-item{
              margin-right: 20px;
              .iconfont{
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .blog-sidebar-wrapper{
      flex: 1;
      flex-basis: 30%;
      margin-left: 6%;
    }
  }
  .canvas-wrapper{
    position: relative;
    .umbrella {
      height: 200px;
      position: absolute;
      right: 20px;
      bottom: 0;
    }
    .canvas{
      display: block;
      width: 100%;
      height: 200px;
    }
    .joke{
      position: absolute;
      bottom: 20px;
      right: 220px;
      z-index: 100;
    }
    .title{
      position: absolute;
      font-size: 28px;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
    }
  }
  .blog-pagination{
    margin: 40px 0;
  }
</style>
