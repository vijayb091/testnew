const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypty = require('../middlewares/encryption')
const FinancialKnowledgeSchema = mongoose.Schema(
  {
    user_id: String,
    financialKnowledge:{
      financialKnowledgeLevel: String,
      financialTrust: String,
      timeDedicatedToInvestments: String,
      decisionPower: String,
      investmentStyleType: String,
      investmentGoals: String,
      oscillationTolerance: String,
      updatesInterval: String,
      updatesSentVia: String,
      financialInfoSources: { type: [String]},
      minimumReturnExpectation: {
        minimumReturnExpectationType: String,
        minimumReturnExpectationQuantity: Number,
        minimumReturnPriorityProspect:Number,
        minimumReturnPriorityCandidate: Number,
        minimumReturnPriorityCustomer: Number
      },
      financialKnowledgeNotes: {type: String, set: crypty.encrypt, get: crypty.decrypt},
      financialKnowledgePriorityProspect: Number,
      financialKnowledgePriorityCandidate: Number,
      financialKnowledgePriorityCustomer: Number
    },
    percentageFinancialKnowledge: Number,
    
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('FinancialKnowledgeSchema', FinancialKnowledgeSchema);
