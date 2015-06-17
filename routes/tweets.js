/**
 * Created by renat on 25/05/2015.
 */
var express = require('express');
var router = express.Router();
var cors = require('cors');
var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit : 10,
    canRetry: true,
    host     : 'us-cdbr-iron-east-02.cleardb.net',
    user     : 'b464bb1b37dc8b',
    password : '57eb9d9e',
    database : 'heroku_97488853130fd46'
});

/*var connection = mysql.createPool({
    connectionLimit : 10,
    canRetry: true,
    host     : 'localhost',
    user     : 'renatosvo',
    password : 'hidrogenio',
    database : 'mapeamentotwitter'
});*/

/*connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
        console.log(err);
    }
});*/

router.get('/tweets/total',cors(), function(req, res, next) {
    minRet  = (req.query.minretweet) ? parseInt(req.query.minretweet) :0;
    maxRet = (req.query.maxretweet) ? parseInt(req.query.maxretweet) : 99999999;


    connection.query('select count(*) from tweets t where t.retweets > ? and t.retweets < ? ',[minRet, maxRet], function(err, rows, fields) {
        if (!err) {
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

    page=qtd*page;
/*verificar se vai rolar group by ou nao do textos repetidos*/
    connection.query('select t.* from tweets t where t.retweets > ? and t.retweets < ? group by t.texto limit ? offset ?',[minRet, maxRet, qtd, page], function(err, rows, fields) {
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

    connection.query("select distinct t.nomeusuario as conta from tweets t " +
    "inner join descritores d on t.idescritor = d.id and d.descritor " +
    " like ? order by t.nomeusuario;",desc, function(err, rows, fields) {
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
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

router.get('/temas/query',cors(), function(req, res, next) {
    connection.query('select * from temas ', function(err, rows, fields) {
        if (!err) {
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

router.get('/tags/query',cors(), function(req, res, next) {
    connection.query('select * from tags ', function(err, rows, fields) {
        if (!err) {
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

router.get('/iniciativa/query',cors(), function(req, res, next) {
    connection.query('select * from iniciativa ', function(err, rows, fields) {
        if (!err) {
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

router.get('/fase/query',cors(), function(req, res, next) {
    connection.query('select * from fase ', function(err, rows, fields) {
        if (!err) {
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

router.get('/bibliografia/query',cors(), function(req, res, next) {
    connection.query('select * from bibliografia ', function(err, rows, fields) {
        if (!err) {
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

router.get('/evidencia/query',cors(), function(req, res, next) {
    connection.query('select * from evidencia ', function(err, rows, fields) {
        if (!err) {
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

router.get('/fonte/query',cors(), function(req, res, next) {
    connection.query('select * from fonte ', function(err, rows, fields) {
        if (!err) {
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});



router.post('/extra/add',cors(), function(req, res, next) {
    var nome = (req.body.nome) ? req.body.nome : null;
    var descricao = (req.body.descricao) ? req.body.descricao : null;
    var url = (req.body.url) ? req.body.url : null;
    var urlvideo = (req.body.urlvideo) ? req.body.urlvideo : null;
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


    connection.query('Insert into formulario (nome, descricao, url, tema, tag1, tag2, iniciativa ,' +
    ' produto, fase,protagonista, bibliografia , evidencias, fonte, pais, cidade,info_add, dt_criação, is_tweet, id_tweet, url_video)' +
    ' values (?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[nome, descricao, url, tema, tag1, tag2, iniciativa,
        produto, fase,protagonista, bibliografia , evidencias, fonte, pais, cidade,info_add, dt_criaaoo, is_tweet, id_tweet,urlvideo] ,function(err, result) {

        if (!err) {
            res.send(result);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

router.get('/extra/query',cors(), function(req, res, next) {
    var id = (req.query.id) ? req.query.id : null;
    var s = "";
    if(id){
        s = "where id_tweet = "+id
    }

    page = (req.query.p) ? parseInt(req.query.p) :0;
    qtd  = (req.query.qtd) ? parseInt(req.query.qtd) :99999999;

    page *=qtd;
    qtd+=page;

    connection.query('select * from formulario '+s+' limit ?,? ',[page, qtd], function(err, rows, fields) {
        if (!err) {
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

module.exports = router;