const { helpRequest } = require('../entities/helpRequest.entity')
const { requestComments } = require('../entities/requestComments.entity');
const { dataResult } = require("../repository/data.repository");
const { checkForMultipleRequests } = require('../helpers/request.helper');
const {getAllRequestSkillsService} = require('./skill.service');
const requestRepository = require('../repository/request.repository');

async function getRequestsByUserDOService(UserId){
    userRequestQuery = await requestRepository.getRequestsByUserDO_DB(UserId);
    if(userRequestQuery.success){
        requestData = await rebuildRequest(userRequestQuery.data);
        return {
            success : userRequestQuery.success,
            data : requestData
        }
    }
    return userRequestQuery;
}

async function rebuildRequest(requestData){
    result = [...requestData];
    for (let index = 0; index < result.length; index++) {
        skillsArray = await getAllRequestSkillsService(result[index].id)
        result[index] = {
            id : result[index].id, 
            title: result[index].title, 
            lat : result[index].lat,
            lng : result[index].lng,
            userDO: result[index].userDO,
            dateOfPublishing : result[index].dateOfPublishing, 
            isActive : result[index].isActive, 
            wasResolved : result[index].wasResolved, 
            description : result[index].description,
            skills : skillsArray.data
        }
    }
    return result;
}

async function rebuildRequestWithUserData(requestData){
    result = [...requestData];
    for (let index = 0; index < result.length; index++) {
        skillsArray = await getAllRequestSkillsService(result[index].id)
        result[index] = {
            id : result[index].id, 
            title: result[index].title, 
            lat : result[index].lat,
            lng : result[index].lng,
            dateOfPublishing : result[index].dateOfPublishing, 
            isActive : result[index].isActive, 
            wasResolved : result[index].wasResolved, 
            description : result[index].description,
            skills : skillsArray.data,
            userDO: result[index].do,
            name: result[index].name,
            lastname : result[index].lastname,
            verified : result[index].verified,
        }
        console.log(result[index]);
    }
    return result;
}

async function getRequestByIdService(requestId){
    userRequestQuery = await requestRepository.getRequestWithUserByRequestIdDB(requestId);
    if(userRequestQuery.success){
        requestData = await rebuildRequestWithUserData(userRequestQuery.data);
        return {
            success : userRequestQuery.success,
            data : requestData
        }
    }
    return userRequestQuery
}

async function getQuestionsFromRequestService(requestId){
    return await requestRepository.getQuestionsFromRequestDB(requestId);
}

async function createRequestService(httpBody){
    request = new helpRequest(1,httpBody.title,httpBody.lat,httpBody.lng,httpBody.userDO,httpBody.dateOfPublishing,httpBody.description);
    requestSkills = httpBody.skills;
    requestQuery = await requestRepository.createRequestDB(request);
    if(requestQuery.success){
        createdRequest = requestQuery.data
        arrayOfValues = [];
        for (let index = 0; index<requestSkills.length; index++){
            arrayOfValues.push(createdRequest[0].id);
            arrayOfValues.push(requestSkills[index].id);
            arrayOfValues.push(requestSkills[index].lvl);
        }
        skillsInsert = await requestRepository.createRequestSkillsDB(arrayOfValues);
        if(skillsInsert.success){
            return await getRequestByIdService(createdRequest[0].id);
        }
        else{
            await requestRepository.deleteRequestDB(createdRequest[0].id);
            return new dataResult(false, null, 400, "Skills not added correctly.");
        }
    }
    return requestQuery;
}

async function createQuestionService(requestId,userDO,question){
    requestComment = new requestComments(userDO,requestId,question,null);
    return await requestRepository.createRequestCommentDB(requestComment);
}

async function answerQuestionService(requestId,userDO,answer){
    requestComment = new requestComments(userDO,requestId,null,answer);
    return await requestRepository.answerRequestCommentDB(requestComment);
}

async function isRequestActiveService(requestId){
    return await requestRepository.isRequestActiveDB(requestId);
}

async function getRequestsService(userDO){
    userFriendsQuery = await requestRepository.getFriendsDB(userDO);
    if(userFriendsQuery.success){
        userFriends = userFriendsQuery.data;
        friendsArray = []
        userFriends.forEach(friend => {
            friendsArray.push(friend.amigo)
        });
        requestsPreview = (await requestRepository.getRequestsDB(friendsArray)).data;
        requestsData = checkForMultipleRequests(requestsPreview);
        return {
            "success": true,
            "data": requestsData
        }
        };
    return userFriendsQuery
}

module.exports = {
    getRequestsByUserDOService,
    getRequestByIdService,
    getQuestionsFromRequestService,
    createRequestService,
    createQuestionService,
    answerQuestionService,
    isRequestActiveService,
    getRequestsService
}