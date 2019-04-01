# remango-blog

> Remango 的blog平台

## Build Setup

## Main technology

vue2 + vuex + vue-router + element ui + webpack + ES6/7 + less + flex

## Development


```
git clone https://github.com/REmango/spring-boot-vue-blog.git

cd spring-boot-vue-blog

# install dependencies
npm install

# serve at localhost:8080
npm run dev

# build for chrome app package
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
│   │     └── index                             // 无权限路由
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
