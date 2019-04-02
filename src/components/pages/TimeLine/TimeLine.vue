<template>
  <div>
    <blog-header/>
    <div class="main-container time-line-container" >
      <div class="time-line-content" :class="{'enter-animation-active': isActive}">
        <div class="time-line-tags">
          <div class="time-tags-title">足迹</div>
          <div class="time-tags-content">
            <ul class="time-tags-list">
              <li class="time-item" v-for="(item, index) in timeLineList" :key="item.timeline">
                <a class="time-link" :class="{'active': currentIndex === index}" @click="queryArticleByMonth(item.timeline, index)">{{formatTimeLine(item.timeline)}}</a>
              </li>
            </ul>
            <div class="time-read-more" @click="loadMoreTimeLine" v-if="isShowTimeReadMore">加载更多 >></div>
          </div>
        </div>
        <div class="current-month-articles">
          <div class="articles-statistics">
            本月博客数量共计<span class="article-total">{{articleTotal}}</span>篇，
            <span>{{getPrompt}}</span>
          </div>
          <el-timeline>
            <el-timeline-item :timestamp="getFormatDateSimple(article.createTime)" placement="top" v-for="article in articleList" :key="article.id">
              <el-card>
                <h4 class="article-title" @click="toArticleContentPage(article.articleId, article.author)">{{article.articleTitle}}</h4>
                <div class="blog-info">
                  <span class="blog-info-item">
                  <i class="icon iconfont icon-biaoqian"></i> {{getCategoriesList(article.categories)}}
                </span>
                </div>
                <p class="article-summary">{{article.summary}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <div class="read-more-wrapper">
            <el-button type="info" @click="loadMoreArticle" v-if="isShowArticleReadMore">阅读更多</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getFormatDateSimple} from '@/utils/formatData'
import blogHeader from '../../pages/BlogHeader/BlogHeader'
export default {
  name: 'timeline',
  components: {
    blogHeader
  },
  data () {
    return {
      isActive: false,
      getTimeLineUrl: '/blog/getTimeline',
      queryArticleListByTimeLineUrl: '/blog/queryArticleListByTimeLine',
      timeLineTotal: 0,
      timeLineCurrentPage: 1,
      timeLinePageSize: 5,
      timeLineList: [],

      articleTotal: 0,
      articleCurrentPage: 1,
      articlePageSize: 5,
      articleList: [],
      currentIndex: 0,
      currentTimeLine: '',
      isFirstLoadTimeLine: true,
      unhappyPrompt: '加把劲哟~',
      commonPrompt: '继续努力~',
      happyPrompt: '很棒啊'
    }
  },
  computed: {
    getPrompt () {
      return (this.articleTotal <= 3 && this.unhappyPrompt) || (this.articleTotal <= 6 && this.unhappyPrompt) || this.happyPrompt
    },
    isShowArticleReadMore () {
      return (this.articleTotal > this.articleCurrentPage * this.articlePageSize)
    },
    isShowTimeReadMore () {
      return (this.timeLineTotal > this.timeLineCurrentPage * this.timeLinePageSize)
    }
  },
  mounted () {
    this.isActive = true
    this.loadTimeLine()
  },
  methods: {
    loadTimeLine () {
      let offset = (this.timeLineCurrentPage - 1) * this.timeLinePageSize + 1
      let params = {
        offset: offset,
        limit: this.timeLinePageSize
      }
      this.axios.get(this.getTimeLineUrl, {
        params: params
      }).then(response => {
        this.timeLineTotal = response.data.data.total
        if (response.data.data) {
          this.timeLineList.push(...response.data.data.rows)
          let currentTimeLine = response.data.data.rows[0].timeline
          this.getArticleListByTimeLine(currentTimeLine)
          this.currentTimeLine = currentTimeLine
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getArticleListByTimeLine (timeLine) {
      let offset = (this.articleCurrentPage - 1) * this.articlePageSize + 1
      let params = {
        timeLine: timeLine,
        offset: offset,
        limit: this.articlePageSize
      }
      this.axios.get(this.queryArticleListByTimeLineUrl, {
        params: params
      }).then(response => {
        if (response.data.data) {
          this.articleList.push(...response.data.data.rows)
          this.articleTotal = response.data.data.total
        }
      }).catch(error => {
        console.log(error)
      })
    },
    loadMoreTimeLine () {
      this.timeLineCurrentPage += 1
      let offset = (this.timeLineCurrentPage - 1) * this.timeLinePageSize + 1
      let params = {
        offset: offset,
        limit: this.timeLinePageSize
      }
      this.axios.get(this.getTimeLineUrl, {
        params: params
      }).then(response => {
        this.timeLineTotal = response.data.data.total
        if (response.data.data) {
          this.timeLineList.push(...response.data.data.rows)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    loadMoreArticle () {
      this.articleCurrentPage += 1
      this.getArticleListByTimeLine(this.currentTimeLine)
    },
    queryArticleByMonth (item, index) {
      this.currentIndex = index
      this.articleTotal = 0
      // 重置状态
      this.articleCurrentPage = 1
      this.articlePageSize = 5
      this.articleList = []

      this.currentTimeLine = item
      this.getArticleListByTimeLine(item)
    },
    formatTimeLine (date) {
      let dateArr = date.split('年')
      let month = date.split('年')[1].split('月')[0]
      let formatMonth = Number(month)
      return `${dateArr[0]}年${formatMonth}月`
    },
    toArticleContentPage (articleId, author) {
      this.$router.push({name: 'articleContent', query: { articleId: articleId, author: author }})
    },
    getCategoriesList (Categories) {
      return Categories.split(',').join(' ')
    },
    getFormatDateSimple (time) {
      return getFormatDateSimple(time)
    }
  }
}
</script>

<style scoped lang="less">
  @import '../../../common/css/theme';
  .time-line-container{
    margin-top: 70px;
    margin-bottom: 60px;
  }
  .time-line-content{
    display: flex;
    opacity: 0;
    visibility: hidden;
    transform: translateY(50px);
    transition: .8s;
    -webkit-transition: .8s;
    .time-line-tags{
      flex: 1;
      width: 150px;
      flex-basis: 10%;
      margin-right: 10px;
      .time-tags-title{
        padding-left: 40px;
        color:#333;
        font-weight: 600;
        font-size: 22px;
        letter-spacing: 0.1em;
      }
      .time-tags-content{
        margin-top: 40px;
        .time-tags-list{
          .time-item{
            color: #555;
            padding: 10px 0 10px 30px;
            letter-spacing: 1px;
            .time-link{
              &:hover{
                color: @orange;
              }
              &.active{
                color: @orange;
              }
            }
          }
        }
      }
      .time-read-more{
        color: #1ab499;
        margin-top: 10px;
        padding-left: 30px;
        cursor: pointer;
        &:hover{
          opacity: .8;
        }
      }
    }
    .current-month-articles{
      flex: 1;
      flex-basis: 70%;
      .articles-statistics{
        color: #555;
        font-size: 14px;
        margin-bottom: 20px;
        padding-left: 30px;
        .article-total{
          margin: 0 4px;
          font-size: 18px;
          font-weight: 600;
          color: #666;
        }
      }
      .article-title {
        color: #000;
        margin-bottom: 8px;
        letter-spacing: 1px;
        cursor: pointer;
        &:hover{
          opacity: .6;
        }
      }
      .article-summary{
        line-height: 1.6;
        margin-bottom: 10px;

      }
      .blog-info{
        font-size: 12px;
        color: #777;
        margin-bottom: 10px;
        .blog-info-item{
          margin-right: 20px;
          .iconfont{
            font-size: 12px;
          }
        }
      }
      .read-more-wrapper{
        padding-left: 30px;
      }
    }
  }
  .enter-animation-active{
    visibility: visible;
    opacity: 1;
    -webkit-transform: translateY(0);
  }
</style>
