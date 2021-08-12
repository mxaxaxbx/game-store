const express = require('express');
const router  = express.Router();

const { register, list } = require('../controllers/user.controller');

console.log('Registring user routing /api/users');

console.log('[POST] /register ');
router.post('/register', register);

console.log('[GET] /list ');
router.get('/list/:name?', list);

console.log('\n');

module.exports = router;
