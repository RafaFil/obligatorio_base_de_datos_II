const { dataResult } = require("../repository/data.repository")
const { getSolicitantRequestHelper, getPostulationsOfRequest, getPostulation, createPostulation, deletePostulation, getUsersPostulationsDB } = require("../repository/postulation.repository")
const {findByDO} = require("../services/user.service")


const checkIfPostulationAuthorOrSolicitant = async(userId, requestId) => {
    return getSolicitantRequestHelper(userId, requestId).then(result => {
        return result.success
    })
}
const getRequestPostulationsService = async(requestId, solicitantId) => {
    console.log(solicitantId);
    let permitted = await (checkIfPostulationAuthorOrSolicitant(solicitantId, requestId))
    if(permitted){
        postulationsQuery = await getPostulationsOfRequest(requestId);
        if(postulationsQuery.success){
            postulatedPeopleArray = [];
            postulationsQuery.data.forEach( async postulation => {
                userPostulated = (await findByDO(postulation.userId)).data;
                postulatedPeopleArray.push(userPostulated);
            });
            return {
                success : true,
                data : postulatedPeopleArray
            } 
        }
        return postulationsQuery;
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