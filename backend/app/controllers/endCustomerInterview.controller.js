const EndCustomerInterviewSchema = require('../models/endCustomerInterview.model');

exports.create = (req, res) => {
  const data = percentageCalculation(req.body)
  const endCustomerInterview = new EndCustomerInterviewSchema(
    {
      user_id: req.body.user_id,
      endCustomerInterview: data.endCustomerInterview,
      percentageEndCustomerInterview: data.percentageEndCustomerInterview
    }
  );

  endCustomerInterview.save()
    .then(data => res.status(200).send({
      message: "Record Saved Successfully!!", 
      data: data.toObject({ getters: true, setters: true, virtuals: true })}))
    .catch(err => {
      res.status(500).send(
        {
          message: err.message || "Some error occurred while creating the record."
        }
      )
    })
}

const percentageCalculation = (data) =>{
  let actualEndValue = 0
  if (Array.isArray(data.endCustomerInterview)){
    
    data.endCustomerInterview.map((items)=>{
      let actualEndValueTemp = Object.keys(items).length / 4 
      actualEndValue += actualEndValueTemp
      items.endCustomerInterviewPercentage = actualEndValueTemp * 100
      items.prospectPriorityPercentage = actualEndValueTemp * 10 * 10
      items.customerPriorityPercentage = actualEndValueTemp * 10 * 10
      items.candidatePriorityPercentage = actualEndValueTemp * 10 * 6
    })
    data.percentageEndCustomerInterview = actualEndValue*100/data.endCustomerInterview.length
  }
  return data
}
//find One
exports.findOne = (req, res) => {

  EndCustomerInterviewSchema.findOne({ _id: req.params.id })
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

//update query
exports.update = (req, res) => {
  const data = percentageCalculation(req.body)
  EndCustomerInterviewSchema.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
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