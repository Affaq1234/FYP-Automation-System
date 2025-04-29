const express = require('express');
const router = express.Router();
const evaluatorController = require('../Evaluator/EvaluatorController');

router.post('/', evaluatorController.createEvaluator);
router.get('/', evaluatorController.getAllEvaluators);
router.get('/:id', evaluatorController.getEvaluatorById);
router.put('/:id', evaluatorController.updateEvaluator);
router.delete('/:id', evaluatorController.deleteEvaluator);

module.exports = router;
