<template>
  <div>
    <nav class="nav nav-top">
      <div class="nav-header">
        <div class="logo-wrapper clearfix">
          <router-link :to="{ name: 'index'}" class="logo">博客</router-link>
        </div>
        <div class="menu-btn-wrapper">
          <a class="menu-btn" @click="switchMenu"><i class="icon iconfont icon-ego-menu"></i></a>
        </div>
        <div class="login-register-wrapper" >
          <a class="avatar" v-if="isShowUser">
            <img :src="avatarUrl"/>
            <div class="avatar-dropdown">
              <div class="dropdown-wrapper">
                <div class="triangle">
                </div>
                <div class="dropdown-content">
                  <ul>
                    <li class="user-item"><a href="#"><i class="icon iconfont icon-iconset"></i>账号设置</a></li>
                    <li class="user-item"><a href="#"><i class="icon iconfont icon-shuju"></i>后台管理</a></li>
                    <li class="user-item"><a href="#" @click="logout"><i class="icon iconfont icon-tuichu"></i>退出系统</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </a>
          <span v-if="!isShowUser">
          <el-button size="medium" class="nav-btn" @click="toLoginPage()">登录</el-button>
          <el-button size="medium" class="nav-btn">注册</el-button>
        </span>
        </div>
        <div class="main-container center-nav">
          <div class="write-btn-wrapper">
            <router-link :to="{ name: 'writeArticle'}" class="write-btn">写博客</router-link>
          </div>
          <ul class="header-list">
            <li class="header-item clearfix">
              <router-link :to="{ name: 'index'}" class="nav-link"><i class="icon iconfont icon-home1"></i>首页</router-link>
            </li>
            <li class="header-item clearfix">
              <router-link :to="{ name: 'hotSpot'}" class="nav-link"><i class="icon iconfont icon-redu"></i>热点</router-link>
            </li>
            <li class="header-item clearfix">
              <router-link :to="{ name: 'timeLine'}" class="nav-link" ><i class="icon iconfont icon-shijian2"></i>时间轴</router-link>
            </li>
            <li class="header-item clearfix" v-if="isShowSearchInput">
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
    <div class="nav-menu-wrapper" :class="{'open-menu': isOpenNavMenu}">
      <ul class="nav-menu-list">
        <li class="nav-menu">
          <router-link :to="{ name: 'index'}" class="nav-menu-link"><i class="icon iconfont icon-home1"></i>首页</router-link>
        </li>
        <li class="nav-menu">
          <router-link :to="{ name: 'hotSpot'}" class="nav-menu-link"><i class="icon iconfont icon-redu"></i>热点</router-link>
        </li>
        <li class="nav-menu">
          <router-link :to="{ name: 'timeLine'}" class="nav-menu-link"><i class="icon iconfont icon-shijian2"></i>时间轴</router-link>
        </li>
        <li class="nav-menu">
          <a class="nav-menu-link"><i class="icon iconfont icon-search1"></i>搜索</a>
        </li>
        <li class="nav-menu">
          <router-link :to="{ name: 'writeArticle'}" class="nav-menu-link"><i class="icon iconfont icon-xiepinglun"></i>写博客</router-link>
        </li>
        <li class="nav-menu">
          <router-link :to="{ name: 'login'}" class="nav-menu-link"><i class="icon iconfont icon-denglu"></i>登录</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getAvatar } from '@/utils/avatar'
export default {
  name: 'blog-header',
  data () {
    return {
      isOpenNavMenu: false,
      articleData: '',
      isShowSearchInput: false,
      isShowUser: false,
      avatarUrl: ''
    }
  },
  mounted () {
    this.initHeader()
  },
  methods: {
    switchMenu () {
      this.isOpenNavMenu = !this.isOpenNavMenu
    },
    logout () {
      this.$store.dispatch('Logout').then((res) => {
        if (res.data.errorCode === 0) {
          this.isShowUser = false
          this.$message({
            message: '已退出',
            type: 'success'
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    initHeader () {
      this.avatarUrl = getAvatar()
      this.isShowSearchInput = this.$route.name === 'index'
      if (getToken()) {
        this.isShowUser = true
      }
    },
    toLoginPage () {
      this.$router.push({name: 'login'})
    },
    searchArticlesByKey () {
      if (this.$route.name === 'index') this.$emit('searchArticlesByKey', this.articleData)
    }
  }
}
</script>

<style scoped lang="less">
  .nav-menu-wrapper{
    height: 0;
    visibility: hidden;
    overflow: hidden;
    transition: all .6s ease;
    margin-bottom: 40px;
    .nav-menu-list{
      padding: 3px 0;
      .nav-menu{
        .nav-menu-link{
          display: block;
          padding: 13px 20px;
          border-bottom:1px solid #f1f1f1;
          &:hover, &:active{
            background-color: #ddd;
          }
          .iconfont{
            display: inline-block;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .open-menu.nav-menu-wrapper{
    height: 280px;
    visibility: visible;
    transition: all .6s linear;
  }
  .avatar{
    display: inline-block;
    height: 56px;
    line-height: 56px;
    margin-right: 50px;
    padding: 8px 38px;
    box-sizing: border-box;
    position: relative;
    &:after{
      content: '';
      width: 0;
      height: 0;
      border-style: solid dashed dashed;
      border-color: #fff transparent transparent;
      overflow: hidden;
      cursor: pointer;
      transition: all .2s;
      -webkit-transition: all .2s;
      position: absolute;
      top: 50%;
      right: 15px;
      margin-top: -3px;
      border-width: 6px;
      border-top-color: #999;
    }
    &:hover:after{
      margin-top: -9px;
      border-style: dashed dashed solid;
      border-color: transparent transparent #999;
    }
    img{
      height: 40px;
      line-height: 40px;
      width: 40px;
      border-radius: 50%;
      border: 1px solid #eee;
    }
    .avatar-dropdown{
      position: absolute;
      height: 0;
      visibility: hidden;
      left: 40px;
      top: 56px;
      width: 140px;
      transform: translateX(-50%);
      border-radius: 6px;
      z-index: 9999999;
    }
    &:hover .avatar-dropdown{
      visibility: visible;
      height: 120px;
      .dropdown-content{
        visibility: visible;
        height: 120px;
      }
    }
    .dropdown-wrapper{
      position: relative;
      .dropdown-content{
        border-radius: 6px;
        background-color: #fff;
        height: 0;
        visibility: hidden;
        overflow: hidden;
        transition: height .3s ease;
        padding: 6px 0;
        border: 1px solid #eee;
        border-top-width: 0;
        box-shadow: 0 2px 8px rgba(0,0,0,.1);
        ul {
          .user-item{
            height: 36px;
            line-height: 36px;
            text-align: left;
            padding: 0 12px;
            .iconfont{
              display: inline-block;
              margin-right: 5px;
            }
            &:hover{
              background-color: #f1f1f1;
            }
            a {
              font-size: 14px;
              padding: 0;
              color: #333;
            }
          }
        }
      }
    }
  }
</style>
