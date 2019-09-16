const LifeStyleSchema = require('../models/lifeStyle.model')
exports.create =(req, res)=>{
    const data = percentageCalculation(req.body)
    const lifeStyle = new LifeStyleSchema({
        user_id: req.body.user_id,
        lifeStyleHobbies:data.lifeStyleHobbies ,
        lifeStyleInterests:data.lifeStyleInterests ,
        lifeStyleEventsInterests:data.lifeStyleEventsInterests,
        lifeStylePercentage: data.lifeStylePercentage
    })
    
    lifeStyle.save()
    .then(data=>{
        res.status(500).send({
            message: "Record saved successfully", 
            data: data.toObject({ getters: true, setters: true, virtuals: true })
        })
    })
    .catch(err=>{
        res.status(500).send(
            {
                message: err.message || "Some error occurred while creating the baseinfo."
            }
        )
    })
}

const percentageCalculation = (data)=>{
    var newDataObject={}
    let actualLifestyle = 0

    if (Array.isArray(data.lifeStyleHobbies) && data.lifeStyleHobbies.length > 0) {
        let actualLifestyleTemp = 0
        data.lifeStyleHobbies.map((items) => {
            let percentageValue = Object.keys(items).length/ 3
            actualLifestyleTemp += percentageValue
            items.lifeStyleHobbiesPercentage= percentageValue * 100
            items.prospectPriorityPercentage= percentageValue * 1 * 10 * 10
            items.customerPriorityPercentage= percentageValue * 2 * 4 * 10
            items.candidatePriorityPercentage= percentageValue * 3 * 2 * 10
        })
        actualLifestyle += actualLifestyleTemp / data.lifeStyleHobbies.length
    }
    newDataObject.lifeStyleHobbies = data.lifeStyleHobbies
        
    
    if (Array.isArray(data.lifeStyleInterests) && data.lifeStyleInterests.length>0){
        let actualLifestyleTemp = 0
        data.lifeStyleInterests.map((items)=>{
            let percentageValue = Object.keys(items).length / 3
            actualLifestyleTemp += percentageValue
            items.lifeStyleInterestsPercentage = percentageValue*100
            items.prospectPriorityPercentage = percentageValue * 1 * 10 * 10
            items.customerPriorityPercentage = percentageValue * 2 * 4 * 10
            items.candidatePriorityPercentage = percentageValue * 3 * 2*10
        })
        actualLifestyle += actualLifestyleTemp/data.lifeStyleInterests.length
    }
    if (Array.isArray(data.lifeStyleEventsInterests) && data.lifeStyleEventsInterests.length>0){
        let actualLifestyleTemp = 0
        data.lifeStyleEventsInterests.map((items) => {
            let percentageValue = Object.keys(items).length/3
            actualLifestyleTemp += percentageValue
            items.lifeStyleEventsInterestsPercentage = percentageValue*100
            items.prospectPriorityPercentage = percentageValue * 1 * 10 * 10
            items.customerPriorityPercentage = percentageValue * 1 * 4 * 10
            items.candidatePriorityPercentage = percentageValue * 1 * 2*10
        })
        actualLifestyle += actualLifestyleTemp / data.lifeStyleEventsInterests.length
    }
    data.lifeStylePercentage = actualLifestyle*100/3
    
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

exports.findAll = (req, res) => {

    LifeStyleSchema.find()
        .then(lifeStyle => {
            if (!lifeStyle) {
                return res.status(404).send({
                    message: "Records Not Found"
                });
            }
            res.send(lifeStyle);
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

// fin one
exports.findOne = (req, res) => {

    LifeStyleSchema.findOne({_id: req.params.id})
        .then(lifeStyle => {
            if (!lifeStyle) {
                return res.status(404).send({
                    message: "Records Not Found"
                });
            }
            res.send(lifeStyle.toObject({ getters: true, setters: true, virtuals: true }));
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

    LifeStyleSchema.findOneAndRemove(req.params.id)
        .then(lifeStyle => {
            if (!lifeStyle) {
                return res.status(404).send({
                    message: "Record not found"
                });
            }
            res.send({ message: "Record deleted successfully!" });
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
        });
}

//update query
exports.update = (req,res)=>{
    const data = percentageCalculation(req.body)
    LifeStyleSchema.findOneAndUpdate({_id: req.params.id},{$set: data},{new: true})
    .then(data=>{
        res.status(200).send({
            message:"Record update successfully",
            data: data.toObject({ getters: true, setters: true, virtuals: true })
        })
    })
    .catch(err=>{
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