<template>
  <div>
    <nav class="nav nav-top">
      <div class="nav-header">
        <div class="logo-wrapper clearfix">
          <router-link :to="{ name: 'index'}" class="logo">博客</router-link>
        </div>
      </div>
    </nav>
    <div class="login-container">
      <div class="login-box">
        <div class="login-title">
          <h2>Remango-Blog 登录平台</h2>
          <p>基于element-ui的极致体验</p>
        </div>
        <div class="login-form-wrapper">
          <form>
            <el-form ref="loginForm" :model="loginForm" :rules="rules">
              <el-form-item prop="username">
                <el-input
                  class="login-input"
                  placeholder="用户名"
                  prefix-icon="fa-user fa"
                  v-model="loginForm.username">
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  class="login-input"
                  placeholder="密码"
                  prefix-icon="fa-lock fa"
                  v-model="loginForm.password">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  type="text"
                  class="verification-code-input"
                  :class="[isPassVerify? 'red':'']"
                  placeholder="验证码"
                  :prefix-icon="isPassVerify? 'fa fa-check': 'fa fa-image'"
                  maxLength = '5'
                  v-model="verificationCode">
                </el-input>
                <a class="verification-code-wrapper" href="#"><img title="点击刷新" :src="imgUrl" class="verification-code-img" @click="refreshImg"/></a>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="loginSystem('loginForm')" class="login-button" :disabled="!isPassVerify">Sign in</el-button>
              </el-form-item>
            </el-form>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import {sha256} from 'js-sha256'
export default {
  name: 'login',
  data () {
    let staticImgUrl = '/blog/captcha/get?'
    return {
      loginForm: {
        username: '',
        password: ''
      },
      verificationCode: '',
      isPassVerify: false,
      staticImgUrl: staticImgUrl,
      imgUrl: staticImgUrl + (new Date()).getTime(),
      captchaVerifyUrl: '/blog/captcha/verify',
      rules: {
        username: [
          { required: true, message: '输入不能为空', trigger: 'change' }
        ],
        password: [
          { required: true, message: '输入不能为空', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    verificationCode (newValue, oldValue) {
      if (newValue.length < 5) {
        this.isPassVerify = false
      } else {
        this.axios.post(this.captchaVerifyUrl, qs.stringify({ captcha: this.verificationCode }),
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(response => {
          this.isPassVerify = response.data.errorCode === 0
        }).catch(error => {
          this.isPassVerify = false
          console.log(error)
        })
      }
    }
  },
  mounted () {
    document.onkeydown = () => {
      if (window.event && window.event.keyCode === 13 && this.$route.name === 'login' && this.isPassVerify) {
        this.loginSystem('loginForm')
      }
    }
  },
  methods: {
    refreshImg () {
      this.verificationCode = ''
      this.imgUrl = this.staticImgUrl + (new Date()).getTime()
    },
    loginSystem (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginForm.password = sha256(this.loginForm.password + this.loginForm.username)
          this.VerifyAndSetCookie(this.loginForm).then(res => {
          }).catch(error => {
            this.refreshImg()
            if (error.data) this.$message.error(error.data.errorMsg)
          })
        }
      })
    },
    async VerifyAndSetCookie (loginForm) {
      let res = await this.$store.dispatch('Login', loginForm)
      if (res.data.errorCode !== 0) {
        this.$message.error(res.data.errorMsg)
      } else {
        await this.$store.dispatch('GetInfo')
        this.$router.push({name: 'index'})
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import '../../../common/css/theme';
  .login-container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-top: 150px;
    display: flex;
    .login-box{
      width: 375px;
      margin: 0 auto;
      box-sizing: border-box;
      .login-title{
        text-align: center;
        h2{
          margin-bottom: 10px;
          font-weight: 300;
          font-size: 30px;
          color: #333;
        }
        p{
          color: #999;
          font-size: 16px;
        }
      }
      .login-form-wrapper{
        padding: 20px;
        .login-input{
          width: 100%;
        }
        .verification-code-input{
          width: 180px;
          margin-right: 20px;
        }
        .verification-code-wrapper{
          display: inline-block;
          vertical-align: bottom;
          height: 40px;
          width: 120px;
          border-radius: 4px;
          border: 1px solid #eee;
          .verification-code-img{
            outline: none;
            border: 0;
            height: 100%;
            width: 100%;
          }
        }
        .login-button{
          color: #FFF;
          background-color: @btn-color;
          border-color: @btn-color;
          opacity: .75;
          &.is-disabled{
            background-color: @btn-disabled-color;
            border-color: @btn-disabled-color;
            opacity: 1;
          }
          width: 100%;
          &:focus{
            background-color: @btn-color;
            border-color: @btn-color;
            opacity: .75;
          }
          &:active{
            background-color: @btn-color;
            border-color: #fb1b1b;
            opacity: 1;
          }
          &:hover{
            background-color: @btn-color;
            border-color: @btn-color;
            opacity: 1;
          }
          &.is-disabled:hover {
            color: #fff;
            background-color: @btn-disabled-color;
            border-color: @btn-disabled-color;
            opacity: 1;
          }
        }
      }
    }
  }
</style>
