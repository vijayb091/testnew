const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypty = require('../middlewares/encryption')
const EndCustomerFinancialAssetsSchema = mongoose.Schema(
    {
        user_id: String,
        financialAssetsCustomerId: {type: String, set: crypty.encrypt, get: crypty.decrypt},
        realEstate: [
            {
                realEstateType: String,
                useGoal: String,
                propertyValue: Number,
                revenue: Number,
                maintenanceCosts: Number,
                managementCosts: Number,
                realEstateNotes: { type: String, set: crypty.encrypt, get: crypty.decrypt },
                realEstatePercentage: Number,
                prospectPriorityPercentage: Number,
                customerPriorityPercentage: Number,
                candidatePriorityPercentage: Number
            }
        ],
        indebtedness: [
            {
                debitType: String,
                debitTotalAmountFinanced: Number,
                debitReason: String,
                debitMonthlyQuota: Number,
                debitDuration: Number,
                debitResidualDebitAmount: Number,
                debitResidualDebitDuration: Number,
                debitBank: String,
                debitNotes: { type: String, set: crypty.encrypt, get: crypty.decrypt },
                indebtednessPercentage: Number,
                prospectPriorityPercentage: Number,
                customerPriorityPercentage: Number,
                candidatePriorityPercentage: Number
            }
        ],
        incomeExcess: [
            {
                productType: String,
                paymentFrequency: Number,
                savingsInTime: Number,
                savedAmount: Number,
                totalDuration: Number,
                residualDuration: Number,
                incomeExcessGoal: String,
                incomeExcessNotes: { type: String, set: crypty.encrypt, get: crypty.decrypt },
                incomeExcessPercentage: Number,
                prospectPriorityPercentage: Number,
                customerPriorityPercentage: Number,
                candidatePriorityPercentage: Number
            }
        ],
        percentageEndCustomerFinancialAssets:Number,
        prospectPriorityPercentage: Number,
        customerPriorityPercentage: Number,
        candidatePriorityPercentage: Number
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('EndCustomerFinancialAssetsSchema', EndCustomerFinancialAssetsSchema);
