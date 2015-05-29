/**
 * Created by renat on 25/05/2015.
 */
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var mock = require('./dataMock');
var umock = require('./usersMock');
var dmock = require('./descritorMock');
var under = require('underscore');
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


var filter = function(req){
    page = (req.query.p) ? parseInt(req.query.p) :0;
    qtd  = (req.query.qtd) ? parseInt(req.query.qtd) :99999999;
    minRet  = (req.query.minretweet) ? parseInt(req.query.minretweet) :0;
    maxRet = (req.query.maxretweet) ? parseInt(req.query.maxretweet) : 99999999;

    page *=qtd;
    qtd+=page;

    arr = under.filter(mock, function(value,key){
        return minRet <= value.retweets && value.retweets <= maxRet;
    });

    return arr.slice(page,qtd);

};

router.get('/tweets/total',cors(), function(req, res, next) {
    s =filter(req);
    s ={total : s.length};
    res.send(s)
});

router.get('/tweets/query',cors(), function(req, res, next) {


    res.send(filter(req));
});

router.get('/users/query',cors(), function(req, res, next) {
    desc = req.query.desc;
    if(!!!desc){
        res.send(umock);
        return;
    }


    arr = under.filter(dmock, function(value,key){
        return value.descritor == desc;
    });
    desc = arr[0].id;
    arr = under.filter(umock, function(value,key){
        return value.descritor == desc;
    });
    res.send(arr);
});

router.get('/desc/query',cors(), function(req, res, next) {
    res.send(dmock);
});

module.exports = router;