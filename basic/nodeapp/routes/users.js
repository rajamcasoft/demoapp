var express = require('express');
var router = express.Router();
var db=require('../database');
var bodyParser = require('body-parser')

// another routes also appear here



// this script to fetch data from MySQL databse table
router.get('/user-list', function(req, res, next) {
    var sql='SELECT * FROM customer';
    console.log(sql);
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data});
  });
});

router.get('/edit/:id', function(req, res, next) {
  var sql='SELECT * FROM customer where Id =' + req.params.id;
  console.log(sql);
  db.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('edit', { title: 'User List', userData: data});
});
});


router.post('/save', bodyParser.urlencoded(),function(req, res, next) {
console.log(req.body);
  db.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function (error, results, fields) {
	  if (error) throw error;
    console.log(results);
    
    var sql='SELECT * FROM customer';
    console.log(sql);
    db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data});
  });


  });
});




module.exports = router;