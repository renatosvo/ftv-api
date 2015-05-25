/**
 * Created by renat on 25/05/2015.
 */
var express = require('express');
var mysql = require('mysql');
var router = express.Router();


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'address_book'
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from user LIMIT 2', function(err, rows, fields) {
        connection.end();
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.');
    });
    res.send("hello!")
});

module.exports = router;