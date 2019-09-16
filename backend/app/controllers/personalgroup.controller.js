const PersonalGroupSchema = require('../models/personalgroup.modal')

exports.create = (req, res)=>{

    const personalGroup = new PersonalGroupSchema({
        user_id: req.params.id,
        name: req.body.name,
        group_user: req.body.group_user
    })
    personalGroup.save()
        .then(data => {
            res.status(200).send({ message: "Record Saved Successfully"})
        })
        .catch(err => {
            res.status(500).send(
                {
                    message: err.message || "Some error occurred while creating the baseinfo."
                }
            )
        })
}

exports.getAll = (req, res) => {
    PersonalGroupSchema.find({user_id:req.params.id})
    .then(data =>{
        if(!data){
            return res.status(404).send({
                message: "Records Not Found"
            });
        }
        return res.status(200).send({
            message: "Records Found Successfully",
            data: data
        });
    })
    .catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Record not found "
            });
        }
        return res.status(500).send({
            message: "Something went wrong!!"
        });
    });
}

exports.delete = (req, res) => {
    PersonalGroupSchema.findOneAndRemove({user_id:req.params.id})
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Records Not Found"
                });
            }
            return res.status(200).send({
                message: "Records deleted Successfully",
            });
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
