const mocha = require('mocha');
const assert = require('assert');
const Humanbase = require('../app/models/humanbase.model');
//Describe tests 
describe('saving data to database', function(){


    //create tests..
    it('insert human details into database', function(done){
        var humanbase = new Humanbase({
            contactType: "test type",
            customer: "john doe",
            name: "john",
            lastname: "doe",
            personType: "natural Person",
            gender: "male",
            age: "22",
            dateOfBirth: "12-2-1995",
            cityOfBirth: "Mux",
            provinceOfBirth: "punjab",
            residentialAddress: "house #122, mux pakistan",
            residentialCity: "mux",
            residentialProvince: "punjab",
            residentialZipCode: "60000",
            domicileAddress: "house#123 mux, pakistan",
            domicileCity: "mux",
            domicileProvince: "punjab",
            domicileZipCode: "60000",
            complienceToMarketing: "yes",
            customerType: "regular",
            detailedInformation:[{
                bankid: {
                    fidelizationPlanName: "bank information",
                    dateOfJoin: "2-12-2012",
                    complianceToPlan: "strict",
                    ConsensoPerPiano: "se vieni contattatoo perche aderisci al piano"
                },
                family: {
                    name: "john",
                    lastname: "doe",
                    dateOfBirth: "12-2-1998",
                    parentalRelationship: "any relation",
                    contactType: "live",
                    decisionalPowerLevel: "actual limit"
                },
                "contact": {
                    mobile: "033312312",
                    email: "john@doe.com",
                    socialNetwork: [{
                       messanger: {
                            id: "1",
                            preferredContactTime: "mmorning"
                        },
                        twitter: {
                            id: "2",
                            preferredContactTime: "evening"
                        },
                        facebook: {
                            id: "12",
                            preferredContactTime: "mmorning"
                        },
                        linkedIn: {
                            id: "12",
                            preferredContactTime: "mmorning"
                        },
                        whatsapp: {
                            id: "12",
                            preferredContactTime: "mmorning"
                        }
                    }]
                },
                riskprofile: {
                    id: "1",
                    type: "test",
                    issueDate: "12-12-2017",
                    expiryDate: "12-2-2018",
                    idCode: "12",
                    releaseInstitute: "abc test"
                }
            }]
        });
        humanbase.save().then(function(){
            assert(humanbase.isNew === false);
            done();
        });
    })
})