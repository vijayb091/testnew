const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CompanySchema = mongoose.Schema(
    {
        user_id: String,
        companyName: String,
        companyField: String,
        companyEmployeesNumber: Number,
        companyYearlyIncome: Number,
        companyCollaborationStartingDate: new Date,
        companyCollaborationEndingDate: new Date,
        companyRole: String,
        personalRelationWithCompany: String,
        companyContract: { type: Schema.Types.ObjectId, ref: 'CompanyContractSchema' },
        companyPartners: { type: Schema.Types.ObjectId, ref: 'CompanyPartnersSchema' }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('CompanySchema', CompanySchema);
