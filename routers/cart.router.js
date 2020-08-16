const express = require('express');
const cardController = require('../controllers/cart.controller');
const router = express.Router();

router.get('/', cardController.index);
router.get('/add/:productId', cardController.addCart);
router.post('/delete/', cardController.delCart);

module.exports = router;