<template>
  <div>
    <nav class="nav nav-top">
      <div class="nav-header">
        <div class="logo-wrapper clearfix">
          <router-link :to="{ name: 'index'}" class="logo">博客</router-link>
        </div>
        <div class="login-register-wrapper">
          <el-button size="medium" class="nav-btn" @click="toLoginPage()">登录</el-button>
        </div>
        <div class="main-container">
          <div class="welcome">Record  your  Idea</div>
        </div>
      </div>
    </nav>
    <div class="title-input-wrapper">
      <input class="title-input" placeholder="请输入标题" v-model="articleTitle"/>
      <div class="publish-btn" @click="publishArticle()">发布文章</div>
    </div>
    <div id='my-editormd' class="markdown-wrapper">
      <textarea id='my-editormd-markdown-doc' name='my-editormd-markdown-doc' ref="markdownText">123</textarea>
      <textarea id='my-editormd-html-code' name='my-editormd-html-code' ref="markdownContent"></textarea>
    </div>
    <el-dialog
      title="发布文章"
      :visible.sync="dialogVisible"
      width="600px">
      <form>
        <el-form :model="articleInfoForm" :rules="rules" ref="articleInfoForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="文章作者" prop="author">
            <el-input  placeholder="作者" v-model="articleInfoForm.author" size="mini" class="author-input" maxlength="30" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="文章类型" prop="articleType">
            <el-select v-model="articleInfoForm.articleType" size="mini" placeholder="请选择" class="type-select">
              <el-option
                v-for="item in articleTypeList"
                :key="item.type"
                :label="item.type"
                :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择标签" prop="checkedTags">
            <el-checkbox-group
              v-model="articleInfoForm.checkedTags">
              <el-checkbox v-for="tag in tags" :label="tag.label" :key="tag.label">{{tag.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('articleInfoForm')">取 消</el-button>
        <el-button type="primary" @click="finishedPublishArticle('articleInfoForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import utils from '@/utils/utils'
import { mapState } from 'vuex'
export default {
  name: 'write-article',
  data () {
    return {
      articleTitle: '',
      markdownObj: null,
      intervalId: null,
      dialogVisible: false,
      articleTypeList: [{type: '原创'}, {type: '转载'}],
      getCurrentUserUrl: '/blog/getCurrentUser',
      articleInfoForm: {
        checkedTags: [],
        author: '',
        articleType: ''
      },
      rules: {
        checkedTags: [
          { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
        ],
        author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' },
          { max: 35, message: '长度最多 35 个字符', trigger: 'blur' }],
        articleType: [
          { required: true, message: '请选择文章类型', trigger: 'change' }
        ]
      },
      publishArticleUrl: '/blog/publishArticle'
    }
  },
  computed: {
    ...mapState({
      'tags': 'tags'
    })
  },
  mounted () {
    this.loadCache()
    this.initMarkdown()
    this.articleCache()
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  },
  methods: {
    loadCache () {
      this.$refs.markdownText.innerText = utils.fetchData('remango-blog')
    },
    articleCache () {
      this.intervalId = setInterval(() => {
        utils.saveData('remango-blog', this.$refs.markdownText.innerText)
      }, 5000)
    },
    initMarkdown () {
      this.markdownObj = editormd('my-editormd', { // 注意1：这里的就是上面的DIV的id属性值
        width: '100%',
        height: 740,
        syncScrolling: true, // 设置双向滚动
        placeholder: '记录你的灵感',
        path: './static/markdown/lib/', // lib目录的路径
        previewTheme: 'dark', // 代码块使用dark主题
        codeFold: true,
        tocm: true, // Using [TOCM]
        tex: true, // 开启科学公式TeX语言支持，默认关闭
        flowChart: true, // 开启流程图支持，默认关闭
        sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
        htmlDecode: true, // 不过滤标签
        imageUpload: true, // 上传图片
        imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp', 'JPG', 'JPEG', 'GIF', 'PNG', 'BMP', 'WEBP'],
        imageUploadURL: '/blog/uploadImage',
        onload: function () {
          // console.log('onload', this);
        },
        saveHTMLToTextarea: true, // 注意3：这个配置，方便post提交表单
        toolbarIcons: function () {
          return ['bold', 'del', 'italic', 'quote', '|', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', '|', 'list-ul', 'list-ol', 'hr', '|', 'link', 'image', 'code', 'code-block', 'table', 'datetime', 'html-entities', '|', 'watch', 'preview', 'fullscreen', 'clear', 'search', '|', 'help', 'info']
        }
      })
    },
    publishArticle () {
      this.$store.dispatch('GetInfo').then(response => {
        if (!response.data.data) {
          this.$alert('只有登录才能发文章哦！', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
            }
          })
          return
        }
        this.articleInfoForm.author = response.data.data.username
        if (!this.$refs.markdownContent.innerText || !this.articleTitle) {
          this.$alert('请填写标题或文章内容', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
            }
          })
        } else this.dialogVisible = true
        console.log(response.data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    finishedPublishArticle (formName) {
      let summary = this.getSummary(this.markdownObj.getHTML())
      let categories = this.articleInfoForm.checkedTags.join(',')
      let ArticleData = {
        author: this.articleInfoForm.author,
        articleTitle: this.articleTitle,
        type: this.articleInfoForm.articleType,
        categories: categories,
        content: this.$refs.markdownContent.innerText,
        summary: summary
      }
      console.log(ArticleData)
      // 验证表单以及上传文章
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post(this.publishArticleUrl, qs.stringify(ArticleData),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
            // 重置表单
            this.articleTitle = ''
            this.resetForm('articleInfoForm')
            this.$refs.markdownText.innerText = ''
            utils.saveData('remango-blog', '')
            this.dialogVisible = false
            this.$alert('已发布，前往首页！', '提示', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.$router.push({name: 'index'})
              }
            })
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    toLoginPage () {
      this.$router.push({name: 'login'})
    },
    getSummary (originalText) {
      let html = originalText.replace(/s/g, '')
      let summary = ''
      let beginIndex = html.indexOf('<')
      let endIndex = html.indexOf('>')
      while (beginIndex !== -1) {
        summary += html.substring(0, beginIndex)

        html = html.substring(endIndex + 1)
        beginIndex = html.indexOf('<')
        if (summary.length < 70) {
          // 过滤掉<pre>标签中的代码块
          if (html.length > 4) {
            if (html.charAt(beginIndex) === '<' && html.charAt(beginIndex + 1) === 'p' && html.charAt(beginIndex + 2) === 'r' && html.charAt(beginIndex + 3) === 'e') {
              endIndex = html.indexOf('</pre>')
              endIndex = endIndex + 5
            } else {
              endIndex = html.indexOf('>')
            }
          } else {
            endIndex = html.indexOf('>')
          }
        } else {
          break
        }
      }
      return summary
    }
  }
}
</script>

<style scoped lang="less">
  @title-color:#f9f1e4;
  @title-height: 42px;
  @label-height: 28px;
  .tags-wrapper{
    margin-bottom: 20px;
  }
  .form-item{
    display: flex;
    margin-bottom: 20px;
    .form-label{
      height: @label-height;
      line-height: @label-height;
      font-size: 14px;
      flex: 0;
      width: 80px;
      flex-basis: 80px;
      text-align: left;
      color: #041027;
    }
    .form-input{
      flex: 1;
    }
  }
  .nav-top{
    margin-bottom: 0;
  }
  .title-input-wrapper{
    display: flex;
    background-color: @title-color;
    .publish-btn{
      color: #fff;
      font-size: 16px;
      letter-spacing: 0.2em;
      flex: 0;
      width: 150px;
      flex-basis: 150px;
      display: block;
      text-align: center;
      height: @title-height;
      line-height: @title-height;
      background-color: #f55134;
      cursor: pointer;
      border: 0;
      outline: 0;
      opacity: .85;
      &:hover{
        opacity: .95;
      }
    }
    .title-input{
      flex: 1;
      display: block;
      color: #444;
      height: @title-height;
      line-height: @title-height;
      padding: 0 20px;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1px;
      background-color: @title-color;
      border: 0;
      outline: 0;
    }
  }

  /*覆盖placeholder*/
  ::-webkit-input-placeholder{
    color:#a1a1a1;
    font-weight: 400;
  }
</style>
