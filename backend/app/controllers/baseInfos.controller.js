const BaseInfosSchema = require('../models/baseInfos.model');

exports.create = (req, res) => {
  console.log(Object.keys(req.body).length*100/20)

  const BaseInfos = new BaseInfosSchema(
    {
      baseContactType: req.body.baseContactType,
      baseCustomer: req.body.baseCustomer,
      baseName: req.body.baseName,
      baseLastname: req.body.baseLastname,
      basePersonType: req.body.basePersonType,
      baseGender: req.body.baseGender,
      baseAge: req.body.baseAge,
      baseDateOfBirth: req.body.baseDateOfBirth,
      baseCityOfBirth: req.body.baseCityOfBirth,
      baseProvinceOfBirth: req.body.baseProvinceOfBirth,
      baseResidentialAddress: req.body.baseResidentialAddress,
      baseResidentialCity: req.body.baseResidentialCity,
      baseResidentialProvince: req.body.baseResidentialProvince,
      baseResidentialZipCode: req.body.baseResidentialZipCode,
      baseDomicileAddress: req.body.baseDomicileAddress,
      baseDomicileCity: req.body.baseDomicileCity,
      baseDomicileProvince: req.body.baseDomicileProvince,
      baseDomicileZipCode: req.body.baseDomicileZipCode,
      baseComplienceToMarketing: req.body.baseComplienceToMarketing,
      baseCustomerType: req.body.baseCustomerType,
      baseInfoPercentage: Object.keys(req.body).length * 100 / 20
    }
  );

  BaseInfos.save()
    .then(data => 
      res.status(200).send({
        message: "Record saved successfully",
        data: data.toObject({ getters: true, setters: true, virtuals: true })
      }))
    .catch(err => {
      res.status(500).send(
        {
          message: err.message || "Some error occurred while creating the baseinfo."
        }
      )
    })
}

exports.findAll = (req, res) => {

  BaseInfosSchema.find()
    .then(baseInfo => {
      if (!baseInfo) {
        return res.status(404).send({
          message: "Records Not Found"
        });
      }
      res.send(baseInfo);
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
exports.findOne = (req, res) => {

  BaseInfosSchema.findById(req.params.id)
  .then(baseInfo => {
    if(!baseInfo) {
      return res.status(404).send({
        message: "Record not found"
      });
    }
    res.send(baseInfo.toObject({ getters: true, setters: true, virtuals: true }));
  })
  .catch( err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Record Not Found "
      });
    }
    return res.status(500).send({
        message: "Error retrieving Record"
    })
  })

}

exports.update = (req, res) => {

  if(!req.body) {
    return res.status(400).send({
        message: "Record Must Not be Empty"
    });
  }
  // console.log(req.body)

  BaseInfosSchema.findByIdAndUpdate(req.params.id,{$set:{
    baseContactType: req.body.baseContactType,
    baseCustomer: req.body.baseCustomer,
    baseName: req.body.baseName,
    baseLastname: req.body.baseLastname,
    basePersonType: req.body.basePersonType,
    baseGender: req.body.baseGender,
    baseAge: req.body.baseAge,
    baseDateOfBirth: req.body.baseDateOfBirth,
    baseCityOfBirth: req.body.baseCityOfBirth,
    baseProvinceOfBirth: req.body.baseProvinceOfBirth,
    baseResidentialAddress: req.body.baseResidentialAddress,
    baseResidentialCity: req.body.baseResidentialCity,
    baseResidentialProvince: req.body.baseResidentialProvince,
    baseResidentialZipCode: req.body.baseResidentialZipCode,
    baseDomicileAddress: req.body.baseDomicileAddress,
    baseDomicileCity: req.body.baseDomicileCity,
    baseDomicileProvince: req.body.baseDomicileProvince,
    baseDomicileZipCode: req.body.baseDomicileZipCode,
    baseComplienceToMarketing: req.body.baseComplienceToMarketing,
    baseCustomerType: req.body.baseCustomerType,
    baseInfoPercentage: Object.keys(req.body).length * 100 / 20
  }
  }, { new: true })
  // BaseInfosSchema.findByIdAndUpdate(req.params.id, {
  //   baseContactType: req.body.baseContactType,
  //   baseCustomer: req.body.baseCustomer,
  //   baseName: req.body.baseName,
  //   baseLastname: req.body.baseLastname,
  //   basePersonType: req.body.basePersonType,
  //   baseGender: req.body.baseGender,
  //   baseAge: req.body.baseAge,
  //   baseDateOfBirth: req.body.baseDateOfBirth,
  //   baseCityOfBirth: req.body.baseCityOfBirth,
  //   baseProvinceOfBirth: req.body.baseProvinceOfBirth,
  //   baseResidentialAddress: req.body.baseResidentialAddress,
  //   baseResidentialCity: req.body.baseResidentialCity,
  //   baseResidentialProvince: req.body.baseResidentialProvince,
  //   baseResidentialZipCode: req.body.baseResidentialZipCode,
  //   baseDomicileAddress: req.body.baseDomicileAddress,
  //   baseDomicileCity: req.body.baseDomicileCity,
  //   baseDomicileProvince: req.body.baseDomicileProvince,
  //   baseDomicileZipCode: req.body.baseDomicileZipCode,
  //   baseComplienceToMarketing: req.body.baseComplienceToMarketing,
  //   baseCustomerType: req.body.baseCustomerType,
  //   baseInfoPercentage: Object.keys(req.body).length * 100 / 20
  //   }, 
  //   {new: true}
  // )
  .then(baseInfo => {
    if(!baseInfo) {
      return res.status(404).send({
          message: "Record not found"
      });
    }
    res.send(baseInfo);
  })
  .catch(err => {
    console.log(err)
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Record not found"
        });
    }
    return res.status(500).send({
        message: "Error updating Record"
    });
  });

}

exports.delete = (req, res) => {

  BaseInfosSchema.deleteOne(req.params.id)
  .then(baseInfo => {
      if(!baseInfo) {
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

// const recursion=(data)=>{
// 	console.log(data)
// 	let count = Object.keys(data).length
// 	for (var key in data) {
// 		if (typeof data[key] == "object") {
// 			count += recursion(data[key])
// 		}
// 	}
// 	return count;
// }