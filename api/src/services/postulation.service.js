const { Postulation } = require("../entities/postulation.entity")
const { dataResult } = require("../repository/data.repository")
const { getSolicitantRequestHelper, getPostulationsOfRequest } = require("../repository/postulation.repository")


const checkIfAuthorOrSolicitant = async(userId, requestId) => {
    return getSolicitantRequestHelper(userId, requestId).then(result => {
        return result.success
    })
}
const getRequestPostulationsService = async(requestId, solicitantId) => {

    let permitted = await (checkIfAuthorOrSolicitant(solicitantId, requestId))
    if(permitted){
        return await getPostulationsOfRequest(requestId)
    }
    return new dataResult(false,null,403,"No permission")
}
const getFullPostulationtByIdService = async(userId, requestId) => {
    
}
const deletePostulationByIdService = async(userId, requestId) => {
    
}
const applyToRequestService = async(postulation) => {
    
}

module.exports = {
    getRequestPostulationsService,
    getFullPostulationtByIdService,
    deletePostulationByIdService,
    applyToRequestService
}