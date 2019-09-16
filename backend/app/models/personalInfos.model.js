const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypty = require('../middlewares/encryption')
const PersonalInfosSchema = mongoose.Schema(
  {
    user_id: String,
    personalBank :[
      {
        bankName:String,
        bankJoinDate:String,
        bankLoyaltyPlan:[{
          bankLoyaltyPlanName:{type:String, set: crypty.encrypt, get: crypty.decrypt},
          bankLoyaltyPlanInitialDate: {type : String, set: crypty.encrypt, get: crypty.decrypt},
          bankLoyaltyPlanFinalDate:{type: String, set: crypty.encrypt, get: crypty.decrypt},
          bankLoyaltyPlanJoinVariable:[{
            bankLoyaltyPlanJoinVariableName:String,
            bankLoyaltyPlanJoinVariableType: String,
            bankLoyaltyPlanJoinVariablePercentage:Number,
            prospectPriorityPercentage: Number,
            customerPriorityPercentage: Number,
            candidatePriorityPercentage: Number
          }],
          bankNotes:{type: String, set: crypty.encrypt, get: crypty.decrypt},
          bankLoyaltyPlanPercentage: Number,
          prospectPriorityPercentage: Number,
          customerPriorityPercentage: Number,
          candidatePriorityPercentage: Number
        }],
        personalBankPercentage: Number,
        prospectPriorityPercentage: Number,
        customerPriorityPercentage: Number,
        candidatePriorityPercentage: Number
      }
    ],
    personalRiskProfile:[{
      riskType: String,
      riskDate: String,
      riskExpiryDate: String,
      riskIdCode: Number,
      riskReleaseInstitute: String,
      riskNotes: {type : String, set: crypty.encrypt, get: crypty.decrypt},
      personalRiskProfilePercentage: Number,
      prospectPriorityPercentage: Number,
      customerPriorityPercentage: Number,
      candidatePriorityPercentage: Number
    }],
    personalFamilyComponents:[{
      familyName: { type: String, set: crypty.encrypt, get: crypty.decrypt },
      familyLastName: { type: String, set: crypty.encrypt, get: crypty.decrypt },
      familyDateOfBirth: { type: String, set: crypty.encrypt, get: crypty.decrypt },
      familyParentalRelationship: { type: String, set: crypty.encrypt, get: crypty.decrypt },
      familyContactType: { type: String, set: crypty.encrypt, get: crypty.decrypt },
      familyDecisionalPowerLevel: Boolean,
      familyNotes: { type: String, set: crypty.encrypt, get: crypty.decrypt },
      personalFamilyComponentsPercentage: Number,
      prospectPriorityPercentage: Number,
      customerPriorityPercentage: Number,
      candidatePriorityPercentage: Number
    }],
    personalContacts:{
      contactsMobile: String,
      contactsEmail: String,
      contactsSocialNetwork:[{
        socialName: { type: String, set: crypty.encrypt, get: crypty.decrypt },
        socialPreferredContactHour: { type: String, set: crypty.encrypt, get: crypty.decrypt },
        contactsSocialNetworkPercentage:Number,
        prospectPriorityPercentage: Number,
        customerPriorityPercentage: Number,
        candidatePriorityPercentage: Number
      }],
      contactsNotes: { type: String, set: crypty.encrypt, get: crypty.decrypt },
      personalContactsPercentage: Number,
      prospectPriorityPercentage: Number,
      customerPriorityPercentage: Number,
      candidatePriorityPercentage: Number
    },
    personalNotes: { type: String, set: crypty.encrypt, get: crypty.decrypt },
    personalFamilyYearlyIncome: Number,
    personalYearlyIncome: Number,
    percentagePersonalInfos:Number,
    prospectPriorityPercentage: Number,
    customerPriorityPercentage: Number,
    candidatePriorityPercentage: Number
  },
  {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
  }
);

module.exports = mongoose.model('PersonalInfosSchema', PersonalInfosSchema);
