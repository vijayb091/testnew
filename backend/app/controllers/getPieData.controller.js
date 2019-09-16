const BaseInfosSchema = require('../models/baseInfos.model');
const ProfessionalSchema = require('../models/professional.model')
const PersonalInfosSchema = require('../models/personalInfos.model')
const LifeStyleSchema = require('../models/lifeStyle.model')
const RecruitingSchema =  require('../models/recruiting.model')
const FinancialKnowledgeSchema = require('../models/financialKnowledge.model')

exports.getData = async (req,res)=>{

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
    
    var allAdvisorTotal = 0
    var allCandidateTotal = 0
    var toBeTotal = 0
    var runningTotal = 0
    var whyNotTotal = 0

    console.log(req.params)
    const typeValue = ''
    //calculate BaseInfos
    let data = await BaseInfosSchema.find()
    if(data.length>0){
        data.forEach((item)=>{
            if (typeValue == "prospect" && (item.baseContactType == "Prospect to be" || item.baseContactType == "Prospect running" || item.baseContactType == "Prospect why not")){
                totalAvailableBaseInfo += item.baseInfoPercentage        
            }
            if (typeValue == "customer" && (item.baseContactType == "Cliente" || item.baseContactType == "Cliente a 0")) {
                totalAvailableBaseInfo += item.baseInfoPercentage
            }
            if (item.baseContactType.includes('to be')){
                toBeTotal++
            } else if (item.baseContactType.includes("running")){
                runningTotal++
            } else if (item.baseContactType.includes('why not')){
                whyNotTotal++
            }

        })
        totalBaseInfo = data.length
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
    try{
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
    catch(error){
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
            toBe: toBeTotal,
            running: runningTotal,
            whyNot: whyNotTotal,
            total: totalBaseInfo
        },
        donutData: {
            baseInfos: {
                percent: totalAvailableBaseInfo/ totalBaseInfo,
                count: totalAvailableBaseInfo,
                total: totalBaseInfo
            },
            moodStyle: {
                percent: totalAvailableFinancialKnowledgeInfo/totalFinancialKnowledgeInfo,
                count: totalAvailableFinancialKnowledgeInfo,
                total:totalFinancialKnowledgeInfo
            },
            professional:{
                percent: totalAvailableProfessionalInfo / totalProfessionalInfo,
                count: totalAvailableProfessionalInfo,
                total: totalProfessionalInfo
            }, 
            lifeStyle: {
                percent: totalAvailableLifeStyleInfo/ totalLifeStyleInfo,
                count:totalAvailableLifeStyleInfo,
                total:totalLifeStyleInfo
            },
            personal: {
                percent: totalAvailablePersonalInfo / totalPersonalInfo,
                count:totalAvailablePersonalInfo,
                total:totalPersonalInfo
            },
            recruiter:{
                percent: totalAvailableRecruitingInfo / totalRecruitingInfo,
                count: totalAvailableRecruitingInfo,
                total: totalRecruitingInfo
            } 
        }
    }
    res.send(data1)
    
}
function getSum(data){

}
var count = [];
function getCount(data, level) {
    
    // console.log("====>",data)
    level = level || 0;
    count[level] = count[level] || 0;

    for (var k in data) {
        data.hasOwnProperty(k) && count[level]++;
        
        typeof data[k] === 'object' && data != null && getCount(JSON.parse(JSON.stringify(data[k])), level + 1);
    }
}

function filterInput(input) {
    var obj = input[0];
    var emptyCount = 0;

    if (!Array.isArray(input)) {
        return 'Invalid input type';
    }

    for (prop in obj) {

        if (obj[prop] === "" || obj[prop] === null) {
            emptyCount++;
        }

    }

    return emptyCount;
}