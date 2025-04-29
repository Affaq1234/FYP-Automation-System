const express = require('express');
const router = express.Router();
const logController = require('../Log/LogController');

router.post('/', logController.createLog);
router.get('/', logController.getAllLogs);
router.get('/:id', logController.getLogById);
router.delete('/:id', logController.deleteLog);

module.exports = router;
