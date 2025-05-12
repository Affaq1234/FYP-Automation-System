const express = require('express');
const router = express.Router();
const evaluationController = require('../Evaluation/EvaluationController');

router.post('/', evaluationController.createEvaluation);
router.get('/', evaluationController.getAllEvaluations);
router.get('/evaluator/:evaluatorId',evaluationController.getEvaluationsByEvaluatorId);
router.get('/group/:groupId',evaluationController.getEvaluationsByGroupId);
router.get('/:id', evaluationController.getEvaluationById);
router.put('/:id', evaluationController.updateEvaluation);
router.delete('/:id', evaluationController.deleteEvaluation);

module.exports = router;
