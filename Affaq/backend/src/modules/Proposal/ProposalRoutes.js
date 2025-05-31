const express = require('express');
const router = express.Router();
const proposalController = require('./ProposalController'); 

router.get('/', proposalController.getAllProposals);
router.post('/', proposalController.createProposal);
router.get('/group/:groupNo',proposalController.findByGroupId);
router.get('/supervisor/:id',proposalController.findBySupervisorId);
router.get('/attachment/:id',proposalController.getProposalAttachment);
router.delete('/:id',proposalController.deleteProposal);
router.patch('/:id',proposalController.updateProposal);
router.get('/:id',proposalController.findOneProposal);

module.exports=router;