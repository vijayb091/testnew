const BaseInfosSchema = require('../models/baseInfos.model');
const PersonalInfosSchema = require('../models/personalInfos.model');
const ProfessionalSchema = require("../models/professional.model");
const FinancialKnowledgeSchema = require("../models/financialKnowledge.model")
const LifeStyleSchema = require('../models/lifeStyle.model')
const RecruitingSchema = require('../models/recruiting.model')

exports.getTheData = async (req,res) =>{
    var totalAvailableBaseInfo = 0;
    var totalBaseInfo = 0;

    var totalProfessionalInfo = 0;
    var totalAvailableProfessionalInfo = 0

    var totalAvailablePersonalInfo = 0;
    var totalPersonalInfo = 0;

    var totalAvailableLifeStyleInfo = 0;
    var totalLifeStyleInfo = 0;

    var totalAvailableRecruitingInfo = 0;
    var totalRecruitingInfo = 0;

    var totalAvailableFinancialKnowledgeInfo = 0;
    var totalFinancialKnowledgeInfo = 0;

    const filterObjects = { type: "baseCustomerType", value:"customer", options:"contains"}

    const baseInfosKeys = ["baseContactType","baseCustomer","baseName","baseLastname","basePersonType",
    "baseGender","baseAge","baseDateOfBirth","baseCityOfBirth","baseProvinceOfBirth","baseResidentialAddress",
    "baseResidentialCity","baseResidentialProvince","baseResidentialZipCode","baseDomicileAddress",
    "baseDomicileCity","baseDomicileProvince","baseDomicileZipCode","baseComplienceToMarketing",
    "baseCustomerType","baseInfoPercentage"] 

    // const BaseInfoFilter={
    //     [filterObjects.type]:{
    //         { $regex: ".*customer.*" }
    //     }[filterObjects.value]
    // }
    
    //calculate BaseInfos
    let data = await BaseInfosSchema.aggregate([
        { $match: { baseContactType: { $regex: ".*customer.*" } } },
        {
            $group: {
                _id: null, count: { $sum: 1 },
                total: {
                    $sum: "$baseInfoPercentage"
                }
            }
        }])
        console.log(data)
    if (data.length > 0) {
        totalBaseInfo = (data[0].count)
        totalAvailableBaseInfo = (data[0].total)
    }
    //calculate professional
    let pData = await ProfessionalSchema.aggregate([{
        $group: {
            _id: null,
            total: {
                $sum: "$percentageProfessionalInfo"
            },
            count: { $sum: 1 }
        }
    }])
    if (pData.length > 0) {
        totalProfessionalInfo = (pData[0].count)
        totalAvailableProfessionalInfo = (pData[0].total)
    }

    // //calculate personal
    try {
        let perData = await PersonalInfosSchema.aggregate([{
            $group: {
                _id: null,
                total: {
                    $sum: "$percentagePersonalInfos"
                },
                count: { $sum: 1 }
            }
        }])
        if (perData.length > 0) {
            totalPersonalInfo = (perData[0].count)
            totalAvailablePersonalInfo = (perData[0].total)
        }
    }
    catch (error) {
        console.log(error)
    }

    // //Calculate the lifestyle
    try {
        let lifeData = await LifeStyleSchema.aggregate([{
            $group: {
                _id: null,
                total: {
                    $sum: "$lifeStylePercentage"
                },
                count: { $sum: 1 }
            }
        }])
        if (lifeData.length > 0) {
            totalLifeStyleInfo = (lifeData[0].count)
            totalAvailableLifeStyleInfo = (lifeData[0].total)
        }
    }
    catch (error) {
        console.log(error)
    }

    // //Calculate the recruiting
    try {
        let recruitingData = await RecruitingSchema.aggregate([{
            $group: {
                _id: null,
                total: {
                    $sum: "$recruitingPercentage"
                },
                count: { $sum: 1 }
            }
        }])
        if (recruitingData.length > 0) {
            totalRecruitingInfo = (recruitingData[0].count)
            totalAvailableRecruitingInfo = (recruitingData[0].total)
        }
    }
    catch (error) {
        console.log(error)
    }

    // //Calculate the moodStyle
    try {
        let financialKnowledgeData = await FinancialKnowledgeSchema.aggregate([{
            $group: {
                _id: null,
                total: {
                    $sum: "$percentageFinancialKnowledge"
                },
                count: { $sum: 1 }
            }
        }])
        if (financialKnowledgeData.length > 0) {
            totalFinancialKnowledgeInfo = (financialKnowledgeData[0].count)
            totalAvailableFinancialKnowledgeInfo = (financialKnowledgeData[0].total)
        }
    }
    catch (error) {
        console.log(error)
    }


    const data1 = {
        lineData: {
            allAdvisor: 5,
            allCandidate: 7,
            toBe: 8,
            running: 3,
            whyNot: 9
        },
        donutData: {
            baseInfos: totalAvailableBaseInfo / totalBaseInfo,
            moodStyle: totalAvailableFinancialKnowledgeInfo / totalFinancialKnowledgeInfo,
            professional: totalAvailableProfessionalInfo / totalProfessionalInfo,
            lifeStyle: (totalAvailableLifeStyleInfo) / totalLifeStyleInfo,
            personal: (totalAvailablePersonalInfo) / totalPersonalInfo,
            recruiter: (totalAvailableRecruitingInfo) / totalRecruitingInfo
        }
    }
    res.send(data1)
} 