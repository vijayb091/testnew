const BaseInfosSchema = require('../models/baseInfos.model');
const ProfessionalSchema = require('../models/professional.model')
const PersonalInfosSchema = require('../models/personalInfos.model')
const LifeStyleSchema = require('../models/lifeStyle.model')
const RecruitingSchema = require('../models/recruiting.model')
const FinancialKnowledge = require('../models/financialKnowledge.model')
var count=[]
exports.get_data = async (req,res) =>{
    
    var totalAvailablePersonalInfo = 0;
    var totalPersonalInfo = 39;

    var totalAvailableBaseInfo = 0;
    var totalBaseInfo = 24;

    var totalProfessionalInfo = 35;
    var totalAvailableProfessionalInfo = 0

    var totalAvailableLifeStyleInfo = 0;
    var totalLifeStyleInfo = 19;

    var totalAvailableRecruitingInfo = 0;
    var totalRecruitingInfo = 52;

    var totalAvailableFinancialKnowledgeInfo = 0;
    var totalFinancialKnowledgeInfo = 18;

    let baseInfos =  await BaseInfosSchema.find()
    let professional = await ProfessionalSchema.find()
    let personal = await PersonalInfosSchema.find()
    let lifeStyle = await LifeStyleSchema.find()
    let recruiting = await RecruitingSchema.find()
    let financialKnowledge = await FinancialKnowledge.find()
    
    try{
        
        var responseArray = []
        baseInfos.forEach((item) => {
            //get base info data
            totalAvailableBaseInfo = item.baseInfoPercentage
            // console.log(totalBaseInfo, totalAvailableBaseInfo)

            //get personal info data
            const personalObject = personal.find(x => x.user_id == item._id)
            totalAvailablePersonalInfo = personalObject != undefined && personalObject.percentagePersonalInfos != undefined? personalObject.percentagePersonalInfos :0
            // console.log(totalPersonalInfo, totalAvailablePersonalInfo)

            //get professional info data
            const professionalObject = professional.find(x => x.user_id == item._id)
            totalAvailableProfessionalInfo = professionalObject != undefined && professionalObject.percentageProfessionalInfo != undefined ? professionalObject.percentageProfessionalInfo : 0
            // console.log(totalProfessionalInfo, totalAvailableProfessionalInfo)

            //get professional info data
            const lifeStyleObject = lifeStyle.find(x => x.user_id == item._id)
            totalAvailableLifeStyleInfo = lifeStyleObject != undefined && lifeStyleObject.lifeStylePercentage != undefined ? lifeStyleObject.lifeStylePercentage : 0
            // console.log(totalLifeStyleInfo, totalAvailableLifeStyleInfo)

            //get recruiting info data
            const recruitingObject = recruiting.find(x => x.user_id == item._id)
            totalAvailableRecruitingInfo = recruitingObject != undefined && recruitingObject.recruitingPercentage != undefined ? recruitingObject.recruitingPercentage : 0
            // console.log(totalRecruitingInfo, totalAvailableRecruitingInfo)

            //get recruiting info data
            const financialObject = financialKnowledge.find(x => x.user_id == item._id)
            totalAvailableFinancialKnowledgeInfo = financialObject !=undefined && financialObject.percentageFinancialKnowledge != undefined ? financialObject.percentageFinancialKnowledge : 0
            // console.log(totalRecruitingInfo, totalAvailableRecruitingInfo)

            var dataObject = {
                user_id: item._id,
                firstName: item.baseName,
                lastName: item.baseLastname,
                baseInfos: totalAvailableBaseInfo,
                baseInfosID: item._id,
                moodStyle: totalAvailableFinancialKnowledgeInfo,
                moodStyleID: financialObject != undefined && financialObject._id != undefined ? financialObject._id : 0,
                professional: totalAvailableProfessionalInfo,
                professionalID: professionalObject != undefined && professionalObject._id != undefined ? professionalObject._id : 0,
                lifeStyle: totalAvailableLifeStyleInfo,
                lifeStyleID: lifeStyleObject != undefined && lifeStyleObject._id != undefined ? lifeStyleObject._id : 0,
                personalInfos: totalAvailablePersonalInfo,
                personalInfosID: personalObject != undefined && personalObject._id != undefined ? personalObject._id : 0,
                iRecruiter: totalAvailableRecruitingInfo,
                iRecruiterID: recruitingObject != undefined && recruitingObject._id != undefined ? recruitingObject._id : 0
            }
            responseArray.push(dataObject)
        })

        res.status("200").send({
            message: "Success",
            data: responseArray
        })
    }catch(err){
        console.log(err)
        res.status("501").send({
            message: "INTERNAL SERVER ERROR"
        })
    }
    
}

function getTotalAvailableField(object){
    let totalAvailable = 0;
    count = [];
    getCount(JSON.parse(JSON.stringify(object)))
    totalAvailable += count.reduce(function (acc, val) { return acc + val; }, 0)
    return totalAvailable
}

function getCount(data, level) {

    // console.log("====>",data)
    level = level || 0;
    count[level] = count[level] || 0;

    for (var k in data) {
        data.hasOwnProperty(k) && count[level]++;

        typeof data[k] === 'object' && data != null && getCount(JSON.parse(JSON.stringify(data[k])), level + 1);
    }
}

exports.getSingleData = (req,res) =>{
    const user_id = req.params.id;
}