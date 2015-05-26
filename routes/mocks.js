/**
 * Created by renat on 25/05/2015.
 */
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var mock = require('./dataMock');
var under = require('underscore');


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
    page = parseInt(req.query.p);
    qtd  = parseInt(req.query.qtd);
    minRet  = parseInt(req.query.minretweet );
    maxRet = (req.query.maxretweet) ? parseInt(req.query.maxretweet) : 99999999;

    console.log(minRet);



    console.log(maxRet)

    return under.filter(mock, function(value,key){
        return minRet < value.retweets && value.retweets < maxRet;
    });
}

/* GET home page. */
router.get('/total', function(req, res, next) {
    s ={total: mock.length}
    res.send(s)
});

router.get('/query', function(req, res, next) {


    res.send(filter(req));
});

module.exports = router;