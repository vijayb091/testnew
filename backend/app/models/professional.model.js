const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypty = require('../middlewares/encryption')
const ProfessionalSchema = mongoose.Schema(
  {
    user_id: String,
    professionalRegister: [{ 
      registerName: String,
      registerTerritory: String,
      registerSubscriptionDate: { type: String, set: crypty.encrypt, get: crypty.decrypt },
      registerCode: {type : String, set: crypty.encrypt, get: crypty.decrypt},
      professionalRegisterPercentage: Number,
      prospectPriorityPercentage: Number,
      customerPriorityPercentage: Number,
      candidatePriorityPercentage: Number
    }],
    company:[
    {
      companyName: {type : String, set: crypty.encrypt, get: crypty.decrypt},
      companyField: {type: Array,"default":[]},
      companyEmployeesNumber: String,
      companyYearlyIncome: Number,
      companyCollaborationStartingDate: Date,
      companyCollaborationEndingDate: Date,
      companyRole: {type: Array,"default":[]},
      personalRelationWithCompany: String,
      companyContract:{
        contractType:String,
        contractLevel:String,
        contractDuration:String,
        companyContractPercentage: Number,
        prospectPriorityPercentage: Number,
        customerPriorityPercentage: Number,
        candidatePriorityPercentage: Number
      },
      companyPartners:[
        {
          partnersName: { type: String, set: crypty.encrypt, get: crypty.decrypt },
          partnersLastname: { type: String, set: crypty.encrypt, get: crypty.decrypt },
          partnersDateOfBirth: { type: String, set: crypty.encrypt, get: crypty.decrypt },
          partnersRelationWithCompany: { type: String, set: crypty.encrypt, get: crypty.decrypt },
          partnersReferenceUser:String,
          partnersLegalPower:Boolean,
          partnersJobRole:String,
          partnersNotes:String,
          companyPartnersPercentage:Number,
          prospectPriorityPercentage: Number,
          customerPriorityPercentage: Number,
          candidatePriorityPercentage: Number
        }],
      companyPercentage: Number,
      prospectPriorityPercentage: Number,
      customerPriorityPercentage: Number,
      candidatePriorityPercentage: Number
    }],
    percentageProfessionalInfo:Number,
    prospectPriorityPercentage: Number,
    customerPriorityPercentage: Number,
    candidatePriorityPercentage: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ProfessionalSchema', ProfessionalSchema);
