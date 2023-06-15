const { helpRequest } = require('../entities/helpRequest.entity')
const  requestRepository = require('../repository/request.repository')

async function getRequestsByUserIdService(UserId){
    return await requestRepository.getRequestsByUserIdDB(UserId)
}

module.exports = {
    getRequestsByUserIdService
}