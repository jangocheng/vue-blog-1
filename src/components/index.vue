<template>
  <div>
    <blog-header @searchArticlesByKey="searchArticlesByKey" />
    <div class="main-container ">
      <div class="index-page-container" :class="{'enter-animation-active': isActive}">
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
                  <i class="icon iconfont icon-rili1"></i> {{getFormatCN(article.createTime)}}
                </span>
                  <span class="blog-info-item">
                  <i class="icon iconfont icon-biaoqian"></i> {{getCategoriesList(article.categories)}}
                </span>
                </div>
                <p class="blog-summary">{{article.summary + '...'}}
                </p>
              </li>
            </ul>
            <div v-else>{{searchMsg}}</div>
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
    </div>
    <div class="sidebar-container" :class="{'open': isOpenMenu}">
      <div class="sidebar-shadow" @click="closeMenu">
      </div>
      <div class="sidebar-content">
        <div class="nav-title">
          个人空间
        </div>
        <div class="sidebar-menu-wrapper">
          <ul class="sidebar-menu">
            <li class="sidebar-item" v-for="(navItem) in navList" :key="navItem.id">
              <a class="sidebar-item-content" @click="operate(navItem.id)">
                <i class="icon iconfont" :class="navItem.icon"></i>
                <span>{{navItem.label}}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <message-board :isOpenBoard='isOpenBoard' @closeBoard="closeBoard"></message-board>
    <blog-footer @openMenu="openMenu"/>
  </div>
</template>

<script>
import canvas from '@/common/js/rain'
import {getFormatCN} from '@/utils/formatData'
import {getQuotes} from '@/utils/randomGenerate'
import blogFooter from './pages/BlogFooter/BlogFooter'
import blogHeader from './pages/BlogHeader/BlogHeader'
import messageBoard from './pages/MessageBoard/MessageBoard'
import { mapState } from 'vuex'
export default {
  name: 'index',
  components: {
    blogFooter, blogHeader, messageBoard
  },
  data () {
    return {
      isActive: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      isOpenMenu: false,
      searchMsg: '',
      articleSearchKey: '',
      isOpenBoard: false,
      articlesList: [],
      navList: [
        { label: '我的音乐', icon: 'icon-yinle', id: 1 },
        { label: '留言板', icon: 'icon-liuyan1', id: 2 },
        { label: '关于我', icon: 'icon-guanyuwomen', id: 3 }
      ],
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
    this.isActive = true
    this.getArticle()
  },
  methods: {
    closeBoard () {
      this.isOpenBoard = false
    },
    operate (id) {
      if (id === 2) {
        this.isOpenMenu = false
        this.isOpenBoard = true
      }
    },
    searchArticlesByKey (articleData) {
      this.articleSearchKey = articleData
      this.getArticle(articleData)
    },
    getArticle (key = this.articleSearchKey) {
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
        if (this.articlesList.length > 0) this.searchMsg = '抱歉，未检索到任何结果...'
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
    getFormatCN (time) {
      return getFormatCN(time)
    },
    openMenu () {
      this.isOpenMenu = true
    },
    closeMenu () {
      this.isOpenMenu = false
    }
  }
}
</script>

<style scoped lang="less">
  @import '../common/css/theme';
  .main-container{
    margin-top: 20px;
  }
  .index-page-container{
    opacity: 0;
    visibility: hidden;
    transform: translateY(50px);
    transition: .8s;
    -webkit-transition: .8s;
  }
  .enter-animation-active{
    opacity: 1;
    visibility: visible;
    -webkit-transform: translateY(0);
  }
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
        .blog-item{
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
            margin-bottom: 8px;
            line-height: 1.75;
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
  /*canva样式*/
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
      z-index: 9;
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

  /*侧边栏*/
  .sidebar {
    position: fixed;
    height: 100%;
    width: 100%;
  }
  .sidebar-shadow{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.6);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
    visibility: hidden;
    opacity: 1;
    transition: .3s;
    -webkit-transition: .3s;
  }
  .open .sidebar-shadow{
    opacity: 1;
    visibility: visible;
  }
  .open .sidebar-content{
    opacity: 1;
    width: 284px;
  }
  .sidebar-content {
    top: 0;
    right: 0;
    height: 100%;
    position: fixed;
    background-color: #fff;
    z-index: 101;
    opacity: 0;
    width: 0;
    transition: .3s;
    -webkit-transition: .3s;
    .nav-title{
      padding: 25px 30px 15px;
      text-align: center;
      letter-spacing: .2em;
      font-size: 20px;
      font-weight: 600;
      color:#666;
    }
  }
  .sidebar-menu-wrapper{
    margin-top: 10px;
    .sidebar-menu{
      .sidebar-item{
        .sidebar-item-content{
          padding: 0 30px;
          font-size: 16px;
          display: flex;
          color:#333;
          position:relative;
          transition: color .3s ease-in-out;
          &:before{
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 0;
            height: 100%;
            background: #f66f45;
            z-index: 2;
            transition: width .3s ease-in-out;
            -webkit-transition: width .3s ease-in-out;
          }
          &:hover{
            color: #fff;
            &:before{
              width: 100%;
            }
          }
          .iconfont{
            display: inline-block;
            position: relative;
            z-index: 3;
            padding: 0 10px 0 1px;
            line-height: 60px;
            font-size: 20px;
          }
          span{
            display: inline-block;
            font-weight: normal;
            position: relative;
            line-height: 60px;
            height: 60px;
            z-index: 3;
          }
        }
      }
    }
  }
</style>
