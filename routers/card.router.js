const express = require('express');
const cardController = require('../controllers/card.controller');
const router = express.Router();

router.get('/', cardController.index);
router.get('/add/:productId', cardController.addCard);
router.post('/delete/:idDel', cardController.delCard);

module.exports = router;