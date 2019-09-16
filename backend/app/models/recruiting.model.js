const mongoose = require('mongoose');

const RecruitingSchema = mongoose.Schema(
    {
        user_id: String,
        negotiation: {
            negotiationMeetings:[
            {
                negotiationMeetingState: String,
                negotiationMeetingDate: { type: Date, default: Date.now },
                negotiationMeetingDuration: Number
            }
        ]},
        recruitingBankName: String,
        recruitingGoal: String,
        recruitingRefferal: String,
        recruitingFinancialAssets: Number,
        recruitingMainService: String,
        recruitingBusinessApproach: String,
        recruitingFamilyTypeWallet:[
        { 
            familyType: String,
            familyTypeAmount: Number,
        }],
        
        recruitingListOfMostUsedProductCompanies:[String],
        recruitingMostUsedProductCompanies:[{
            recruitingMostUsedProductCompany:String,
            recruitingProductCompanyAmount:Number
        }],
        recruitingAssetWallet: [
        { 
            assetType: String,
            assetAmount: Number, 
        }],
        recruitingDecisionalDrivers: { 
            professionalFreedom: Number,
            logistics: Number,
            professionalLongevity: Number,
            economics: Number,
            carrier: Number,
            support: Number,
            brand: Number,
            serviceType: Number,
            pricing: Number,
            consultant: Number,
            serviceSatisfaction: Number
        },
        recruitingWishList:[ 
        { 
            wishListType: String,
            wishListPriority: String
        }],
        recruitingNetwork: { 
            networkIn: Boolean,
            networkOut: Boolean
        },
        recruitingNegotiationlndicators: { 
            negotiationProfileCoherence: Number,
            negotiationMotivation: Number,
            negotiationProbability: Number
        },
        recruitingCustomersSort:[ 
        { 
            customerCategory: String,
            customerType: String,
            customerQuantity: Number,
            customerTotalWallet: Number, 
            customerCUD: Number
        }],
        recruitingInterviewResult: { 
            aesthetic: Number,
            intellectual: Number,
            recruitingReputationForAdvisor: Number,
            recruitingReputationForCandidate: Number,
            recruitingReputationForCompany:Number
        },
        recruitingPercentage: Number
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('RecruitingSchema', RecruitingSchema);
