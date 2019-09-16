const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactsSocialNetworksSchema = mongoose.Schema(
    {
        socialName: String,
        socialPreferredContactHour: String,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('ContactsSocialNetworksSchema', ContactsSocialNetworksSchema);
