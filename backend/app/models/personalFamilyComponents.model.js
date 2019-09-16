const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PersonalFamilyComponentsSchema = mongoose.Schema(
    {
        familyName: String,
        familyLastName: String,
        familyDateOfBirth: String,
        familyParentalRelationship: String,
        familyContactType: String,
        familyDecisionalPowerLevel: Boolean,
        familyNotes: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('PersonalFamilyComponentsSchema', PersonalFamilyComponentsSchema);
