const cpp = require('./C++/index.js');
const network = require('./network/index.js')

module.exports = {
    '/cpp/': cpp,

    '/network/': network,

    // // fallback
    // '/': [
    //   '',        /* / */
    //   '/about/', /* /contact.html */
    // ]
    
};