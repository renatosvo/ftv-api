/**
 * Created by renat on 25/05/2015.
 */
var express = require('express');
var router = express.Router();
var cors = require('cors');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-02.cleardb.net',
    user     : 'b4aaa5a923988f',
    password : '2f873075',
    database : 'heroku_de1629e833c3cb8'
});

/*var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'renatosvo',
    password : 'hidrogenio',
    database : 'mapeamentotwitter'
});*/

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

    connection.query("select distinct c.* from contas c inner join descritores d on c.descritor = d.id and d.descritor like ?",desc, function(err, rows, fields) {
        if (!err) {
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



router.post('/add/extra',cors(), function(req, res, next) {
console.log("oi")
    var nome = (req.body.nome) ? req.body.nome : null;
    var description = (req.body.description) ? req.body.description : null;
    var url = (req.body.url) ? req.body.url : null;
    var tema = (req.body.tema) ? req.body.tema : null;
    var tag1 = (req.body.tag1) ? req.body.tag1 : null;
    var tag2 = (req.body.tag2) ? req.body.tag2 : null;
    var iniciativa = (req.body.iniciativa) ? req.body.iniciativa : null;
    var produto = (req.body.produto) ? req.body.produto : null;
    var fase = (req.body.fase) ? req.body.fase : null;
    var protagonista = (req.body.protagonista) ? !!req.body.protagonista : null;
    var bibliografia = (req.body.bibliografia) ? req.body.bibliografia : null;
    var evidencias = (req.body.evidencias) ? req.body.evidencias : null;
    var fonte = (req.body.fonte) ? req.body.fonte : null;
    var pais = (req.body.pais) ? req.body.pais : null;
    var cidade = (req.body.cidade) ? req.body.cidade : null;
    var info_add = (req.body.info_add) ? req.body.info_add : null;
    var dt_criaaoo = new Date();
    var is_tweet = (req.body.is_tweet) ? !!req.body.is_tweet : null;
    var id_tweet = (req.body.id_tweet) ? req.body.id_tweet : null;

    console.log(protagonista)

    connection.query('Insert into extras (nome, description, url, tema, tag1, tag2, iniciativa ,' +
    ' produto, fase,protagonista, bibliografia , evidencias, fonte, pais, cidade,info_add, dt_criação, is_tweet, id_tweet)' +
    ' values (?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[nome, description, url, tema, tag1, tag2, iniciativa,
        produto, fase,protagonista, bibliografia , evidencias, fonte, pais, cidade,info_add, dt_criaaoo, is_tweet, id_tweet] ,function(err, result) {

        if (!err) {
            console.log(result)
            res.send(result);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});


module.exports = router;