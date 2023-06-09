const { helpRequest } = require('../entities/helpRequest.entity')
const { requestComments } = require('../entities/requestComments.entity');
const { dataResult } = require("../repository/data.repository");
const { checkForMultipleRequests, rebuildRequestWithUserData, rebuildRequest } = require('../helpers/request.helper');
const requestRepository = require('../repository/request.repository');

async function getRequestsByUserDOService(UserId) {
    userRequestQuery = await requestRepository.getRequestsByUserDO_DB(UserId);
    if (userRequestQuery.success) {
        requestData = await rebuildRequest(userRequestQuery.data);
        return {
            success: userRequestQuery.success,
            data: requestData
        }
    }
    return userRequestQuery;
}

async function getRequestByIdService(requestId) {
    userRequestQuery = await requestRepository.getRequestWithUserByRequestIdDB(requestId);
    if (userRequestQuery.success) {
        requestData = await rebuildRequestWithUserData(userRequestQuery.data);
        return {
            success: userRequestQuery.success,
            data: requestData
        }
    }
    return userRequestQuery
}

async function getQuestionsFromRequestService(requestId) {
    return await requestRepository.getQuestionsFromRequestDB(requestId);
}

async function createRequestService(httpBody) {
    request = new helpRequest(1, httpBody.title, httpBody.lat, httpBody.lng, httpBody.userDO, httpBody.dateOfPublishing, httpBody.description);
    requestSkills = httpBody.skills;
    requestQuery = await requestRepository.createRequestDB(request,requestSkills);
    if(requestQuery.success){
        return await getRequestByIdService(requestQuery.data.id);
    }
    return requestQuery;
}

async function createQuestionService(requestId, userDO, question) {
    requestComment = new requestComments(userDO, requestId, question, null);
    return await requestRepository.createRequestCommentDB(requestComment);
}

async function answerQuestionService(requestId, userDO, answer) {
    requestComment = new requestComments(userDO, requestId, null, answer);
    return await requestRepository.answerRequestCommentDB(requestComment);
}

async function isRequestActiveService(requestId) {
    return await requestRepository.isRequestActiveDB(requestId);
}

async function getRequestsService(userDO) {
    userFriendsQuery = await requestRepository.getFriendsDB(userDO);
    if (userFriendsQuery.success) {
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

async function deleteRequestService(requestId) {
    deleteRequestQuery = await requestRepository.deleteRequestDB(requestId);
    if (deleteRequestQuery.success) {
        deleteData = deleteRequestQuery.data
        return {
            success: deleteRequestQuery.success,
            data: {
                id: deleteData.id,
                title: deleteData.title,
                description: deleteData.description,
                lng: deleteData.lng,
                lat: deleteData.lat,
                dateOfPublishing: deleteData.dateofpublishing,
                solicitantdo: deleteData.userdo
            }
        }
    }
    return deleteRequestQuery;
}

module.exports = {
    getRequestsByUserDOService,
    getRequestByIdService,
    getQuestionsFromRequestService,
    createRequestService,
    createQuestionService,
    answerQuestionService,
    isRequestActiveService,
    getRequestsService,
    deleteRequestService
}