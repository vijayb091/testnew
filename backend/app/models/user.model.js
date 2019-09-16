const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    role:String,
    
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
