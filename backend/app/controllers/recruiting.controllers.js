
const RecruitingSchema = require('../models/recruiting.model');

exports.create = (req, res) => {
  const recruiting = new RecruitingSchema({
    user_id:req.body.user_id,
    negotiation: {
      negotiationMeetings:req.body.negotiation.negotiationMeetings 
      // {
      //   negotiationMeetingState: req.body.negotiation.negotiationMeetingState,
      //   negotiationMeetingDate: req.body.negotiation.negotiationMeetingDate,
      //   negotiationMeetingDuration: req.body.negotiation.negotiationMeetingDuration
      // }
    },
    recruitingBankName: req.body.recruitingBankName,
    recruitingGoal: req.body.recruitingGoal,
    recruitingRefferal: req.body.recruitingRefferal,
    recruitingFinancialAssets: req.body.recruitingFinancialAssets,
    recruitingMainService: req.body.recruitingMainService,
    recruitingBusinessApproach: req.body.recruitingBusinessApproach,
    recruitingFamilyTypeWallet: req.body.recruitingFamilyTypeWallet,
    // {
    //   familyType: req.body.recruitingFamilyTypeWallet.familyType,
    //   familyTypeAmount: req.body.recruitingFamilyTypeWallet.familyTypeAmount,
    // },
    recruitingAssetWallet: req.body.recruitingAssetWallet,
    // {
    //   assetType: req.body.recruitingAssetWallet.assetType,
    //   assetAmount: req.body.recruitingAssetWallet.assetAmount,
    // },
    recruitingListOfMostUsedProductCompanies:req.body.recruitingListOfMostUsedProductCompanies,
    recruitingMostUsedProductCompanies: req.body.recruitingMostUsedProductCompanies,
    recruitingDecisionalDrivers: {
      professionalFreedom: req.body.recruitingDecisionalDrivers.professionalFreedom,
      logistics: req.body.recruitingDecisionalDrivers.logistics,
      professionalLongevity: req.body.recruitingDecisionalDrivers.professionalLongevity,
      economics: req.body.recruitingDecisionalDrivers.economics,
      carrier: req.body.recruitingDecisionalDrivers.carrier,
      support: req.body.recruitingDecisionalDrivers.support,
      brand: req.body.recruitingDecisionalDrivers.brand,
      serviceType: req.body.recruitingDecisionalDrivers.serviceType,
      pricing: req.body.recruitingDecisionalDrivers.pricing,
      consultant: req.body.recruitingDecisionalDrivers.consultant,
      serviceSatisfaction: req.body.recruitingDecisionalDrivers.serviceSatisfaction
    },
    recruitingWishList:req.body.recruitingWishList, 
    // {
    //   wishListType: req.body.recruitingWishList.wishListType,
    //   wishListPriority: req.body.recruitingWishList.wishListPriority
    // },
    recruitingNetwork: {
      networkIn: req.body.recruitingNetwork.networkIn,
      networkOut: req.body.recruitingNetwork.networkOut
    },
    recruitingNegotiationlndicators: {
      negotiationProfileCoherence: req.body.recruitingNegotiationlndicators.negotiationProfileCoherence,
      negotiationMotivation: req.body.recruitingNegotiationlndicators.negotiationMotivation,
      negotiationProbability: req.body.recruitingNegotiationlndicators.negotiationProbability
    },
    recruitingCustomersSort:req.body.recruitingCustomersSort, 
    // {
    //   customerCategory: req.body.recruitingCustomersSort.customerCategory,
    //   customerType: req.body.recruitingCustomersSort.customerType,
    //   customerQuantity: req.body.recruitingCustomersSort.customerQuantity,
    //   customerTotalWallet: req.body.recruitingCustomersSort.customerTotalWallet,
    //   customerCUD: req.body.recruitingCustomersSort.customerCUD
    // },
    recruitingInterviewResult: {
      aesthetic: req.body.recruitingInterviewResult.aesthetic,
      intellectual: req.body.recruitingInterviewResult.intellectual,
      recruitingReputation: req.body.recruitingInterviewResult.recruitingReputation,
      recruitingReputationForAdvisor: req.body.recruitingInterviewResult.recruitingReputationForAdvisor,
      recruitingReputationForCandidate: req.body.recruitingInterviewResult.recruitingReputationForCandidate,
      recruitingReputationForCompany: req.body.recruitingReputationForCompany
    },
    recruitingPercentage:percentageCalculation(req.body)
  })

  recruiting.save()
    .then(data => {
      res.status(200).send({ message: "Record Save Successfully!!", data: data })
    })
    .catch(err => {
      res.status(500).send(
        {
          message: err.message || "Some error occurred while creating the Record."
        }
      )
    })
}

const percentageCalculation = (data) =>{
  let actualRecruiting = 0
  if (typeof data.negotiation == "object" && data.negotiation != null){
    let negotiationMeetingsArray =  data.negotiation.negotiationMeetings
    if(Array.isArray(negotiationMeetingsArray) && negotiationMeetingsArray.length>0){
      actualRecruiting += totalArrayValues(negotiationMeetingsArray)/(negotiationMeetingsArray.length*3)
    }
  }
  if(data.recruitingBankName != undefined)
    actualRecruiting++;
  if (data.recruitingGoal != undefined)
    actualRecruiting++;
  if (data.recruitingRefferal != undefined)
    actualRecruiting++;
  if (data.recruitingFinancialAssets)
    actualRecruiting++;
  if (data.recruitingMainService)
    actualRecruiting++;
  if (data.recruitingBusinessApproach)
    actualRecruiting++;
  
  const recruitingFamilyTypeWalletArray = data.recruitingAssetWallet
  if (recruitingFamilyTypeWalletArray != undefined && recruitingFamilyTypeWalletArray.length>0){
    actualRecruiting += totalArrayValues(recruitingFamilyTypeWalletArray) / (recruitingFamilyTypeWalletArray.length*2)
  }

  if (data.recruitingListOfMostUsedProductCompanies !=undefined && data.recruitingListOfMostUsedProductCompanies.length>0)
    actualRecruiting++

  const recruitingMostUsedProductCompaniesArray = data.recruitingMostUsedProductCompanies
  if (recruitingMostUsedProductCompaniesArray != undefined && recruitingMostUsedProductCompaniesArray.length>0)
    actualRecruiting += totalArrayValues(recruitingMostUsedProductCompaniesArray) / (recruitingMostUsedProductCompaniesArray.length*2)
  
  const recruitingAssetWalletArray = data.recruitingAssetWallet
  if (recruitingAssetWalletArray !=undefined && recruitingAssetWalletArray.length>0)
    actualRecruiting += totalArrayValues(recruitingAssetWalletArray)/(recruitingAssetWalletArray.length*2)
  
  const recruitingDecisionalDriversObject = data.recruitingDecisionalDrivers
  if(typeof recruitingDecisionalDriversObject =="object"&& recruitingDecisionalDriversObject != null)
    actualRecruiting += Object.keys(recruitingDecisionalDriversObject).length/11
  
  const recruitingWishListArray = data.recruitingWishList
  if (recruitingWishListArray !=undefined && recruitingWishListArray.length>0)
    actualRecruiting += totalArrayValues(recruitingWishListArray)/(recruitingWishListArray.length*2)

  const recruitingNetworkObject = data.recruitingNetwork
  if (typeof recruitingNetworkObject == "object" && recruitingNetworkObject != null)
    actualRecruiting += Object.keys(recruitingNetworkObject).length/2
  
  const recruitingNegotiationlndicatorsObject = data.recruitingNegotiationlndicators
  if (typeof recruitingNegotiationlndicatorsObject == "object" && recruitingNegotiationlndicatorsObject != null)
    actualRecruiting += Object.keys(recruitingNegotiationlndicatorsObject).length/3
  
  const recruitingCustomersSortArray = data.recruitingCustomersSort
  if (recruitingCustomersSortArray != undefined &&Array.isArray(recruitingCustomersSortArray) && recruitingCustomersSortArray.length>0)
    actualRecruiting += totalArrayValues(recruitingCustomersSortArray) / (recruitingCustomersSortArray.length*5)
  
  const recruitingInterviewResultObject = data.recruitingInterviewResult
  if (typeof recruitingInterviewResultObject == "object" && recruitingInterviewResultObject != null)
    actualRecruiting += Object.keys(recruitingInterviewResultObject).length/5
  
    console.log(actualRecruiting/17)
  return actualRecruiting*100/17
  
}
//calculate the array
const totalArrayValues = (dataArray) => {
  let totalValues = 0;
  dataArray.forEach((items) => {
    totalValues += Object.keys(items).length
  })
  return totalValues;
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
exports.findOne = (req, res) => {

  PersonalInfosSchema.findOne({_id: req.params.id})
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

//update query
exports.update = (req, res) => {
  const data = percentageCalculation(req.body)
  RecruitingSchema.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
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