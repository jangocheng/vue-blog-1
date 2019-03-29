<template>
  <div>
    <blog-header/>
    <div class="main-container">
      <div class="article-wrapper">
        <div class="article-title">
          {{articleTitle}}
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
        <div class="article-turn">
          <div class="pre-turn">
            <a class="turn-link" @click="toTargetPage(prePage.articleId, prePage.author)">
              <i class="el-icon-arrow-left pre-icon"></i>
              <span v-if="prePage.articleId" class="turn-text">{{prePage.articleTitle}}</span>
              <span v-else>已到最前</span>
            </a>
          </div>
          <div class="next-turn">
            <a class="turn-link" @click="toTargetPage(nextPage.articleId, nextPage.author)">
              <span v-if="nextPage.articleId" class="turn-text">{{nextPage.articleTitle}}</span>
              <span v-else>已到最后</span>
              <i class="el-icon-arrow-right next-icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getFormatDate} from '@/utils/formatData'
import blogHeader from '../../pages/BlogHeader/BlogHeader'
export default {
  name: 'article-content',
  components: {
    blogHeader
  },
  data () {
    return {
      articleTitle: '',
      publishTime: '',
      author: '',
      categories: '',
      visits: 0,
      prePage: {
        articleTitle: '',
        articleId: null,
        author: null
      },
      nextPage: {
        articleTitle: '',
        articleId: null,
        author: null
      },
      queryArticleByIdAuthorUrl: '/blog/queryArticleByIdAuthor',
      queryArticleInfoByIdUrl: '/blog/queryArticleInfoById'
    }
  },
  mounted () {
    this.loadArticleContent(this.getArticleParamObj())
  },
  methods: {
    loadArticleContent (params) {
      this.axios.get(this.queryArticleByIdAuthorUrl, {
        params: params
      }).then(response => {
        this.articleTitle = response.data.data.articleTitle
        this.author = response.data.data.author
        this.publishTime = this.getFormatDate(response.data.data.createTime)
        this.categories = this.getCategoriesList(response.data.data.categories)
        this.visits = response.data.data.visits
        this.queryPreNext(response.data.data.lastArticleId, response.data.data.nextArticleId)
        $('#wordsView').empty().append('<textarea style="display:none;" name="editormd-markdown-doc" id="mdText"></textarea>')
        $('#mdText').text('').text(response.data.data.content)
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
    toTargetPage (articleId, author) {
      if (articleId && author) {
        this.loadArticleContent({articleId: articleId, author: author})
        this.$router.replace({name: 'articleContent', query: { articleId: articleId, author: author }})
      }
    },
    queryPreNext (PreId, nextId) {
      if (PreId) {
        this.axios.get(this.queryArticleInfoByIdUrl, {
          params: {id: PreId}
        }).then(response => {
          this.prePage.articleTitle = response.data.data.articleTitle
          this.prePage.articleId = response.data.data.articleId
          this.prePage.author = response.data.data.author
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.prePage.articleTitle = ''
        this.prePage.articleId = null
        this.prePage.author = null
      }
      if (nextId) {
        this.axios.get(this.queryArticleInfoByIdUrl, {
          params: {id: nextId}
        }).then(response => {
          this.nextPage.articleTitle = response.data.data.articleTitle
          this.nextPage.articleId = response.data.data.articleId
          this.nextPage.author = response.data.data.author
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.nextPage.articleTitle = ''
        this.nextPage.articleId = null
        this.nextPage.author = null
      }
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
    getCategoriesList (Categories) {
      return Categories.split(',').join(' ')
    },
    getFormatDate (time) {
      return getFormatDate(time)
    }
  }
}
</script>

<style scoped lang="less">
  .article-wrapper{
    margin-top: 40px;
    margin-bottom: 70px;
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
    .article-turn{
      margin: 20px 0;
      display: flex;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      position: relative;
      .pre-turn{
        flex: 1;
        flex-basis: 50%;
        padding-right: 15px;
        padding-left: 20px;
      }
      .next-turn{
        text-align: right;
        padding-left: 15px;
        padding-right: 20px;
        flex: 1;
        flex-basis: 50%;
      }
      .turn-link{
        font-size: 16px;
        color: #666;
        &:hover {
          color: #e2291b;
        }
        .next-icon{
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
        .pre-icon{
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
        .turn-text{
          text-overflow:ellipsis;
        }
      }
    }
  }
</style>
