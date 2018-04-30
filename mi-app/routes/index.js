var express = require('express');
var router = express.Router();
var query = require('../lib/mysql_pool');

// 登录
router.all('/login', function (req, res, next) {
    var body = req.body;
    query(`SELECT * FROM users WHERE userName='${body.userName}' and passWords='${body.passWords}'`, [1], function (err, results, fields) {
        if (err) {
            res.end(err);
        } else {
            if (results.length > 0) {
                res.json({
                    code: 0,
                    msg: 'success',
                    data: results[0]
                })
            } else {
                res.json({
                    code: 1,
                    msg: '用户名或密码错误',
                    data: {}
                })
            }
        }
    });
});

// 注册
router.all('/regist', function (req, res, next) {
    var body = req.body;
    query(`INSERT INTO users (userId, userName, passWords) VALUES ('', '${body.userName}', '${body.passWords}');`, [1], function (err,results,fields) {  
        if (err) {
            res.end(err);
        } else {
            res.json({
                code: 0,
                msg: 'success',
                data: {}
            })
        }
    });
});

module.exports = router;