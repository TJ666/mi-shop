let path = require('path');
let mockRoot = path.resolve(__dirname, '../mock/');


module.exports =  function (req, res, next) {
    let url = req.url.split('?')[0];
    if (/mi/.test(url)) {
        let mockUrl = mockRoot + url + '.js';
        res.send(require(mockUrl)());
    }
    next()
};