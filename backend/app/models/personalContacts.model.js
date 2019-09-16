const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PersonalContactsSchema = mongoose.Schema(
    {
        contactsMobile: String,
        contactsEmail: String,
        contactsSocialNetworks: { type: Schema.Types.ObjectId, ref: 'ContactsSocialNetworksSchema' },
        contactsNotes: String,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('PersonalContactsSchema', PersonalContactsSchema);
