const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/', userController.index);

router.get('/search', userController.search);

router.get('/create', userController.getCreate);

router.get('/:id', userController.getViewUser);

router.post('/create', userController.postCreate);

module.exports = router;