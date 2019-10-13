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
    'vuepress-plugin-comment':
    {
        choosen: 'valine', 
        options: {
            el: '#valine-vuepress-comment',
            appId: 'JPrsesI9ocfI40bqJMk7GnpW-gzGzoHsz',
            appKey: 'IE3w8yt4pakX6AyRCf1FCSNv'
        }
    }

};