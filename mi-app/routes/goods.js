var express = require('express');
var router = express.Router();
var query = require('../lib/mysql_pool');

// 商品列表
router.all('/manage/getGoodsList', function (req, res, next) {
    var body = req.body;
    var sql = `SELECT * FROM goods where goodsName like '\%${body.goodsName || ''}\%'  ORDER BY goodsId DESC`;
    console.log(sql)
    query(sql, [1], function(err,results,fields){  
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

// 添加/编辑商品信息
router.all('/manage/addGood', function (req, res, next) {
    var body = req.body;
    var data = {
        code: 0,
        msg: 'success',
        data: []
    }
    if (!body.goodsId) {

        query(`INSERT INTO goods(goodsName, goodsPrice, goodsIntro, goodsImgUrl, goodsModel) VALUES ('${body.goodsName}', ${body.goodsPrice}, '${body.goodsIntro}', '${body.goodsImgUrl}','${body.goodsModel}')`, [1], function (err,results,fields) {  
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
        query(`UPDATE goods SET goodsName='${body.goodsName}',goodsPrice=${body.goodsPrice},goodsIntro='${body.goodsIntro}',goodsImgUrl='${body.goodsImgUrl}',goodsModel='${body.goodsModel}' WHERE goodsId=${body.goodsId}`, [1], function (err,results,fields) {  
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

// 商品详情
router.all('/getGoodsDetail', function (req, res, next) {
    var body = req.body;

    query(`SELECT * FROM goods WHERE goodsId=${body.goodsId}`, [1], function (err,results,fields) {  
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

// 删除商品信息
router.all('/manage/delGood', function (req, res, next) {
    var body = req.body;
    var data = {
        code: 0,
        msg: 'success',
        data: []
    }
    query(`DELETE FROM goods WHERE goodsId=${body.goodsId}`, [1], function (err,results,fields) {  
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