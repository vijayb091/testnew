
const mongoose = require('mongoose');

const EndCustomerRevenueSchema = mongoose.Schema(
  {
    user_id: String,
    endCustomerRevenue:{
      revenueCustomerId: Number,
      customerFirstMetDate:Date,
      customerInvestedAmount: Number,
      revenueFee:[{
        revenueFeeName: String,
        revenueFeeYearlyAmount: Number,
        revenueFeePercentage:Number,
        prospectPriorityPercentage: Number,
        customerPriorityPercentage: Number,
        candidatePriorityPercentage: Number
    }],
      revenueTotalAmount: Number,
      endCustomerRevenuePercentage:Number,
      prospectPriorityPercentage: Number,
      customerPriorityPercentage: Number,
      candidatePriorityPercentage: Number
  },
    percentageRevenue:Number
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('EndCustomerRevenueSchema', EndCustomerRevenueSchema);
