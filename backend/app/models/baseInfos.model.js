const mongoose = require('mongoose');
const crypty = require('../middlewares/encryption')
const BaseInfosSchema = mongoose.Schema(
	{
		baseContactType: {type : String},
		baseCustomer: {type : String, set : crypty.encrypt, get: crypty.decrypt},
		baseName: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseLastname: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		basePersonType: {type :String},
		baseGender: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseAge: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseDateOfBirth: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseCityOfBirth: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseProvinceOfBirth: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseResidentialAddress: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseResidentialCity: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseResidentialProvince: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseResidentialZipCode: Number,
		baseDomicileAddress: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseDomicileCity: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseDomicileProvince: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseDomicileZipCode: Number,
		baseComplienceToMarketing: Boolean,
		// baseCustomerType: { type: String, set: crypty.encrypt, get: crypty.decrypt },
		baseInfoPercentage:{type: Number, "default": 0}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('BaseInfosSchema', BaseInfosSchema);
