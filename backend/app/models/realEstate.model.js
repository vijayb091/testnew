const mongoose = require('mongoose');

const RealEstateSchema = mongoose.Schema(
    {
        realEstateType: String,
        useGoal: String,
        propertyValue: Number,
        revenue: Number,
        maintenanceCosts: Number,
        managementCosts: Number,
        realEstateNotes: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('RealEstateSchema', RealEstateSchema);
