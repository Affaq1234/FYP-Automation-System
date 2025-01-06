const Proposal=require('../models/Proposal');
const createProposal = async (req, res) => {
    try {
        const newProposal = new Proposal(req.body);
        await newProposal.save();
        res.status(201).json(newProposal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllProposals = async (req, res) => {
    try {
        const Proposals = await Proposal.find();
        res.status(200).json(Proposals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteProposal = async (req, res) => {
    try {
      const { id } = req.params;
      await Proposal.findByIdAndDelete(id);
      res.status(204).json({"Status":"Success"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
const updateProposal = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProposal = await Proposal.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedProposal);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  const findOneProposal = async (req, res) => {
    try {
      const { id } = req.params; 
      const Proposal1 = await Proposal.findById(id); 
  
      if (!Proposal1) {
        return res.status(404).json({ message: 'Proposal not found' });
      }
  
      res.status(200).json(Proposal1); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports={createProposal,deleteProposal,updateProposal,getAllProposals,findOneProposal};