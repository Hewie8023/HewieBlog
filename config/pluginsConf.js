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

};