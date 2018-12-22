const express = require('express');
const router = express.Router();
const Utils = require('./helpers/utils');
const mysql = require('mysql');
var fs = require('fs');
var pool = mysql.createPool({
	host: "localhost",
	user: "admin",
	password: "123",
	database: "kkk"
});
var sql = "SELECT * FROM `soda`";
var sqlPageContent = "SELECT * FROM `data`";

router.get('/', (req, res, next) => {
	res.json({
		title: 'Khoai To'
	});
});

router.get('/product', (req, res, next) => {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT,POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!
		// Use the connection
		connection.query(sql, function (error, results) {
			var mainJson = [];
			// When done with the connection, release it.
			connection.release();
			// Handle error after the release.
			if (error) throw error;
			for (const key in results) {
				if (results.hasOwnProperty(key)) {
					const element = results[key];
					mainJson.push(element);
					console.log(results);
				}
			}
			res.jsonp({
				status: true,
				data: mainJson
			})
			// Don't use the connection here, it has been returned to the pool.
		});
	});

});




router.get('/page_content', (req, res, next) => {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT,POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!
		// Use the connection
		connection.query(sqlPageContent, function (error, results) {
			var mainJson = [];
			// When done with the connection, release it.
			connection.release();
			// Handle error after the release.
			if (error) throw error;
			for (const key in results) {
				if (results.hasOwnProperty(key)) {
					const element = results[key];
					mainJson.push(element);
				}
			}
			res.jsonp({
				data: mainJson
			})
			// Don't use the connection here, it has been returned to the pool.
		});
	});

});




router.get('/products', (req, res, next) => {
	var obj;
	fs.readFile('./db/products.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		res.json(obj); 
	});
});

router.get('/detail/:id', (req, res, next) => {
	var obj;
	fs.readFile('./db/products.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		var filtered = obj.lists.filter(function (e) {
			return e.id == req.params.id;
		});
		let newjSON = {
			data: filtered[0]
		}
		res.json(newjSON); 
	});
});

module.exports = router;
