const express = require('express');

const router = express.Router();
const Utils = require('../helpers/utils');

router.get('/', (req, res, next) => {


	res.render('database', {
		title: 'Data'
	});
});

module.exports = router;
