const mongoose = require('mongoose');

const EndCustomerWalletDetailSchema = mongoose.Schema(
  {
    user_id: String,
    endCustomerWalletDetail:[{
      WalletCustomerId: Number,
      WalletProductType: String,
      WalletBank: String,
      walletProductGoal: String,
      WalletNotes: String,
      endCustomerWalletPercentage: Number,
      prospectPriorityPercentage: Number,
      customerPriorityPercentage: Number,
      candidatePriorityPercentage: Number
    }],
    percentageEndCustomerWallet:Number
    
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('EndCustomerWalletDetailSchema', EndCustomerWalletDetailSchema);
