module.exports = [
    { text: '主页', link: '/' },
    { text: '介绍', link: '/introduce/'},
    { 
        text : '面试',
        items:[
            {text: 'C++', link: '/cpp/'},
            {text: '计算机网络', link: '/network/'},
            {text: '操作系统', link: '/operation/'},
            {text: '数据库', link: '/database/'},
            {text: 'Linux', link: '/linux/'},
        ]
    },
    {
        text: '算法修炼',
        items:[
            {text: '算法和数据结构', items:[
                {text: '剑指offer', link:'/algorithm/sword_offer/'},
                {text: 'LeetCode', link:'/algorithm/leetcode/'},
                {text: '程序员代码面试指南', link:'/algorithm/code_interview/'}
            ]},
            {text: '设计模式', items:[
                {text:'设计模式', link:'/algorithm/design_pattem/'},
            ]},
        ]
    },
    {
        text: "随手记",
        items: [
          { text: '每周分享', link: '/more/share/' },
          { text: '书签', link: '/more/bookmark/'}
        ]
      },
  
    { text: '关于', link: '/about/' },
];