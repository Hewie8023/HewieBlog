const secretKeyConf = require('./secretKeyConf.js');

module.exports = {
    '@vuepress/pwa':{
        serviceWorker: true,
        updatePopup: {
            message: "内容已更新",
            buttonText: "刷新"
        }
    },
    '@vuepress/back-to-top' : true,
    '@vuepress/google-analytics':
    {
        'ga': secretKeyConf.ga
    },
    // 'vuepress-plugin-comment':
    // {
    // choosen: 'gitalk', 
    // options: {
    //         clientID: '1ac633784dc05033dcbf',
    //         clientSecret: '5e54f71fc945383488483da46c62fb3b2a83bb4c',
    //         repo: 'HewieBlog',
    //         owner: 'Hewie8023',
    //         admin: ['Hewie8023'],
    //         id: '<%- frontmatter.commentid || frontmatter.permalink %>',      // Ensure uniqueness and length less than 50
    //         distractionFreeMode: false,  // Facebook-like distraction free mode
    //         labels: ['Gitalk', 'Comment'],
    //         title: '「评论」<%- frontmatter.title %>',
    //         body: '<%- frontmatter.title %>：<%- window.location.origin %><%- frontmatter.to.path || window.location.pathname %>'
    //     }
    // }
    gitalk: {
        // gitalk的主要参数
        clientID: '1ac633784dc05033dcbf',
        clientSecret: '5e54f71fc945383488483da46c62fb3b2a83bb4c',
        repo: 'HewieBlog',
        owner: 'Hewie8023',
        admin: ['Hewie8023'],
        accessToken: 'your accessToken ',
        labelRule: `(title,path)=> {
          let paths=path.split('/')
          if(paths.length>0){
            let res = paths.pop()
            if(res===''){
              res=paths.pop()
            }
            res = res.slice(-50)
            return res
          }else{
            return title
          }
        }`
      },

};