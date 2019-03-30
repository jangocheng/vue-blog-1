<template>
  <div>
    <blog-header/>
    <div class="main-container hot-spot-container">
      <ul class="hot-article-list">
        <li class="hot-article-item" v-for="(article, index) in articleList" :key="article.id">
          <p class="order">{{orderNum(index)}}</p>
          <div class="hot-article-card">
            <div class="hot-article-title">{{article.articleTitle}}</div>
            <div class="hot-article-info">
              <span class="info-item">
                <i class="icon iconfont icon-rili1"></i> {{getFormatCN(article.createTime)}}
              </span>
              <span class="info-item">
                <i class="icon iconfont icon-shu"></i> {{article.visits}}
              </span>
            </div>
            <div class="hot-article-summary">{{article.summary}}</div>
          </div>
        </li>
      </ul>
      <div class="read-more-wrapper">
        <el-button type="info" @click="loadMoreArticle" v-if="isShowArticleReadMore">阅读更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import blogHeader from '../../pages/BlogHeader/BlogHeader'
import {getFormatCN} from '@/utils/formatData'
export default {
  name: 'hot-spot',
  components: {
    blogHeader
  },
  data () {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 5,
      articleList: [],
      queryArticleListByVisitsUrl: '/blog/queryArticleListByVisits'
    }
  },
  mounted () {
    this.loadArticles()
  },
  computed: {
    isShowArticleReadMore () {
      return (this.total > this.currentPage * this.pageSize)
    }
  },
  methods: {
    orderNum (index) {
      if (this.articleList.length > 0) {
        return `TOP ${index + 1}`
      }
    },
    loadMoreArticle () {
      this.currentPage += 1
      this.loadArticles()
    },
    loadArticles () {
      let offset = (this.currentPage - 1) * this.pageSize + 1
      let params = {
        offset: offset,
        limit: this.pageSize
      }
      this.axios.get(this.queryArticleListByVisitsUrl, {
        params: params
      }).then(response => {
        if (response.data.data) {
          this.articleList.push(...response.data.data.rows)
          this.total = response.data.data.total
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getFormatCN (time) {
      return getFormatCN(time)
    }
  }
}
</script>

<style scoped lang="less">
  .hot-spot-container{
    margin-top: 30px;
  }
  .hot-article-list{
    .hot-article-item{
      .order{
        font-size: 22px;
        font-weight: 700;
        padding-left: 10px;
        border-left: 3px solid #ff5b5b;
        margin-bottom: 20px;
      }
      .hot-article-card{
        padding: 10px 20px 15px;
        border: 1px solid #f1f1f1;
        border-radius: 10px;
        margin-bottom: 20px;
        &:hover{
          box-shadow: 3px 5px 20px 0 #ddd;
        }
        .hot-article-title{
          font-size: 22px;
          font-weight: 700;
          padding-bottom: 6px;
          cursor: pointer;
          &:hover{
            opacity: .8;
          }
        }
        .hot-article-info{
          font-size: 12px;
          color: #777;
          margin-bottom: 15px;
          .info-item{
            margin-right: 10px;
            letter-spacing: 1px;
            .iconfont{
              font-size: 12px;
            }
          }
        }
        .hot-article-summary{
          color: #777;
          margin-bottom: 10px;
          line-height: 1.75;
        }
      }
    }

  }

</style>
