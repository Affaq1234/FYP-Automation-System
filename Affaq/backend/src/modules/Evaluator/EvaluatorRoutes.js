const express = require('express');
const router = express.Router();
const evaluatorController = require('../Evaluator/EvaluatorController');
const Evaluator = require('./Evaluator');

router.post('/', evaluatorController.createEvaluator);
router.get('/', evaluatorController.getAllEvaluators);
router.get('/user/:userId',evaluatorController.getEvaluatorsByUserId);
router.get('/:id', evaluatorController.getEvaluatorById);
router.patch('/:id', evaluatorController.updateEvaluator);
router.delete('/:id', evaluatorController.deleteEvaluator);

module.exports = router;
