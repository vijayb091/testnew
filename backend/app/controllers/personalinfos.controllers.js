const PersonalInfosSchema = require('../models/personalInfos.model');/*  */
exports.create = (req, res) => {
  const data =  calculatePercentage(req.body)
  var personalBank = new PersonalInfosSchema({
    user_id: req.body.user_id,
    personalBank: data.personalBank,
    personalRiskProfile: data.personalRiskProfile,
    personalFamilyComponents: data.personalFamilyComponents,
    personalContacts: data.personalContacts,
    personalNotes: data.personalNotes,
    personalFamilyYearlyIncome: data.personalFamilyYearlyIncome,
    personalYearlyIncome: data.personalYearlyIncome,
    percentagePersonalInfos: data.percentagePersonalInfos,
    prospectPriorityPercentage: data.prospectPriorityPercentage,
    customerPriorityPercentage: data.customerPriorityPercentage,
    candidatePriorityPercentage: data.candidatePriorityPercentage
  })
  // console.log(data.percentagePersonalInfos)
  // // res.send(data)
  personalBank.save()
  .then(data1 =>
    res.status(200).send({
      message: "Record saved successfully",
      data: data1.toObject({ getters: true, setters: true, virtuals: true })
    }))
    .catch(err => {
      res.status(500).send(
        {
          message: err.message || "Some error occurred while creating the baseinfo."
        }
      )
    })
  }
  //calculations
  const calculatePercentage = (data)=>{
    
    let actualPersonalInfos = 0

    //it holds average of the array of object of PersonalBank  
    let actualPersonalBank = 0;

    if (data.personalBank.length>0){
      
      //looping the array of object
      data.personalBank.map((personalBankItem)=>{

        let personalBankTemp = 0 
        if (personalBankItem.bankLoyaltyPlan != undefined && Array.isArray(personalBankItem.bankLoyaltyPlan)){
          //It holds the value 
          let bankLoyaltyPlanValue = 0
          personalBankItem.bankLoyaltyPlan.map((bankLoyaltyPlanItems)=>{
            
            //it holds average of LoyaltyPlan
            let bankLoyaltyPlanItemsValue = 0 
            
            if (bankLoyaltyPlanItems.bankLoyaltyPlanJoinVariable != undefined && Array.isArray(bankLoyaltyPlanItems.bankLoyaltyPlanJoinVariable)) {
              
              //It holds the total average of array of object
              bankLoyaltyPlanJoinVariableItemsValue = 0 

              bankLoyaltyPlanItems.bankLoyaltyPlanJoinVariable.map((bankLoyaltyPlanJoinVariableItems) => {

                let bankLoyaltyPlanJoinVariableItemsValueTemp = Object.keys(bankLoyaltyPlanJoinVariableItems).length/2
                
                bankLoyaltyPlanJoinVariableItems.bankLoyaltyPlanJoinVariablePercentage = bankLoyaltyPlanJoinVariableItemsValueTemp * 100,
                bankLoyaltyPlanJoinVariableItems.prospectPriorityPercentage = bankLoyaltyPlanJoinVariableItemsValueTemp * 10 * 10
                bankLoyaltyPlanJoinVariableItems.customerPriorityPercentage = bankLoyaltyPlanJoinVariableItemsValueTemp * 10 * 10
                bankLoyaltyPlanJoinVariableItems.candidatePriorityPercentage = bankLoyaltyPlanJoinVariableItemsValueTemp * 10 * 10
                
                bankLoyaltyPlanJoinVariableItemsValue += bankLoyaltyPlanJoinVariableItemsValueTemp
              })
              bankLoyaltyPlanItemsValue += bankLoyaltyPlanJoinVariableItemsValue / bankLoyaltyPlanItems.bankLoyaltyPlanJoinVariable.length
            }
            
            bankLoyaltyPlanItemsValue += Object.keys(bankLoyaltyPlanItems).length -1

            let tempBankLoyaltyPlanItems = bankLoyaltyPlanItemsValue/4
            bankLoyaltyPlanItems.bankLoyaltyPlanPercentage = tempBankLoyaltyPlanItems * 100
            bankLoyaltyPlanItems.prospectPriorityPercentage = tempBankLoyaltyPlanItems * 10 * 10
            bankLoyaltyPlanItems.customerPriorityPercentage = tempBankLoyaltyPlanItems * 10 * 10
            bankLoyaltyPlanItems.candidatePriorityPercentage = tempBankLoyaltyPlanItems * 10 * 10
            
            bankLoyaltyPlanValue +=tempBankLoyaltyPlanItems
          })
          personalBankTemp = bankLoyaltyPlanValue / personalBankItem.bankLoyaltyPlan.length
        }
        personalBankTemp += Object.keys(personalBankItem).length -1
        personalBankTemp = personalBankTemp/4

        personalBankItem.personalBankPercentage = personalBankTemp * 100
        personalBankItem.prospectPriorityPercentage = personalBankTemp * 10 * 10
        personalBankItem.customerPriorityPercentage = personalBankTemp * 10 * 10
        personalBankItem.candidatePriorityPercentage = personalBankTemp * 10 * 10
        
        actualPersonalBank +=personalBankTemp
      })
      actualPersonalBank = actualPersonalBank / data.personalBank.length
    } 
    
    let totalRiskProfile = 0
    if (data.personalRiskProfile != undefined && Array.isArray(data.personalRiskProfile)){
      
      data.personalRiskProfile.map((personalRiskProfileItems) =>{
        let tempRiskItems = Object.keys(personalRiskProfileItems).length/6
        personalRiskProfileItems.personalRiskProfilePercentage =tempRiskItems*100
        personalRiskProfileItems.prospectPriorityPercentage = tempRiskItems * 10 * 10
        personalRiskProfileItems.customerPriorityPercentage = tempRiskItems * 10 * 10 
        personalRiskProfileItems.candidatePriorityPercentage = tempRiskItems * 10 * 10
        totalRiskProfile +=tempRiskItems
      })
      totalRiskProfile = totalRiskProfile/data.personalRiskProfile.length
    }
    let totalPersonalFamilyComponents = 0
    if (data.personalFamilyComponents != undefined && Array.isArray(data.personalFamilyComponents)) {
      
      data.personalFamilyComponents.map((personalFamilyComponentsItems) => {
        let tempPersonalFamilyComponents = Object.keys(personalFamilyComponentsItems).length / 7
        personalFamilyComponentsItems.personalRiskProfilePercentage = tempPersonalFamilyComponents * 100
        personalFamilyComponentsItems.prospectPriorityPercentage = tempPersonalFamilyComponents * 10 * 10
        personalFamilyComponentsItems.customerPriorityPercentage = tempPersonalFamilyComponents * 10 * 8
        personalFamilyComponentsItems.candidatePriorityPercentage = tempPersonalFamilyComponents * 10 * 4
        totalPersonalFamilyComponents += tempPersonalFamilyComponents
      })
      totalPersonalFamilyComponents = totalPersonalFamilyComponents / data.personalFamilyComponents.length
    }
    let totalPersonalContact = 0
    if (data.personalContacts != undefined){
      
      let totalContactSocial = 0
      if (data.personalContacts.contactsSocialNetwork != undefined){
        data.personalContacts.contactsSocialNetwork.map((items) =>{
          let tempContactSocialItems = Object.keys(items).length/2
          items.contactsSocialNetworkPercentage = tempContactSocialItems * 100
          items.prospectPriorityPercentage = tempContactSocialItems * 10 * 10
          items.customerPriorityPercentage = tempContactSocialItems * 10 * 10
          items.candidatePriorityPercentage = tempContactSocialItems * 10 * 10
          totalContactSocial +=tempContactSocialItems
        })
        totalContactSocial = totalContactSocial/data.personalContacts.contactsSocialNetwork.length
      }
      let tempPersonalContact = (totalContactSocial+ Object.keys(data.personalContacts).length -1)/4
      data.personalContacts.personalContactsPercentage = tempPersonalContact * 100
      data.personalContacts.prospectPriorityPercentage = tempPersonalContact * 10 * 10
      data.personalContacts.customerPriorityPercentage = tempPersonalContact * 10 * 10
      data.personalContacts.candidatePriorityPercentage = tempPersonalContact * 10 * 10
      totalPersonalContact = tempPersonalContact
    }
    actualPersonalInfos = (actualPersonalBank + totalPersonalContact + totalPersonalFamilyComponents + totalRiskProfile)/4
    data.percentagePersonalInfos =  actualPersonalInfos*100
    data.prospectPriorityPercentage = actualPersonalInfos * 10 * 10
    data.customerPriorityPercentage = actualPersonalBank * 10 * 10
    data.candidatePriorityPercentage = actualPersonalBank * 10 * 10
    return(data)
  }
exports.findOne = (req, res) => {
  PersonalInfosSchema.findOne({_id:req.params.id})
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
  const data = calculatePercentage(req.body)
  PersonalInfosSchema.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
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

  // const crypty = require('../middlewares/encryption')
exports.findAll = (req, res) => {
  // console.log(crypty.decrypt("cdf5c884c73f4151c187a359420c359f"));
  PersonalInfosSchema.findOne({ user_id: "5b2a4e68488208141f7006c7"})
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
