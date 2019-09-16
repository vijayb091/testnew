const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalGroupSchema = mongoose.Schema(
    {
        user_id:String,
        name: String,
        group_user:Array
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('PersonalGroupSchema', PersonalGroupSchema)