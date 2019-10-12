module.exports = {
    locales: {
        '/': {
            lang: 'zh-CN', 
            title: 'Hewie博客',
            description: '计算机校招面试、C++、算法、数据结构、操作系统、计算机网络、数据库、设计模式、Linux',
        },
    },
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    base: '/',
    themeConfig: {
      lastUpdated: '最后更新于',
      repo: 'Hewie8023/HewieBlog',
      docsDir: 'docs',
      docsBranch: 'master',
      editLinks: true,
      editLinkText: '帮助我们改善此页面！',

      nav: [
        { text: '主页', link: '/' },
        { text: '关于', link: '/about/' },
        { text: 'External', link: 'https://google.com' },
      ],
      sidebar: {
        '/C++/': [
          '',     /* /foo/ */
          'cpp1',  /* /foo/one.html */
          'cpp2'   /* /foo/two.html */
        ],
  
        '/network/': [
          '',      /* /bar/ */
          'net01', /* /bar/three.html */
          'net02'   /* /bar/four.html */
        ],
  
        // fallback
        '/': [
          '',        /* / */
          '/about/', /* /contact.html */
        ]
      },
      sidebarDepth: 2,
    }
  }