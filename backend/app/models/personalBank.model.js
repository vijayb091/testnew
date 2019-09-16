const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PersonalBankSchema = mongoose.Schema(
    {
        bankName: String,
        bankJoinDate: String,
        bankLoyaltyPlan: [Object],
        personalBankPercentage: Number,
        prospectPriorityPercentage: Number,
        customerPriorityPercentage: Number,
        candidatePriorityPercentage: Number
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('PersonalBankSchema', PersonalBankSchema);
