/**
 * Created by renat on 11/10/2015.
 */
var express = require('express');
var router = express.Router();
var cors = require('cors');
var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit : 10,
    canRetry: true,
    host     : 'localhost',
    user     : 'renatosvo',
    password : 'hidrogenio',
    database : 'signals'
});

router.get('/todolists',cors(), function(req, res, next) {
    minRet  = (req.query.minretweet) ? parseInt(req.query.minretweet) :0;
    maxRet = (req.query.maxretweet) ? parseInt(req.query.maxretweet) : 99999999;


    connection.query('select * from todolists', function(err, rows, fields) {
        if (!err) {
            var response = {todolist: rows};
            res.send(response);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});
router.options('/todos',cors(), function(req, res, next) {})
router.options('/todolists',cors(), function(req, res, next) {})

router.post('/todolists',cors(), function(req, res, next) {
    var code =  Math.floor((Math.random() * 999999) + 100000),
    isPrivate = (req.body.isPrivate) ? req.body.isPrivate : false;

    console.log(code)

    connection.query("INSERT INTO todolists (code,private)    VALUES    (?,?)",[code, isPrivate] ,function(err, result) {
        if (!err) {
            res.send(result);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});


router.get('/todos',cors(), function(req, res, next) {
    console.log(req.query.filter)

    todolist  = (req.query.filter.code) ? parseInt(req.query.filter.code) :0;


    var arr = ['select t.* from mapeamentotwitter.todos  t inner join',
    'mapeamentotwitter.todolists lt on t.todolist = lt.id',
    'where lt.code = ?'];


    connection.query(arr.join(" "),[todolist], function(err, rows, fields) {
        if (!err) {
            var response = {todo: rows};
            res.send(response);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

router.post('/todos',cors(), function(req, res, next) {
    var title = (req.body.todo.title) ? req.body.todo.title: "",
        completed = (req.body.todo.completed) ? req.body.todo.completed : false,
        todolist= req.body.todo.todolist;


    console.log(req.body.todo)

    connection.query("INSERT INTO todos (title,completed,todolist)    VALUES    (?,?,?)",[title, completed,todolist] ,function(err, result) {
        if (!err) {
            res.send(result);
        }else{
            res.send("Unable to connect");
            console.error('Error while performing Query.',err);
        }
    });
});

module.exports = router;
