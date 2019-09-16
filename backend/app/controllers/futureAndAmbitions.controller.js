const FutureAndAmbitionsSchema = require('../models/futureAndAmbitions.model');

exports.create =(req,res)=>{
    let data = calculatePercentage(req.body)
    const futureAndAmbitions = new FutureAndAmbitionsSchema({
        user_id: req.body.user_id,
        futureAmbitions: data.futureAmbitions,
        futureAmbitionsPercentage: data.futureAmbitions.futureAmbitionsPercentage
    })

    futureAndAmbitions.save()
        .then(data => {
            res.status(200).send({ 
                message: "Record Saved Successfully", 
                data: data.toObject({ getters: true, setters: true, virtuals: true }) 
            })
        })
        .catch(err => {
            res.status(500).send(
                {
                    message: err.message || "Some error occurred while creating the baseinfo."
                }
            )
        })
}

const calculatePercentage = (data) =>{
    let actualFutureAmbitions = 0

    if (typeof data.futureAmbitions == "object" && data.futureAmbitions != null){
        
        if (Array.isArray(data.futureAmbitions.familyProjects)) {
            let actualItemValue = 0
            data.futureAmbitions.familyProjects.map((items)=>{
                actualItemValue += Object.keys(items).length/5
                items.familyProjectsPercentage= actualItemValue*100
                items.prospectPriorityPercentage= actualItemValue*6*10
                items.customerPriorityPercentage= actualItemValue*4*10
                items.candidatePriorityPercentage= actualItemValue*10*10
            })
            actualFutureAmbitions += actualItemValue / data.futureAmbitions.familyProjects.length
        }
        
        
        if (Array.isArray(data.futureAmbitions.personalProjects)){
            let actualItemValue = 0
            data.futureAmbitions.personalProjects.map((items) => {
                actualItemValue += Object.keys(items).length / 5
                items.personalProjectsPercentage = actualItemValue * 100
                items.prospectPriorityPercentage = actualItemValue*6*10
                items.customerPriorityPercentage = actualItemValue*4*10
                items.candidatePriorityPercentage = actualItemValue*10*10
            })
            actualFutureAmbitions += actualItemValue / data.futureAmbitions.personalProjects.length
        }

        if (Array.isArray(data.futureAmbitions.businessProjects)) {
            let actualItemValue = 0
            data.futureAmbitions.businessProjects.map((items) => {
                actualItemValue += Object.keys(items).length / 5
                items.personalProjectsPercentage = actualItemValue * 100
                items.prospectPriorityPercentage = actualItemValue*6*10
                items.customerPriorityPercentage = actualItemValue*4*10
                items.candidatePriorityPercentage = actualItemValue*10*10
            })
            actualFutureAmbitions += actualItemValue / data.futureAmbitions.businessProjects.length
        }
        actualFutureAmbitions = actualFutureAmbitions / 3
        data.futureAmbitions.futureAmbitionsPercentage = actualFutureAmbitions*100
        data.futureAmbitions.prospectPriorityPercentage= actualFutureAmbitions*6*10,
        data.futureAmbitions.customerPriorityPercentage= actualFutureAmbitions*4*10,
        data.futureAmbitions.candidatePriorityPercentage= actualFutureAmbitions*10*10
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

/**
 * Please increase the counter if do not understand
 * COUNTER =0
 */
exports.findAll = (req,res)=>{
    FutureAndAmbitionsSchema.find()
    .then(data=>{
        res.status(200).send({ 
            message: "Record Saved Successfully", 
            data: data.toObject({ getters: true, setters: true, virtuals: true }) })
    })
    .catch(err=>{
        res.status(500).send(
            {
                message: err.message || "Some error occurred while creating the baseinfo."
            }
        )
    })
}

exports.findOne = (req, res) => {
    FutureAndAmbitionsSchema.findOne({_id: req.params.id})
        .then(data => {
            res.status(200).send({
                message: "Succes", 
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
//update query
exports.update = (req, res) => {
    const data = calculatePercentage(req.body)
    FutureAndAmbitionsSchema.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true })
        .then(data => {
            res.status(200).send({
                message: "Record updated successfully",
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