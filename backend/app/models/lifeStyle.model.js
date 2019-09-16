const mongoose = require('mongoose');
const crypty = require('../middlewares/encryption')

const LifeStyleSchema = mongoose.Schema(
  {
    user_id: String,
    lifeStyleHobbies: [{
      lifeStyleHobbiesType: String,
      lifeStyleHobbiesSince: Date,
      lifeStyleHobbiesNotes: {type : String,set: crypty.encrypt, get: crypty.decrypt},
      lifeStyleHobbiesPercentage: Number,
      prospectPriorityPercentage: Number,
      customerPriorityPercentage: Number,
      candidatePriorityPercentage: Number
    }],
    lifeStyleInterests: [{
      lifeStyleInterestsType: String,
      lifeStyleInterestsSince: Date,
      lifeStyleInterestsNotes: { type: String, set: crypty.encrypt, get: crypty.decrypt },
      lifeStyleInterestsPercentage: String,
      prospectPriorityPercentage: Number,
      customerPriorityPercentage: Number,
      candidatePriorityPercentage: Number
    }],
    lifeStyleEventsInterests: [{
      lifeStyleEventsInterestsType: String,
      lifeStyleEventsInterestsSince: Date,
      lifeStyleEventsInterestsNotes: { type: String, set: crypty.encrypt, get: crypty.decrypt },
      lifeStyleEventsInterestsPercentage: Number,
      prospectPriorityPercentage: Number,
      customerPriorityPercentage: Number,
      candidatePriorityPercentage: Number
    }],
    lifeStylePercentage:Number,
    prospectPriorityPercentage: Number,
    customerPriorityPercentage: Number,
    candidatePriorityPercentage: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('LifeStyleSchema', LifeStyleSchema);
