const mongoose = require('mongoose');

const EndCustomerInterviewSchema = mongoose.Schema(
  {
    user_id: String,
    endCustomerInterview:[{
      interviewCustomerId: String,
      interviewQuestion: String,
      interviewReason: String,
      interviewSatisfaction: String,
      endCustomerInterviewPercentage: Number,
      prospectPriorityPercentage: Number,
      customerPriorityPercentage: Number,
      candidatePriorityPercentage: Number
  }],
    percentageEndCustomerInterview:Number,

},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('EndCustomerInterviewSchema', EndCustomerInterviewSchema);
