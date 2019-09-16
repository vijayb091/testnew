const mongoose = require('mongoose');
const crypty = require('../middlewares/encryption')
const FutureAndAmbitionsSchema = mongoose.Schema(
  {
    user_id: String,
    futureAmbitions:{
      familyProjects: [{
        ambitionsFamilyType: String,
        ambitionsFamilyDateStart: Date,
        ambitionsFamilyDateEnd: Date,
        ambitionsFamilyProbability: String,
        ambitionsFamilyNotes: {type : String, set: crypty.encrypt , get:crypty.decrypt},
        familyProjectsPercentage:Number,
        prospectPriorityPercentage: Number,
        customerPriorityPercentage: Number,
        candidatePriorityPercentage: Number
      }],
      personalProjects: [{
        ambitionsPersonalType: String,
        ambitionsPersonalDateStart: Date,
        ambitionsPersonalDateEnd: Date,
        ambitionsPersonalProbability: String,
        ambitionsPersonalNotes: { type: String, set: crypty.encrypt, get: crypty.decrypt },
        personalProjectsPercentage: Number,
        prospectPriorityPercentage: Number,
        customerPriorityPercentage: Number,
        candidatePriorityPercentage: Number
      }],
      businessProjects: [{
        ambitionsBusinessType: String,
        ambitionsBusinessDateStart: Date,
        ambitionsBusinessDateEnd: Date,
        ambitionsBusinessProbability: String,
        ambitionsBusinessNotes: { type: String, set: crypty.encrypt, get: crypty.decrypt },
        businessProjectsPercentage: Number,
        prospectPriorityPercentage: Number,
        customerPriorityPercentage: Number,
        candidatePriorityPercentage: Number
      }],
      futureAmbitionsPercentage: Number,
      prospectPriorityPercentage: Number,
      customerPriorityPercentage: Number,
      candidatePriorityPercentage: Number
    },
    futureAmbitionsPercentage: Number,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('FutureAndAmbitionsSchema', FutureAndAmbitionsSchema);
