const express = require('express');
const userController = require('../controllers/user.controller');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

const router = express.Router();
var invalidUser = require('../invalid/user.invalid');

router.get('/', userController.index);

router.get('/search', userController.search);

router.get('/create', userController.getCreate);

router.get('/:id', userController.getViewUser);

router.post('/create', upload.single('avatar'),invalidUser, userController.postCreate);

module.exports = router;