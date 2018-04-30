var express = require('express');
var router = express.Router();
var query = require('../lib/mysql_pool');

// 用户列表
router.all('/manage/getUserList', function (req, res, next) {
    query("SELECT * FROM `users` where username != 'admin' ORDER BY `userName` DESC", [1], function(err,results,fields){  
        if (err) {
            res.end(err);
        } else {
            res.json({
                code: 0,
                msg: 'success',
                data: results
            })
        }
    });
});

// 添加/编辑用户信息
router.all('/manage/addUser', function (req, res, next) {
    var body = req.body;
    var data = {
        code: 0,
        msg: 'success',
        data: []
    }
    if (!body.userId) {
        query(`INSERT INTO users (userId, userName, passWords, phoneNum, email) VALUES ('', '${body.userName}', '${body.passWords}', '${body.phoneNum}', '${body.email}');`, [1], function (err,results,fields) {  
            if (err) {
                res.end(err);
            } else {
                res.json({
                    code: 0,
                    msg: 'success',
                    data: data
                })
            }
        });
    } else {
        query(`UPDATE users SET passWords='${body.passWords}',userName='${body.userName}',phoneNum='${body.phoneNum}',email='${body.email}' WHERE userId=${body.userId}`, [1], function (err,results,fields) {  
            if (err) {
                res.end(err);
            } else {
                res.json({
                    code: 0,
                    msg: 'success',
                    data: data
                })
            }
        });
    }
});

// 删除用户信息
router.all('/manage/delUser', function (req, res, next) {
    var body = req.body;
    var data = {
        code: 0,
        msg: 'success',
        data: []
    }
    query(`DELETE FROM users WHERE userId=${body.userId}`, [1], function (err,results,fields) {  
        if (err) {
            res.end(err);
        } else {
            res.json({
                code: 0,
                msg: 'success',
                data: data
            })
        }
    });
});

module.exports = router;