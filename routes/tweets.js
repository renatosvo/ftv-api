/**
 * Created by renat on 25/05/2015.
 */
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var cors = require('cors');


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'renatosvo',
    password : 'hidrogenio',
    database : 'mapeamentotwitter'
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});

router.get('/tweets/total',cors(), function(req, res, next) {
    connection.query('select count(*) from tweets', function(err, rows, fields) {
        if (!err) {
            console.log(rows)
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

router.get('/tweets/query',cors(), function(req, res, next) {

    page = (req.query.p) ? parseInt(req.query.p) :0;
    qtd  = (req.query.qtd) ? parseInt(req.query.qtd) :99999999;
    minRet  = (req.query.minretweet) ? parseInt(req.query.minretweet) :0;
    maxRet = (req.query.maxretweet) ? parseInt(req.query.maxretweet) : 99999999;

    page *=qtd;
    qtd+=page;

    fields = [minRet, maxRet, page, qtd];
    console.log(fields)


    connection.query('select t.* from tweets t where t.retweets > ? and t.retweets < ? limit ?,?',[minRet, maxRet, page, qtd], function(err, rows, fields) {
        if (!err) {
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

router.get('/users/query',cors(), function(req, res, next) {
    desc = (req.query.desc) ? req.query.desc :"";



    connection.query("select distinct c.* from contas c inner join descritores d on c.descritor = d.id and d.descritor like '$?$'",desc, function(err, rows, fields) {
        if (!err) {
            console.log(rows)
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

router.get('/desc/query',cors(), function(req, res, next) {
    connection.query('select * from descritores ', function(err, rows, fields) {
        if (!err) {
            console.log(rows)
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});


module.exports = router;