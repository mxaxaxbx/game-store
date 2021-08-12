const express = require('express');
const router  = express.Router();

const { register } = require('../controllers/sales.controller');

console.log('Registring sales routing /api/sales');

console.log('[POST] /register ');
router.post('/register', register);

// console.log('[GET] /list ');
// router.get('/list/:name?', list);

console.log('\n');

module.exports = router;
