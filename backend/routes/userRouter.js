const router = require('express').Router();
const add = require('../controller/user');
const db = require('../db/dbConnect');
router.get('/', add);

module.exports = router;
