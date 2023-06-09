const {getAllRequestSkillsService} = require('../services/skill.service');

const skillsQueryBuilder = (requestSkills)=>{
    buildingQuery = `INSERT INTO habilidades_solicitudes(solicitud_id,habilidad_id,nivel) VALUES`
    arrayOfValues = []
    for (let index = 0; index < requestSkills.length; index++){
        arrayOfValues.push(requestSkills[index].id,requestSkills[index].lvl)
    }
    for (let index = 0; index < arrayOfValues.length;index = index + 2) {
        if(index+2 == arrayOfValues.length){
            buildingQuery = buildingQuery.concat(`(currval('solicitudes_ayuda_id_seq'),$${index+1},$${index+2})`);
        }
        else{
            buildingQuery = buildingQuery.concat(`(currval('solicitudes_ayuda_id_seq'),$${index+1},$${index+2}),`);
        }
    }
    return {
        query : buildingQuery,
        values : arrayOfValues
    }
}

const getAllFriendsRequestsBuilder = (friends) =>{
    buildQuery = 'WHERE (';
    for (let index = 0; index < friends.length; index++) {
        if(index+1 == friends.length){
            buildQuery += `sa.solicitante_ci = $${index+1}`;
        }
        else{
            buildQuery += `sa.solicitante_ci = $${index+1} OR `;
        }
    }
    buildQuery += ")"
    return buildQuery

}

const checkForMultipleRequests = (requestsArray) =>{
    requestsMap = new Map()
    requestsArray.forEach(request => {
        if(!requestsMap.has(request.id)){
            newRequest = buildPreviewJSON(request);
            requestsMap.set(newRequest.id,newRequest);
        }
        else{
            requestsMap.get(request.id).skills.push(request.habilidad);
        }
    });
    return Array.from(requestsMap.values());
}

const buildPreviewJSON = (request) =>{
    requestSkillsArray = [];
    requestSkillsArray.push(request.habilidad);
    return {
        id : request.id,
        title: request.title,
        solicitantdo : request.solicitantid,
        dateofpublishing : request.dateofpublishing,
        lat : request.lat,
        lng : request.lng,
        skills : requestSkillsArray,
        description : request.description
    }
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
            userDO: result[index].userdo,
            dateofpublishing : result[index].dateofpublishing, 
            isActive : result[index].isactive, 
            wasResolved : result[index].wasresolved, 
            description : result[index].description,
            skills : skillsArray.data
        }
    }
    return result;
}

async function rebuildRequestWithUserData(requestData){
        skillsArray = await getAllRequestSkillsService(requestData.id)
        result = {
            id : requestData.id, 
            title: requestData.title, 
            lat : requestData.lat,
            lng : requestData.lng,
            dateofpublishing : requestData.dateofpublishing, 
            isActive : requestData.isactive, 
            wasResolved : requestData.wasresolved, 
            description : requestData.description,
            skills : skillsArray.data,
            user : {
                userDO: requestData.do,
                name: requestData.name,
                lastname : requestData.lastname,
                verified : requestData.verified
            }
        }
    return result;
}

module.exports ={
    skillsQueryBuilder,
    getAllFriendsRequestsBuilder,
    checkForMultipleRequests,
    buildPreviewJSON,
    rebuildRequestWithUserData,
    rebuildRequest
}