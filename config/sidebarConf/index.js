const cpp = require('./cpp/index.js');
const network = require('./network/index.js');
const operation = require('./operation/index.js');
const database = require('./database/index.js');
const linux = require('./linux/index.js');
const sword_offer = require('./algorithm/sword_offer/index.js');
const design_pattem = require('./algorithm/design_pattem/index.js');

module.exports = {
    '/cpp/': cpp,

    '/network/': network,

    '/operation/': operation,

    '/database/': database,

    '/linux/': linux,

    '/algorithm/sword_offer/': sword_offer,

    '/algorithm/design_pattem/': design_pattem,

    // // fallback
    // '/': [
    //   '',        /* / */
    //   '/about/', /* /contact.html */
    // ]
    
};