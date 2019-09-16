const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PersonalBankLoyaltyPlanSchema = mongoose.Schema(
    {
        bankLoyaltyPlanName: String,
        bankLoyaltyPlanInitialDate: Date,
        bankLoyaltyPlanFinalDate: Date,
        bankLoyaltyPlanJoinVariable: [{
            bankLoyaltyPlanJoinVariableName: String,
            bankLoyaltyPlanJoinVariableType: String,
            bankLoyaltyPlanJoinVariablePercentage: Number,
            prospectPriorityPercentage: Number,
            customerPriorityPercentage: Number,
            candidatePriorityPercentage: Number
        }],
        bankLoyaltyPlanPercentage: Number,
        prospectPriorityPercentage: Number,
        customerPriorityPercentage: Number,
        candidatePriorityPercentage: Number
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('PersonalBankLoyaltyPlanSchema', PersonalBankLoyaltyPlanSchema);
