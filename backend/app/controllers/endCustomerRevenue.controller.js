const EndCustomerRevenueSchema = require('../models/endCustomerRevenue.model');

exports.create = (req, res) => {
  const data = percentageCalculation(req.body)

  const endCustomerRevenue = new EndCustomerRevenueSchema(
    {
        user_id: req.body.user_id,
        endCustomerRevenue:{
          revenueCustomerId: data.endCustomerRevenue.revenueCustomerId,
          customerFirstMetDate:data.endCustomerRevenue.customerFirstMetDate,
          customerInvestedAmount: data.endCustomerRevenue.customerInvestedAmount,
          revenueFee: data.endCustomerRevenue.revenueFee,
          revenueTotalAmount: data.endCustomerRevenue.revenueTotalAmount,
          endCustomerRevenuePercentage: data.endCustomerRevenue.endCustomerRevenuePercentage,
          prospectPriorityPercentage: data.endCustomerRevenue.prospectPriorityPercentage,
          customerPriorityPercentage: data.endCustomerRevenue.customerPriorityPercentage,
          candidatePriorityPercentage: data.endCustomerRevenue.candidatePriorityPercentage
        },
      percentageRevenue: data.endCustomerRevenue.endCustomerRevenuePercentage
    }
  );
  
  endCustomerRevenue.save()
    .then(data => res.status(200).send({message: "Record Saved Succesfully!!", data:data}))
    .catch(err => {
      res.status(500).send(
        {
          message: err.message || "Some error occurred while creating the record."
        }
      )
    })
}

const percentageCalculation = (data) => {
  
  let actualEndCustomerRevenue = 0 

  let endCustomerRevenueObject = data.endCustomerRevenue
  if(typeof endCustomerRevenueObject =="object" && endCustomerRevenueObject != null){
    if (endCustomerRevenueObject.revenueCustomerId != undefined)
      actualEndCustomerRevenue++;
    if (endCustomerRevenueObject.customerFirstMetDate != undefined)
      actualEndCustomerRevenue++
    if (endCustomerRevenueObject.customerInvestedAmount != undefined)
      actualEndCustomerRevenue++
    if (Array.isArray(endCustomerRevenueObject.revenueFee)){
      let actualValueTemp = 0
      data.endCustomerRevenue.revenueFee.map((item)=>{
        let percentageTemp = Object.keys(item).length/2
        item.revenueFeePercentage = percentageTemp*100
        item.prospectPriorityPercentage = percentageTemp * 10 *4
        item.customerPriorityPercentage = percentageTemp * 10 *8
        item.candidatePriorityPercentage = percentageTemp * 10 *8
        actualValueTemp +=percentageTemp
      })
      actualEndCustomerRevenue +=  actualValueTemp/endCustomerRevenueObject.revenueFee.length
    }
    if (endCustomerRevenueObject.revenueTotalAmount != undefined) {
      actualEndCustomerRevenue++
    }
    actualEndCustomerRevenue =actualEndCustomerRevenue/5
    data.endCustomerRevenue.endCustomerRevenuePercentage= actualEndCustomerRevenue *100,
    data.endCustomerRevenue.prospectPriorityPercentage = actualEndCustomerRevenue * 10 *4
    data.endCustomerRevenue.customerPriorityPercentage = actualEndCustomerRevenue * 10 *8
    data.endCustomerRevenue.candidatePriorityPercentage = actualEndCustomerRevenue * 10 *8
  }
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

//find One
exports.findOne = (req, res) => {

  EndCustomerRevenueSchema.findOne({ _id: req.params.id })
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: "Records Not Found"
        });
      }
      res.send(data);
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


//update query
exports.update = (req, res) => {
  const data = percentageCalculation(req.body)
  EndCustomerRevenueSchema.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
    .then(data => {
      res.status(200).send({
        message: "Record update successfully",
        data: data
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