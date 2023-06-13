const { Postulation } = require("../entities/postulation.entity")
const { dataResult } = require("../repository/data.repository")
const { getSolicitantRequestHelper, getPostulationsOfRequest } = require("../repository/postulation.repository")


const checkIfAuthorOrSolicitant = async(userId, requestId) => {
    return await getSolicitantRequestHelper(userId, requestId)
}
const getRequestPostulationsService = async(requestId, solicitantId) => {
    if ((await checkIfAuthorOrSolicitant(solicitantId, requestId)).success){
        return await getPostulationsOfRequest(requestId)
    }
    return new dataResult(false,null,403,"No permission")
}
const getFullPostulationtByIdService = async(postulationId) => {
    
}
const deletePostulationByIdService = async(postulationId) => {
    
}
const applyToRequestService = async(requestId) => {
    
}

module.exports = {
    getRequestPostulationsService,
    getFullPostulationtByIdService,
    deletePostulationByIdService,
    applyToRequestService
}