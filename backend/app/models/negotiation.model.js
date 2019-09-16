const mongoose = require('mongoose');

const NegotiationSchema = mongoose.Schema(
  {
    negotiationMeetings:{ type: Schema.Types.ObjectId, ref: 'NegotiationMeetingsSchema' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('NegotiationSchema', NegotiationSchema);
