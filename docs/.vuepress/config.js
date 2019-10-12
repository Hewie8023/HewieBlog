const navConf = require('../../config/navConf');
const pluginConf = require('../../config/pluginsConf');
const sidebarConf = require('../../config/sidebarConf/index.js');

module.exports = {
    locales: {
        '/': {
            lang: 'zh-CN', 
            title: 'Hewie博客',
            description: '计算机校招面试、C++、算法、数据结构、操作系统、计算机网络、数据库、设计模式、Linux',
        },
    },
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    base: '/',
    plugins: pluginConf,
    themeConfig: {
      lastUpdated: '上次更新',
      repo: 'Hewie8023/HewieBlog',
      docsDir: 'docs',
      docsBranch: 'master',
      editLinks: true,
      editLinkText: '编辑文档~',

      nav: navConf,
      sidebar: sidebarConf,
      sidebarDepth: 2,
    }
  }