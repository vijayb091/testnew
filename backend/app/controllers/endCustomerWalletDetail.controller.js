const EndCustomerWalletDetailSchema = require('../models/endCustomerWalletDetail.model');

exports.create = (req, res) => {
  const data = percentageCalculation(req.body)
  const endCustomerWalletDetail = new EndCustomerWalletDetailSchema(
    {
        user_id: req.body.user_id,
        endCustomerWalletDetail:data.endCustomerWalletDetail,
        percentageEndCustomerWallet: data.percentageEndCustomerWallet
        // WalletCustomerId: req.body.endCustomerWalletDetail.WalletCustomerId,
        // WalletProductType: req.body.endCustomerWalletDetail.WalletProductType,
        // WalletBank: req.body.endCustomerWalletDetail.WalletBank,
        // walletProductGoal: req.body.endCustomerWalletDetail.walletProductGoal,
        // WalletNotes: req.body.endCustomerWalletDetail.WalletNotes
    }
  );
  

  endCustomerWalletDetail.save()
    .then(data => res.status(200).send({message: "Record Saved Successfully!!", data:data}))
    .catch(err => {
      res.status(500).send(
        {
          message: err.message || "Some error occurred while creating the record."
        }
      )
    })
}

const percentageCalculation = (data) => {
let actualPercentageValue = 0
  if (Array.isArray(data.endCustomerWalletDetail)){
    data.endCustomerWalletDetail.map((items)=>{
      actualPercentageTemp = Object.keys(items).length/5
      items.endCustomerWalletPercentage = actualPercentageTemp * 100 
      items.prospectPriorityPercentage = actualPercentageTemp * 10 * 10
      items.customerPriorityPercentage = actualPercentageTemp * 10 * 10
      items.candidatePriorityPercentage = actualPercentageTemp * 10 * 6
      actualPercentageValue +=actualPercentageTemp
    })
    actualPercentageValue = actualPercentageValue/data.endCustomerWalletDetail.length
  }
  data.percentageEndCustomerWallet = actualPercentageValue*100
  return data

}



//update query
exports.update = (req, res) => {
  const data = percentageCalculation(req.body)
  EndCustomerWalletDetailSchema.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
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

//find One
exports.findOne = (req, res) => {

  EndCustomerWalletDetailSchema.findOne({ _id: req.params.id })
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

// exports.findAll = (req, res) => {

//   BaseInfosSchema.find()
//     .then(baseInfo => {
//       if (!baseInfo) {
//         return res.status(404).send({
//           message: "Records Not Found"
//         });
//       }
//       res.send(baseInfo);
//     })
//     .catch(err => {
//       if (err.kind === 'ObjectId') {
//         return res.status(404).send({
//           message: "Record not found"
//         });
//       }
//       return res.status(500).send({
//         message: "Error retrieving Records"
//       })
//     })

// }
// exports.findOne = (req, res) => {

//   BaseInfosSchema.findById(req.params.id)
//   .then(baseInfo => {
//     if(!baseInfo) {
//       return res.status(404).send({
//         message: "Record not found"
//       });
//     }
//     res.send(note);
//   })
//   .catch( err => {
//     if(err.kind === 'ObjectId') {
//       return res.status(404).send({
//           message: "Record Not Found "
//       });
//     }
//     return res.status(500).send({
//         message: "Error retrieving Record"
//     })
//   })

// }

// exports.update = (req, res) => {

//   if(!req.body.content) {
//     return res.status(400).send({
//         message: "Record Must Not be Empty"
//     });
//   }

//   BaseInfosSchema.findByIdAndUpdate(req.params.id, {
//     baseContactType: req.body.baseContactType,
//     baseCustomer: req.body.baseCustomer,
//     baseName: req.body.baseName,
//     baseLastname: req.body.baseLastname,
//     basePersonType: req.body.basePersonType,
//     baseGender: req.body.baseGender,
//     baseAge: req.body.baseAge,
//     baseDateOfBirth: req.body.baseDateOfBirth,
//     baseCityOfBirth: req.body.baseCityOfBirth,
//     baseProvinceOfBirth: req.body.baseProvinceOfBirth,
//     baseResidentialAddress: req.body.baseResidentialAddress,
//     baseResidentialCity: req.body.baseResidentialCity,
//     baseResidentialProvince: req.body.baseResidentialProvince,
//     baseResidentialZipCode: req.body.baseResidentialZipCode,
//     baseDomicileAddress: req.body.baseDomicileAddress,
//     baseDomicileCity: req.body.baseDomicileCity,
//     baseDomicileProvince: req.body.baseDomicileProvince,
//     baseDomicileZipCode: req.body.baseDomicileZipCode,
//     baseComplienceToMarketing: req.body.baseComplienceToMarketing,
//     baseCustomerType: req.body.baseCustomerType,
//     }, {new: true}
//   )
//   .then(baseInfo => {
//     if(!baseInfo) {
//       return res.status(404).send({
//           message: "Record not found"
//       });
//     }
//     res.send(baseInfo);
//   })
//   .catch(err => {
//     if(err.kind === 'ObjectId') {
//         return res.status(404).send({
//             message: "Record not found"
//         });
//     }
//     return res.status(500).send({
//         message: "Error updating Record"
//     });
//   });

// }

// exports.delete = (req, res) => {

//   BaseInfosSchema.deleteOne(req.params.id)
//   .then(baseInfo => {
//       if(!baseInfo) {
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
