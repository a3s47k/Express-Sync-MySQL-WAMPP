const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var pool = mysql.createPool({
	host: "localhost",
	user: "admin",
	password: "123",
	database: "kkk"
});

// var json = "INSERT INTO `data`(`data_name`, `data_catergory`, `attributes`) VALUES ('home','page_content','{
// "settings": {
// 	"name": "FullStack Vietnam Web/App",
// 	"version": "1.3.9",
// 	"logo": "./img/logo.png",
// 	"copyright": "by Bao Nguyen",
// 	"desc": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis doloribus animi reprehenderit itaque blanditiis eius, consectetur accusantium porro libero iste ad dicta vitae asperiores necessitatibus fugiat error? Sapiente, alias recusandae."
// }
// }
// ')";
var sql = "SELECT * FROM `soda`";
var sql_insert = "INSERT INTO `test` (`id`, `name`) VALUES ('7', 'Trihard');";
var sql_update = "UPDATE `test` SET `name`='Updatre' WHERE  id=1";
var sql_delete = "DELETE FROM `test` WHERE id =123";

router.get('/', (req, res, next) => {

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

module.exports = router;





// const express = require('express');

// const router = express.Router();

// var mysql = require('mysql');
// var con = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "",
// 	database: "kkk"
// });
// var mainJson =[];
// router.get('/', (req, res, next) => {

// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "GET, PUT,POST, DELETE");
// 	res.header("Access-Control-Allow-Headers", "Content-Type");
// 	con.connect(function (err) {
// 		console.log("Connected!");
// 		var sql = "SELECT * FROM `soda` ";
// 		// var sql = "INSERT INTO `customers`(`id`, `name`, `address`) VALUES (null,'dsf dsfdsfsd','cg  sdgdsgds fsdf')";
// 		con.query(sql, function (err, results) {
// 			for (const key in results) {
// 				if (results.hasOwnProperty(key)) {
// 					const element = results[key];
// 					mainJson.push(element);
// 					console.log(mainJson);
// 				}
// 			}
// 			res.json({
// 				status: true,
// 				data: mainJson
// 			})
// 		});
// 	});

// });

// module.exports = router;






// // var express = require('express');
// // var router = express.Router();
// // var mysql = require('mysql');
// // /* GET home page. */
// // var con = mysql.createConnection({
// // 	host: "localhost",
// // 	user: "admin",
// // 	password: "123",
// // 	database: "kkk"
// // });
// // var mainJson = [];
// // var tmpJson = {
// // 	id: null,
// // 	name: null
// // }
// // router.get('/', function (req, res, next) {

// // 	con.connect(function (err) {

// // 		if (err) throw err;
// // 		var sql = "SELECT * FROM `test`";
// // 		con.query(sql, function (err, result) {
// // 			if (err) throw err;
// // 			for (const key in result) {

// // 				if (result.hasOwnProperty(key)) {
// // 					const element = result[key];
// // 					tmpJson.id = element.id;
// // 					tmpJson.name = element.name;
// // 					mainJson.push(tmpJson);
// // 				}
// // 			}
// // 			res.jsonp({
// // 				status: true,
// // 				message: "Query success",
// // 				data: mainJson

// // 			})

// // 		})

// // 	});


// // 	;
// // });

// // module.exports = router;
