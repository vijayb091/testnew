const FinancialKnowledgesSchema = require('../models/financialKnowledge.model');

exports.create = (req, res) => {
  let data = percentageCalculation(req.body.financialKnowledge)
  // console.log(req.body.financialKnowledge)
    var FinancialKnowledges = new FinancialKnowledgesSchema({
      user_id: req.body.user_id,
      financialKnowledge:{
        financialKnowledgeLevel: data.financialKnowledge.financialKnowledgeLevel,
        financialTrust: data.financialKnowledge.financialTrust,
        timeDedicatedToInvestments: data.financialKnowledge.timeDedicatedToInvestments,
        decisionPower: data.financialKnowledge.decisionPower,
        investmentStyleType: data.financialKnowledge.investmentStyleType,
        investmentGoals: data.financialKnowledge.investmentGoals,
        oscillationTolerance: data.financialKnowledge.oscillationTolerance,
        updatesInterval: data.financialKnowledge.updatesInterval,
        updatesSentVia: data.financialKnowledge.updatesSentVia,
        financialInfoSources: data.financialKnowledge.financialInfoSources,
        minimumReturnExpectation: data.financialKnowledge.minimumReturnExpectation,
        financialKnowledgeNotes: data.financialKnowledge.financialKnowledgeNotes,
        financialKnowledgePriorityProspect: data.financialKnowledge.financialKnowledgePriorityProspect,
        financialKnowledgePriorityCandidate: data.financialKnowledge.financialKnowledgePriorityCandidate,
        financialKnowledgePriorityCustomer: data.financialKnowledge.financialKnowledgePriorityCustomer
      },
      percentageFinancialKnowledge: data.percentageFinancialKnowledge
    })
        
    
    FinancialKnowledges.save()
    .then(data => {
        res.status(200).send({
          message:"Record Saved Successfully", 
          data: data.toObject({ getters: true, setters: true, virtuals: true })})
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
  let newData ={}
  if(typeof data == "object" && data != null){
    let actualValues = 0;
    Object.entries(data).forEach(([key, value])=>{

      if(Array.isArray(value)&& value.length>0){
        actualValues++
      
      } else if (typeof value == "object" && value != null && key == "minimumReturnExpectation"){
        let count = Object.keys(value).length / 2
        actualValues +=count
        value.minimumReturnPriorityProspect = count*100*3*2/10
        value.minimumReturnPriorityCandidate = count*100*4*1/10
        value.minimumReturnPriorityCustomer = count * 100 * 3 *2/10
      }else{
        actualValues++
      }
      newData[key] = value
    })
    let percentageValue = actualValues * 100 / 12
    newData.financialKnowledgePriorityProspect =(percentageValue)*3*2/10
    newData.financialKnowledgePriorityCandidate = (percentageValue)*1*10/10
    newData.financialKnowledgePriorityCustomer = (percentageValue)*4*1/10
   
    
    let finalData = {
      financialKnowledge: newData,
      percentageFinancialKnowledge: percentageValue
    }
    console.log(finalData)
    return finalData
    // return actualValues*100/12
  }

}

exports.findAll = (req, res) => {

    PersonalInfosSchema.find()
      .then(personalInfos => {
        if (!personalInfos) {
          return res.status(404).send({
            message: "Records Not Found"
          });
        }
        res.send(personalInfos.toObject({ getters: true, setters: true, virtuals: true }));
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

exports.findOne = (req, res) => {

  PersonalInfosSchema.findOne({_id: req.params.id})
    .then(personalInfos => {
      if (!personalInfos) {
        return res.status(404).send({
          message: "Records Not Found"
        });
      }
      res.send(personalInfos.toObject({ getters: true, setters: true, virtuals: true }));
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
  const data = percentageCalculation(req.body.financialKnowledge)
  FinancialKnowledgesSchema.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
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