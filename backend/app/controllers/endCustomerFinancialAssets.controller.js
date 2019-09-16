const EndCustomerFinancialAssetsSchema = require('../models/endCustomerFinancialAssets.model');
exports.create = (req, res) => {
  const data = percentageCalculation(req.body)
  const endCustomerFinancialAssets = new EndCustomerFinancialAssetsSchema({
    user_id: req.body.user_id,
    financialAssetsCustomerId: req.body.financialAssetsCustomerId,
    realEstate: data.realEstate,
    indebtedness: data.indebtedness, 
    incomeExcess: data.incomeExcess,
    percentageEndCustomerFinancialAssets: data.percentageEndCustomerFinancialAssets,
    prospectPriorityPercentage: data.prospectPriorityPercentage,
    customerPriorityPercentage: data.customerPriorityPercentage,
    candidatePriorityPercentage: data.candidatePriorityPercentage
  })



  endCustomerFinancialAssets.save()
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
const percentageCalculation = (data)=>{
  let actualEndFinancialAssets = 0
  if (Array.isArray(data.realEstate)&& data.realEstate.length>0){
    let actualValueTemp = 0
    data.realEstate.map((items)=>{
      actualValueTemp = Object.keys(items).length/7
      items.realEstatePercentage = actualValueTemp*100
      items.prospectPriorityPercentage = actualValueTemp*10*8
      items.customerPriorityPercentage = actualValueTemp*10*10
      items.candidatePriorityPercentage = actualValueTemp*10*6
    })
    actualEndFinancialAssets += actualValueTemp/data.realEstate.length
  }
  if (Array.isArray(data.indebtedness) && data.indebtedness.length>0){
    let actualValueTemp = 0
    data.indebtedness.map((items) => {
      actualValueTemp = Object.keys(items).length / 9
      items.indebtednessPercentage = actualValueTemp * 100
      items.prospectPriorityPercentage = actualValueTemp * 10 * 8
      items.customerPriorityPercentage = actualValueTemp * 10 * 10
      items.candidatePriorityPercentage = actualValueTemp * 10 * 6
    })
    actualEndFinancialAssets += actualValueTemp / data.indebtedness.length
  }
  if (Array.isArray(data.incomeExcess) && data.incomeExcess.length>0){
    let actualValueTemp = 0
    data.incomeExcess.map((items) => {
      actualValueTemp = Object.keys(items).length / 8
      items.incomeExcessPercentage = actualValueTemp * 100
      items.prospectPriorityPercentage = actualValueTemp * 10 * 8
      items.customerPriorityPercentage = actualValueTemp * 10 * 10
      items.candidatePriorityPercentage = actualValueTemp * 10 * 6
    })
    actualEndFinancialAssets += actualValueTemp / data.incomeExcess.length
  }
  if (data.financialAssetsCustomerId)
    actualEndFinancialAssets++
  
  let percentageValue = actualEndFinancialAssets / 4
  // console.log(actualEndFinancialAssets*100/4)
  data.percentageEndCustomerFinancialAssets = percentageValue*100
  data.prospectPriorityPercentage =  percentageValue*10*8
  data.customerPriorityPercentage = percentageValue*10*10
  data.candidatePriorityPercentage = percentageValue*10*6
  console.log(data)
  return data

}

//calculate the array
const totalArrayValues = (dataArray) => {
  let totalValues = 0;
  dataArray.forEach((items) => {
    totalValues += Object.keys(items).length
  })
  return totalValues;
}

//update query
exports.update = (req, res) => {
  const data = percentageCalculation(req.body)
  EndCustomerFinancialAssetsSchema.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
    .then(data => {
      res.status(200).send({
        message: "Record update successfully",
        data: data.toObject({ getters: true, setters: true, virtuals: true })
      })
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Record not found "
        });
      }
      return res.status(500).send({
        message: "Could not delete Record, something went wrong!!"
      });
    })
}

exports.findOne = (req, res) => {

  EndCustomerFinancialAssetsSchema.findOne({_id: req.params.id})
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: "Records Not Found"
          });
        }
        res.send(data.toObject({ getters: true, setters: true, virtuals: true }));
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
// exports.delete = (req, res) => {

//     PersonalInfosSchema.findOneAndRemove(req.params.id)
//   .then(personalInfos => {
//       if(!personalInfos) {
//           return res.status(404).send({
//               message: "Record not found"
//           });
//       }
//       res.send({message: "Record deleted successfully!"});
//   })
//   .catch(err => {
//       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//           return res.status(404).send({
//               message: "Record not found "
//           });
//       }
//       return res.status(500).send({
//           message: "Could not delete Record, something went wrong!!"
//       });
//   });
// }
