<template>
  <div :class="{'open': isOpenBoard}">
    <div class="background-shadow" @click="closeMessageBoard">
    </div>
    <div class="message-board-container">
      <div class="message-board">
        <i class="el-icon-close" @click="closeMessageBoard"></i>
        <h1 class="title">
          <span class="red">留</span>
          <span class="yellow">言</span>
          <span  class="blue">板</span></h1>
        <p class="subtitle">您对网站有什么建议或是有什么想对remango说的</p>
        <el-form :model="messageBoardForm" :rules="rules" ref="messageBoardForm" class="reply-form">
          <el-form-item prop="username">
            <el-input v-model="messageBoardForm.username" placeholder="昵称" :disabled="checked" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item prop="replyMessage" class="form-item">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="留下您的足迹"
              class="reply-message"
              maxlength="60"
              v-model="messageBoardForm.replyMessage">
            </el-input>
            <div class="prompt"><span :class="{'warning': messageBoardForm.replyMessage.length>=60}">{{messageBoardForm.replyMessage.length}}</span>/60</div>
          </el-form-item>
          <div class="form-item group-btn">
            <el-checkbox v-model="checked" class="random-input" @change="generateUsername">随机生成昵称</el-checkbox>
            <div class="reply-btn-wrapper">
              <el-button type="success" plain class="reply-btn" @click="submit">立即回复</el-button>
            </div>
          </div>
        </el-form>
        <div class="history-message-panel">
          <div class="history-message-title">留言 <span class="total">{{'共' + messageTotal +'条'}}</span></div>
          <div class="history-message-list-wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <ul class="history-message-list" v-if="messageList.length > 0 ">
              <li class="history-message-item" v-for="item in messageList" :key="item.id">
                <div class="author-info">
                  <span class="author">{{item.nickname}}</span>
                  <span class="date">{{getFormatCN(item.createTime)}}</span>
                </div>
                <div class="history-message" >
                  {{item.message}}
                </div>
              </li>
            </ul>
            <div>
              <div class="la-line-scale-pulse-out  loading" v-if="isShowLoading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div class="loading-end" v-else>已到最后</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getFormatCN} from '@/utils/formatData'
import {getUsername} from '@/utils/randomGenerate'
import qs from 'qs'
export default {
  name: 'HelloWorld',
  props: {
    isOpenBoard: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: false,
      randomUsernameList: [],
      currentPage: 1,
      pageSize: 3,
      busy: false,
      messageBoardForm: {
        replyMessage: '',
        username: ''
      },
      isShowLoading: true,
      messageTotal: 0,
      rules: {
        replyMessage: [
          { required: true, message: '请输入您的留言' }
        ],
        username: [
          { required: true, message: '请输入昵称' }]
      },
      messageList: [],
      getMessageBoardUrl: '/blog/getMessageBoard',
      saveMessageBoardUrl: '/blog/saveMessageBoard'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.busy = false
      this.currentPage = 1
      let offset = (this.currentPage - 1) * this.pageSize + 1
      let params = {
        offset: offset,
        limit: this.pageSize
      }
      this.axios.get(this.getMessageBoardUrl, {
        params: params
      }).then(response => {
        this.messageList = response.data.data.rows
        this.messageTotal = response.data.data.total
      }).catch(error => {
        console.log(error)
      })
    },
    addMessage () {
      this.currentPage += 1
      let offset = (this.currentPage - 1) * this.pageSize + 1
      let params = {
        offset: offset,
        limit: this.pageSize
      }
      this.axios.get(this.getMessageBoardUrl, {
        params: params
      }).then(response => {
        this.messageList.push(...response.data.data.rows)
        this.messageTotal = response.data.data.total
        this.isShowLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    loadMore () {
      let offset = (this.currentPage - 1) * this.pageSize + 1
      console.log(offset, this.messageTotal)
      if (offset >= this.messageTotal && this.messageTotal !== 0) {
        this.isShowLoading = false
        this.busy = true
      } else {
        this.isShowLoading = true
        setTimeout(() => {
          this.addMessage()
          this.busy = false
        }, 1000)
      }
    },
    generateUsername (status) {
      if (status) this.messageBoardForm.username = getUsername()
      else this.messageBoardForm.username = ''
    },
    closeMessageBoard () {
      this.$emit('closeBoard')
    },
    submit () {
      let message = {
        nickname: this.messageBoardForm.username,
        message: this.messageBoardForm.replyMessage
      }
      // 验证表单以及上传文章
      this.$refs['messageBoardForm'].validate((valid) => {
        if (valid) {
          this.axios.post(this.saveMessageBoardUrl, qs.stringify(message), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
            if (response.data.errorCode === 0) {
              this.messageBoardForm.username = ''
              this.messageBoardForm.replyMessage = ''
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['messageBoardForm'].resetFields()
              this.init()
            } else {
              this.$message({
                showClose: true,
                message: '提交失败',
                type: 'error'
              })
            }
          }).catch(error => {
            this.$message({
              showClose: true,
              message: '提交失败',
              type: 'error'
            })
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getFormatCN (time) {
      return getFormatCN(time)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .cyan{
    color: #55bab4;
  }
  .yellow{
    color: #ffe01b;
  }
  .orange{
    color: #efc78c;
  }
  .red{
    color: #d76b5a;
  }
  .blue{
    color: #00c0ff;
  }
  .loading{
    color: #00c0ff;
    margin: 0 auto;
    div{
      height: 20px;
    }
  }
  .loading-end{
    text-align: center;
    color: #999;
    font-size: 14px;
    letter-spacing: .1em;
  }
  .background-shadow{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.6);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;
    visibility: hidden;
    opacity: 1;
    transition: .3s;
    -webkit-transition: .3s;
  }
  .message-board-container{
    max-width: 500px;
    height: 600px;
    font-size: 13px;
    position: fixed;
    padding: 15px;
    z-index: 11;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
    opacity: 0;
    transition: .3s;
    -webkit-transition: .3s;
    display: none;
    .message-board{
      height: 100%;
      box-shadow: 1px 2px 20px 0 rgba(255, 255, 255, .1);
      border-radius: 8px;
      padding: 10px 20px;
      background-color: #fff;
      position: relative;
      .el-icon-close{
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 16px;
        cursor: pointer;
        color: #000;
        opacity: .7;
        &:hover{
          opacity: 1;
        }
      }
      .title{
        text-align: center;
        margin: 12px 0 8px;
        letter-spacing: .2em;
      }
      .subtitle{
        text-align: center;
        color: #999;
      }
      .reply-form{
        margin-top: 20px;
      }
      .group-btn{
        display: flex;
        .random-input{
          flex: 1;
        }
        .reply-btn-wrapper{
          flex: 1;
          text-align: right;
        }
      }
      .form-item{
        position: relative;
        margin-bottom: 15px;
        .prompt{
          position: absolute;
          font-size: 12px;
          color: #bbb;
          right: 10px;
          bottom: 5px;
          .warning{
            color: red;
          }
        }
      }
    }
  }
  .history-message-panel{
    margin: 20px 0;
    .history-message-title{
      font-size: 18px;
      color: #333;
      letter-spacing: .2em;
      .total {
        display: inline-block;
        margin-left: 10px;
        color: #777;
        font-size: 14px;
      }
    }
    .history-message-list-wrapper{
      position: relative;
      height: 200px;
      overflow-y: scroll;
    }
    .history-message-list{
      margin: 10px 0;
      .history-message-item{
        padding: 8px 0 5px;
        border-bottom: 1px solid #eee;
        &:first-child{
          border-top: 1px solid #eee;
        }
        .author-info{
          margin: 10px 0 0;
          .author{
            display: inline-block;
            font-weight: 600;
            letter-spacing: .1em;
          }
          .date{
            display: inline-block;
            letter-spacing: 1px;
            margin-left: 10px;
            font-size: 10px;
            color: #999;
          }
        }
        .history-message{
          padding: 10px 0;
          color: #444;
          background-color: #fff;
          border-radius: 6px;
        }
      }
    }
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #aaa;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #aaa;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #aaa;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #aaa;
  }
  .history-message-list-wrapper::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  .history-message-list-wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(50,50,50,0.25);
    border: 2px solid transparent;
    border-radius: 10px;
    background-clip: padding-box;
  }
  .history-message-list-wrapper::-webkit-scrollbar-thumb:hover {
    background-color: rgba(50,50,50,0.5);
  }
  .open .background-shadow{
    opacity: 1;
    visibility: visible;
  }
  .open .message-board-container{
    opacity: 1;
    visibility: visible;
    display: block;
  }
</style>
