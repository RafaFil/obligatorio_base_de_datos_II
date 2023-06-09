const { dataResult } = require("../repository/data.repository")
const { getSolicitantRequestHelper, getPostulationsOfRequest, getPostulation, createPostulation, deletePostulation, getUsersPostulationsDB } = require("../repository/postulation.repository")
const { getRequestByIdService } = require("../services/request.service")

const checkIfPostulationAuthorOrSolicitant = async(userId, requestId) => {
    return getSolicitantRequestHelper(userId, requestId).then(async result => {
        if(result.success){
            return true;
        } else{
            const isCreator = await getRequestByIdService(requestId).then( request => {
                if(request.success && request.data && request.data.user.userDO === userId){
                    return true
                }
                return false;
            })
            return isCreator;
        }
    })
}

const getRequestPostulationsService = async(requestId, solicitantId) => {
    let permitted = await (checkIfPostulationAuthorOrSolicitant(solicitantId, requestId))
    if(permitted){
        return await getPostulationsOfRequest(requestId);
    }
    return new dataResult(false,null,403,"No permission")
}
const getFullPostulationtByIdService = async(userId, requestId) => {
    let permitted = await (checkIfPostulationAuthorOrSolicitant(userId, requestId))
    if(permitted){
        return await getPostulation(userId, requestId)
    }
    return new dataResult(false,null,403,"No permission")
}
const getAllUserPostulationsService = async(userId) => {
        return await getUsersPostulationsDB(userId)
}
const deletePostulationByIdService = async(userId, requestId, whosAskingId) => {
    let permitted = await (checkIfPostulationAuthorOrSolicitant(whosAskingId, requestId))
    if(permitted){
        return await deletePostulation(userId, requestId)
    }
    return new dataResult(false,null,403,"No permission")
}
const applyToRequestService = async(postulation) => {
    return await createPostulation(postulation);
}

module.exports = {
    getRequestPostulationsService,
    getFullPostulationtByIdService,
    getAllUserPostulationsService,
    deletePostulationByIdService,
    applyToRequestService
}