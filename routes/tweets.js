/**
 * Created by renat on 25/05/2015.
 */
var express = require('express');
var mysql = require('mysql');
var router = express.Router();


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

/* GET home page. */
router.get('/total', function(req, res, next) {

    //console.log(req.query.oi);
    connection.query('select count(*) from tweets', function(err, rows, fields) {
        if (!err) {
            console.log(rows)
            res.send( rows);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
            error=true
        }
    });
});

router.get('/query', function(req, res, next) {
    qtd = parseInt(req.query.amount);
    page = parseInt(req.query.p)*qtd;
    fields = [page,qtd];

    //console.log(req.query.oi);
    connection.query('select * from tweets limit ?,?',[page,qtd], function(err, rows, fields) {
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