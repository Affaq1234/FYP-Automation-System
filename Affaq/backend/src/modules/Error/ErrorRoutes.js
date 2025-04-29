const express = require('express');
const router = express.Router();
const errorController = require('../Error/ErrorController');

router.post('/', errorController.createError);
router.get('/', errorController.getAllErrors);
router.get('/:id', errorController.getErrorById);
router.delete('/:id', errorController.deleteError);

module.exports = router;
