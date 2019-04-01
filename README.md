# remango-blog

个人的博客平台。实现了在线写文章、根据关键词搜索、按标签搜索、按热度搜索等功能。前端项目运行需要相应的后台的支持。

##演示地址

[个人blog站点](http://120.78.222.63/blog/#/index)

## 主要技术栈

前端： vue2 + vuex + vue-router + element ui + webpack + ES6/7 + less + flex



```
git clone https://github.com/REmango/spring-boot-vue-blog.git

cd spring-boot-vue-blog

# 安装依赖
npm install

# 启动
npm run dev

# 前端打包
npm run build

```


# Layout

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


# 截图

### 主页

<img src="https://github.com/REmango/spring-boot-vue-blog/blob/master/screenshot/index.png" width="400" height="300"/>

### 文章阅读界面

<img src="https://github.com/REmango/spring-boot-vue-blog/blob/master/screenshot/article.png" width="400" height="300"/>

### 登录界面

<img src="https://github.com/REmango/spring-boot-vue-blog/blob/master/screenshot/login.png" width="400" height="300"/>

### 写文章界面

<img src="https://github.com/REmango/spring-boot-vue-blog/blob/master/screenshot/write.png" width="400" height="300"/>
