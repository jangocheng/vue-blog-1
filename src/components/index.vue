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
            <router-link :to="{ name: 'writeArticle'}" class="write-btn">写博客</router-link>
          </div>
          <ul class="header-list">
            <li class="header-item clearfix">
              <a class="nav-link"><i class="icon iconfont icon-home1"></i>首页</a>
            </li>
            <li class="header-item clearfix">
              <a class="nav-link"><i class="icon iconfont icon-redu"></i>热点</a>
            </li>
            <li class="header-item clearfix">
              <router-link :to="{ name: 'timeLine'}" class="nav-link" ><i class="icon iconfont icon-shijian2"></i>时间轴</router-link>
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
        <div class="blog-content-wrapper" >
          <ul class="blog-list" v-if="articlesList.length > 0">
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
          <div v-else>抱歉，未检索到任何结果...</div>
        </div>
        <div class="blog-sidebar-wrapper">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>常用标签</span>
            </div>
            <div class="sidebar-tags">
              <ul class="tags-list">
                <li class="tags-item" v-for="item in tags" :key="item.label">
                  <div class="tags-link-wrapper"><a class="tags-link" @click="getArticle(item.label)"><i class="icon iconfont" :class="item.icon"></i><span>{{item.label}}</span></a></div>
                </li>
              </ul>
            </div>
          </el-card>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>今日份鸡汤</span>
            </div>
            <div class="quote">
              {{getQuotes}}
            </div>
          </el-card>
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
    <blogFooter/>
  </div>
</template>

<script>
import canvas from '@/common/js/rain'
import {getFormatDate} from '@/utils/formatData'
import {getQuotes} from '@/utils/quotes'
import blogFooter from './pages/BlogFooter/BlogFooter'
import { mapState } from 'vuex'
export default {
  name: 'index',
  components: {
    blogFooter
  },
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
    ...mapState({
      'tags': 'tags'
    }),
    getQuotes () {
      return getQuotes()
    }
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
    getArticle (key = this.articleData) {
      let offset = (this.pagination.currentPage - 1) * this.pagination.pageSize + 1
      let params = {
        key: key,
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
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.getArticle()
    },
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getArticle()
    },
    getCategoriesList (Categories) {
      return Categories.split(',').join('   ')
    },
    getFormatDate (time) {
      return getFormatDate(time)
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
      width: 65%;
      flex-basis: 65%;
      position: relative;
      .blog-list{
        border-top: 1px dashed @border-color;
        border-bottom: 1px dashed @border-color;
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
      width: 30%;
      flex-basis: 30%;
      margin-left: 6%;
      .box-card{
        margin-bottom: 30px;
      }
      .quote{
        text-indent: 2em;
        line-height: 1.6;
      }
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
  .sidebar-tags{
    .tags-list{
      display: flex;
      flex-wrap: wrap;
      .tags-item{
        width: 50%;
        flex-basis: 50%;
        height: 32px;
        line-height: 32px;
        .tags-link-wrapper{
          .tags-link{
            &:hover{
              color: #00c0ff;
            }
            .iconfont{
              display: inline-block;
              margin-right: 3px;
            }
          }
        }
      }
    }
  }
</style>
