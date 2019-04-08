# remango-blog

搭建一个可动态发布博客的单页面应用。实现了在线写文章、根据关键词搜索、按标签搜索、按热度搜索等功能，前端框架vue，后端框架spring boot。
前端项目运行需要相应的后台的支持。

## 演示地址

[个人blog站点](https://www.remango.cn/blog/#/index)

## 后端代码地址

[后端代码导航](https://github.com/REmango/spring-boot-blog)

## 主要技术栈

前端： vue2 + vuex + vue-router + element ui + webpack + ES6/7 + less + flex

## 目录结构

```
.
├── build                                       // webpack config file
├── config                                      // webpack config file
├── screenshots                                 // 截图
├── src
│   ├── common                                  // 公共资源
│   │   ├── css                                 // css files
│   │   ├── fonts                               // 主要为iconfont图标
│   │   ├── img                                 // 图片
│   │   └── js                                  // js 文件
│   ├── components                              //
│   │   ├── index                               // 博客首页
│   │   └── pages                               // includes eos components
│   │       ├── 404                             // 404页面
│   │       ├── ArticleContent                  // 写文章页面
│   │       ├── BlogFooter                      // 首页页脚
│   │       ├── BlogHeader                      // 博客导航栏
│   │       ├── HotSpot                         // 热点页面
│   │       ├── Login                           // 登录页面
│   │       ├── MessageBoard                    // 留言板
│   │       ├── TimeLine                        // 时间轴
│   │       └── WriteArticle                    // 写博客界面
│   ├── router
│   │     └── index                             // 路由管理
│   ├── store
│   │     ├── modules                           // 模块
│   │     │     ├── permission                  // 根据用户权限去添加相应路由（待用）
│   │     │     └── user                        // 用户常用登入登出操作
│   │     │
│   │     ├── actions                           // actions
│   │     ├── getters                           // getters
│   │     ├── index                             // index
│   │     └── mutations                         // mutations
│   ├── utils                                   // 工具库
│   ├── App.vue
│   └── main.js
├──  static                                     // static resource
├── .eslintignore                               // eslint ignore config
├── .eslintrc.js                                // eslint config file
├── .gitignore                                  // git ignore config
├── index.html                                  // entry page html file
├── package.json                                // package.json
.


```


## 部分截图

#### 文章阅读界面

<img src="https://github.com/REmango/vue-blog/blob/master/screenshot/article.png" width="500" height="250"/>

#### 首页

<img src="https://github.com/REmango/vue-blog/blob/master/screenshot/index.png" width="500" height="250"/>

#### 登录界面

<img src="https://github.com/REmango/vue-blog/blob/master/screenshot/login.png" width="500" height="250"/>



## 开发

```
git clone https://github.com/REmango/vue-blog.git

cd vue-blog

npm install

npm run dev

npm run build

```

## 开发注意事项（webpack的个人配置）

在config > index.js （第13行） 修改代理

```
proxyTable: {
      '/blog': {//前端路由匹配模式
        target: 'http://localhost:8092/blog',  //后端请求服务域名和端口
        changeOrigin: true,   //设置请求头
        pathRewrite: {
          '^/blog': ''   //路径重写  前端/blog 对应 后端''
        },
      }
    },

```
在build > utils.js (第51行) 修改打包时的静态资源路径

```
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../../'
      })
```

上述配置根据个人实际情况修改

## 后续待开发的功能

- ABOUT ME 页面
- 对文章的删除和更新功能
- 对写文章的在线保存
- ...


