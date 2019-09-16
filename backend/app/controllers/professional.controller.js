// const ProfessionalRegisterSchema = require('../models/professionalRegister.model');
// const CompanySchema = require('../models/company.model');
// const companyContractSchema = require('../models/companyContract.model');
// const companyPartnersSchema = require('../models/companyPartners.model');
const ProfessionalSchema = require('../models/professional.model');
exports.create = (req, res) => {

  const data = calculatePercentage(req.body)

  var professionalSchema = new ProfessionalSchema({
    user_id: req.body.user_id,
    professionalRegister: {
      registerName: data.professionalRegister.registerName,
      registerTerritory: data.professionalRegister.registerTerritory,
      registerSubscriptionDate: data.professionalRegister.registerSubscriptionDate,
      registerCode: data.professionalRegister.registerCode
    },
    company: data.company,
    percentageProfessionalInfo: data.percentageProfessionalInfo,
    prospectPriorityPercentage: data.prospectPriorityPercentage,
    customerPriorityPercentage: data.customerPriorityPercentage,
    candidatePriorityPercentage: data.candidatePriorityPercentage
    // percentageProfessionalInfo: calculatePercentage(req.body)
  })
  
  professionalSchema.save()
    .then(data => {
      res.status(200).send({ 
        message: "Record Saved Successfully", 
        data: data.toObject({ getters: true, setters: true, virtuals: true }) })
    })
    .catch(err => {
      res.status(500).send(
        {
          message: err.message || "Some error occurred while creating the baseinfo."
        }
      )
    })
  }


const calculatePercentage = (data) => {
  let actualProfessionalInfo = 0
  
  if (Array.isArray(data.professionalRegister) && data.professionalRegister.length>0){
    let prValueArray = 0
    data.professionalRegister.map((item)=>{
      let prValue = Object.keys(item).length/4
      item.professionalRegisterPercentage =  prValue*100
      item.prospectPriorityPercentage = prValue * 10 * 8
      item.customerPriorityPercentage = prValue * 10 * 8
      item.candidatePriorityPercentage  = prValue * 10 * 10
      prValueArray +=prValue
    })
    actualProfessionalInfo += prValueArray/data.professionalRegister.length
  }

  if (Array.isArray(data.company) && data.company.length>0){
    let companyActualValueTemp = 0 
    data.company.map((item)=>{
       let companyActualValue = 0 
      if (typeof item.companyContract == "object" ){
        let companyContractValue = Object.keys(item.companyContract).length/3
        item.companyContract.companyContractPercentage = companyContractValue * 100 
        item.companyContract.prospectPriorityPercentage = companyContractValue * 10 * 8
        item.companyContract.customerPriorityPercentage = companyContractValue * 10 * 10
        item.companyContract.candidatePriorityPercentage = companyContractValue * 10 * 10
        companyActualValue += companyContractValue
      }
      console.log(item)
      if (Array.isArray(item.companyPartners) && item.companyPartners.length>0){
        let actualCompanyValue = 0
        item.companyPartners.map((partnersItem) =>{
          let valuePartnersTemp = Object.keys(partnersItem).length/8
          partnersItem.companyPartnersPercentage = valuePartnersTemp*100
          partnersItem.prospectPriorityPercentage = valuePartnersTemp * 10 * 6
          partnersItem.customerPriorityPercentage = valuePartnersTemp * 10 * 8
          partnersItem.candidatePriorityPercentage = valuePartnersTemp * 10 * 4
          actualCompanyValue += valuePartnersTemp
        })
        companyActualValue += actualCompanyValue/item.companyPartners.length
      }
      companyActualValue += Object.keys(item).length - 2

      let percentageCompanyActual = companyActualValue/10
      item.companyPercentage = percentageCompanyActual * 100,
      item.prospectPriorityPercentage = percentageCompanyActual * 10 * 10
      item.customerPriorityPercentage = percentageCompanyActual * 10 * 10
      item.candidatePriorityPercentage = percentageCompanyActual * 10 * 10
      companyActualValueTemp += percentageCompanyActual 
    })

    actualProfessionalInfo += (companyActualValueTemp/ data.company.length)
  }
  let percentageValue = actualProfessionalInfo/2
  data.percentageProfessionalInfo = percentageValue * 100
  data.prospectPriorityPercentage = percentageValue * 10 * 10
  data.customerPriorityPercentage = percentageValue * 10 * 10
  data.candidatePriorityPercentage = percentageValue * 10 * 10
  console.log(JSON.stringify(data))
  return data

}

exports.findOne = (req, res) => {
  ProfessionalSchema.findOne({ _id: req.params.id })
    .then(professionalInfos => {
      if (!professionalInfos) {
        return res.status(404).send({
          message: "Records Not Found"
        });
      }
      res.send(professionalInfos.toObject({ getters: true, setters: true, virtuals: true }));
    })
    .catch(err => {
      console.log(err)
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Record not found"
        });
      }
      return res.status(500).send({
        message: "Error retrieving Records"
      })
    })
}
//update query
exports.update = (req, res) => {
  const data = calculatePercentage(req.body)
  ProfessionalSchema.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
    .then(professionalInfo => {
      if (!professionalInfo) {
        return res.status(404).send({
          message: "Records Not Found"
        });
      }
      res.send(professionalInfo.toObject({ getters: true, setters: true, virtuals: true }));
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Record not found"
        });
      }
      return res.status(500).send({
        message: "Error retrieving Records"
      })
    })
}



exports.findAll = (req, res) => {

    PersonalInfosSchema.find()
      .then(personalInfos => {
        if (!personalInfos) {
          return res.status(404).send({
            message: "Records Not Found"
          });
        }
        res.send(personalInfos);
      })
      .catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "Record not found"
          });
        }
        return res.status(500).send({
          message: "Error retrieving Records"
        })
      })
  
  }
exports.delete = (req, res) => {

    PersonalInfosSchema.findOneAndRemove(req.params.id)
  .then(personalInfos => {
      if(!personalInfos) {
          return res.status(404).send({
              message: "Record not found"
          });
      }
      res.send({message: "Record deleted successfully!"});
  })
  .catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Record not found "
          });
      }
      return res.status(500).send({
          message: "Could not delete Record, something went wrong!!"
      });
  });
}
